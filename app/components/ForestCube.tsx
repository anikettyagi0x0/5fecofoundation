"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./css/Cubegallery.module.css";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Stop { rx: number; ry: number; }

/* ─── Constants ──────────────────────────────────────────────────────────── */
const IMAGE_SRCS = [
  "https://assets.codepen.io/573855/demo-raw-01.webp",
  "https://assets.codepen.io/573855/demo-raw-02.webp",
  "https://assets.codepen.io/573855/demo-raw-03.webp",
  "https://assets.codepen.io/573855/demo-raw-04.webp",
  "https://assets.codepen.io/573855/demo-raw-05.webp",
  "https://assets.codepen.io/573855/demo-raw-06.webp",
];
const IMAGE_ASPECTS = [1, 1, 1, 1, 1, 1];
const FACE_NAMES    = ["CANOPY","WILDLIFE","RIVERS","COMMUNITY","RESEARCH","RESTORE"];
const SWAP_RADIUS   = 3;
const N             = IMAGE_SRCS.length;

function buildStops(n: number): Stop[] {
  const base: Stop[] = [
    { rx: 90,  ry:    0 },
    { rx:  0,  ry:    0 },
    { rx:  0,  ry:  -90 },
    { rx:  0,  ry: -180 },
    { rx:  0,  ry: -270 },
    { rx: -90, ry: -360 },
  ];
  const out = base.slice(0, Math.min(n, 6));
  for (let i = 6; i < n; i++) out.push({ rx: 0, ry: -360 - (i - 6) * 90 });
  return out;
}

const STOPS          = buildStops(N);
const stopIndex      = (s: number) => Math.min(N - 1, Math.floor(s * (N - 1)));
const faceAtStop     = (i: number) => (i < 6 ? i : 1 + ((i - 2) % 4));
const easeIO         = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const FACE_CLASS: Record<string, string> = {
  front:  styles.faceFront,
  back:   styles.faceBack,
  right:  styles.faceRight,
  left:   styles.faceLeft,
  top:    styles.faceTop,
  bottom: styles.faceBottom,
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function CubeGallery() {
  const wrapRef        = useRef<HTMLDivElement>(null);
  const cubeRef        = useRef<HTMLDivElement>(null);
  const facesRef       = useRef<HTMLDivElement[]>([]);
  const captionNumRef  = useRef<HTMLDivElement>(null);
  const captionNameRef = useRef<HTMLDivElement>(null);

  const st = useRef({
    tgt: 0, smooth: 0, velocity: 0,
    maxScroll: 1,
    sectionTops: [] as number[],
    lastFaceIdx: -1,
    currentStop: -1,
    faceImgIdx: new Array(6).fill(-1) as number[],
    imagePromises: new Map<string, Promise<HTMLImageElement>>(),
    anchorAnim: null as number | null,
    lastNow: 0,
  });

  const preloadImage = useCallback((src: string) => {
    const cache = st.current.imagePromises;
    if (cache.has(src)) return cache.get(src)!;
    const p = (async () => {
      const img = new Image(); img.src = src;
      await img.decode().catch(() => {});
      return img;
    })();
    cache.set(src, p);
    return p;
  }, []);

  const setFaceImage = useCallback(async (faceIdx: number, imgIdx: number, force = false) => {
    const s = st.current;
    if (!force && faceIdx === faceAtStop(s.currentStop)) return;
    if (!force && s.faceImgIdx[faceIdx] === imgIdx)      return;
    s.faceImgIdx[faceIdx] = imgIdx;
    const src  = IMAGE_SRCS[imgIdx];
    const face = facesRef.current[faceIdx];
    if (!face) return;
    await preloadImage(src);
    if (s.faceImgIdx[faceIdx] !== imgIdx) return;
    let img = face.querySelector("img") as HTMLImageElement | null;
    if (!img) { img = new Image(); face.appendChild(img); }
    img.alt = FACE_NAMES[imgIdx] ?? "";
    img.src = src;
    img.style.objectFit = (IMAGE_ASPECTS[imgIdx] ?? 1) !== 1 ? "contain" : "";
  }, [preloadImage]);

  const buildSectionTops = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const sections = wrap.querySelectorAll<HTMLElement>(`.${styles.section}`);
    st.current.sectionTops = [...sections].map((s) => s.offsetTop);
  }, []);

  const sectionIdxFromScroll = useCallback((scrollTop: number) => {
    const { sectionTops } = st.current;
    const mid = scrollTop + (wrapRef.current?.clientHeight ?? 0) * 0.5;
    let idx = 0;
    for (let i = 0; i < sectionTops.length; i++) if (mid >= sectionTops[i]) idx = i;
    return Math.min(idx, N - 1);
  }, []);

  const updateHUD = useCallback((smooth: number) => {
    const s    = st.current;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const si = sectionIdxFromScroll(wrap.scrollTop);
    s.currentStop = si;
    if (si !== s.lastFaceIdx) {
      s.lastFaceIdx = si;
      const name = FACE_NAMES[si] ?? "";
      if (captionNumRef.current)  captionNumRef.current.textContent  = String(si + 1).padStart(2, "0");
      if (captionNameRef.current) captionNameRef.current.textContent = name;
      wrap.querySelectorAll(`.${styles.sceneDot}`).forEach((d, i) =>
        d.classList.toggle(styles.sceneDotActive, i === si)
      );
    }
  }, [sectionIdxFromScroll]);

  const setCubeTransform = useCallback((smooth: number) => {
    if (N < 2) return;
    const t = smooth * (N - 1);
    const i = Math.min(Math.floor(t), N - 2);
    const f = easeIO(t - i);
    const a = STOPS[i], b = STOPS[i + 1];
    const rx = a.rx + (b.rx - a.rx) * f;
    const ry = a.ry + (b.ry - a.ry) * f;
    if (cubeRef.current)
      cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }, []);

  const checkImageSwaps = useCallback((smooth: number) => {
    const base = stopIndex(smooth);
    for (let off = -SWAP_RADIUS; off <= SWAP_RADIUS; off++) {
      if (off === 0) continue;
      const si = base + off;
      if (si < 0 || si >= N) continue;
      setFaceImage(faceAtStop(si), si);
    }
  }, [setFaceImage]);

  const stopAnchorAnim = useCallback(() => {
    if (st.current.anchorAnim) {
      cancelAnimationFrame(st.current.anchorAnim);
      st.current.anchorAnim = null;
    }
  }, []);

  const smoothScrollToY = useCallback((targetY: number, duration = 900) => {
    stopAnchorAnim();
    const s    = st.current;
    const wrap = wrapRef.current;
    if (!wrap) return;
    s.velocity = 0;
    const startY = wrap.scrollTop;
    const diff   = targetY - startY;
    const start  = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      wrap.scrollTop = startY + diff * easeInOutCubic(p);
      s.tgt    = wrap.scrollTop / s.maxScroll;
      s.smooth = s.tgt;
      s.anchorAnim = p < 1 ? requestAnimationFrame(tick) : null;
    };
    s.anchorAnim = requestAnimationFrame(tick);
  }, [stopAnchorAnim]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const s = st.current;
    s.lastNow = performance.now();

    IMAGE_SRCS.forEach((src) => preloadImage(src));
    for (let i = 0; i < Math.min(N, 6); i++) setFaceImage(i, i, true);

    const measure = () => {
      s.maxScroll = Math.max(1, wrap.scrollHeight - wrap.clientHeight);
      buildSectionTops();
    };
    measure();

    const friction = (v: number) => Math.abs(v) > 200 ? 0.8 : 0.9;
    const EASE = 0.1;
    let rafId: number;

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      if (document.hidden) { s.lastNow = now; return; }
      const dt = Math.min((now - s.lastNow) / 1000, 0.05);
      s.lastNow = now;

      s.velocity *= Math.pow(friction(s.velocity), dt * 60);
      if (Math.abs(s.velocity) < 0.01) s.velocity = 0;
      if (Math.abs(s.velocity) > 0.2) {
        wrap.scrollTop = Math.max(0, Math.min(wrap.scrollTop + s.velocity * EASE, s.maxScroll));
        s.tgt = wrap.scrollTop / s.maxScroll;
      }

      s.smooth += (s.tgt - s.smooth) * (1 - Math.exp(-dt * 8));
      s.smooth = Math.max(0, Math.min(1, s.smooth));

      updateHUD(s.smooth);
      checkImageSwaps(s.smooth);
      setCubeTransform(s.smooth);
    };
    rafId = requestAnimationFrame(frame);

    const onScroll = () => {
      s.tgt = s.maxScroll > 0 ? wrap.scrollTop / s.maxScroll : 0;
      s.tgt = Math.max(0, Math.min(1, s.tgt));
    };

    const onWheel = (e: WheelEvent) => {
      const atTop    = wrap.scrollTop <= 0;
      const atBottom = wrap.scrollTop >= s.maxScroll - 1;
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) return;
      e.preventDefault();
      e.stopPropagation();
      const linePx = 16, pagePx = wrap.clientHeight * 0.9;
      const delta  = e.deltaMode === 1 ? e.deltaY * linePx
                   : e.deltaMode === 2 ? e.deltaY * pagePx
                   : e.deltaY;
      if (Math.abs(delta) < 5) return;
      stopAnchorAnim();
      s.velocity += delta;
      s.velocity  = Math.max(-600, Math.min(600, s.velocity));
    };

    const ro = new ResizeObserver(() => {
      measure();
      s.tgt = s.maxScroll > 0 ? wrap.scrollTop / s.maxScroll : 0;
      s.smooth = s.tgt;
    });
    ro.observe(wrap);

    const revealEls = wrap.querySelectorAll(
      `.${styles.tag},.${styles.h1},.${styles.h2},.${styles.bodyText},.${styles.statRow},.${styles.cta},.${styles.ctaBack},.${styles.hLine}`
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add(styles.visible); io.unobserve(e.target); }
      }),
      { root: wrap, threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));

    const onDocClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#cg-s"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href   = a.getAttribute("href");
      if (!href) return;
      const target = wrap.querySelector(href) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      smoothScrollToY(target.offsetTop);
    };

    const stopAnc = () => stopAnchorAnim();
    wrap.addEventListener("scroll",     onScroll,   { passive: true });
    wrap.addEventListener("wheel",      onWheel,    { passive: false });
    wrap.addEventListener("touchstart", stopAnc,    { passive: true });
    wrap.addEventListener("mousedown",  stopAnc,    { passive: true });
    wrap.addEventListener("keydown",    stopAnc);
    wrap.addEventListener("click",      onDocClick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("scroll",     onScroll);
      wrap.removeEventListener("wheel",      onWheel);
      wrap.removeEventListener("touchstart", stopAnc);
      wrap.removeEventListener("mousedown",  stopAnc);
      wrap.removeEventListener("keydown",    stopAnc);
      wrap.removeEventListener("click",      onDocClick);
    };
  }, [
    buildSectionTops, checkImageSwaps, preloadImage,
    setCubeTransform, setFaceImage, smoothScrollToY,
    stopAnchorAnim, updateHUD,
  ]);

  /* ── JSX ─────────────────────────────────────────────────────────────────── */
  return (
    <div className={styles.wrap} ref={wrapRef} tabIndex={-1}>

      {/* ── Sticky cube ── */}
      <div className={styles.sceneSticky} aria-hidden="true">
        <div className={styles.cubePositioner}>
          <div className={styles.cube} ref={cubeRef}>
            {(["top","front","right","back","left","bottom"] as const).map((face, i) => (
              <div
                key={face}
                className={`${styles.face} ${FACE_CLASS[face]}`}
                ref={(el) => { if (el) facesRef.current[i] = el; }}
              >
                <span className={styles.facePh}>{face.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky UI: dots + caption only (no HUD, no credit) ── */}
      <div className={styles.uiLayer}>
        <div className={styles.sceneStrip}>
          {Array.from({ length: N }, (_, i) => (
            <a
              key={i}
              href={`#cg-s${i}`}
              className={`${styles.sceneDot}${i === 0 ? ` ${styles.sceneDotActive}` : ""}`}
            />
          ))}
        </div>

        <div className={styles.faceCaption}>
          <div className={styles.faceCaptionNum}  ref={captionNumRef}>01</div>
          <div className={styles.faceCaptionName} ref={captionNameRef}>CANOPY</div>
        </div>
      </div>

      {/* ── Scrollable sections ── */}
      <div className={styles.scrollContent}>

        {/* 00 — Entry */}
        <section className={styles.section} id="cg-s0">
          <div className={styles.textCard}>
            <div className={styles.tag}>Preserving the Wild</div>
            <h1 className={styles.h1}>GUARD<br/>THE<br/>FOREST</h1>
            <p className={styles.bodyText}>
              Indonesia holds 10% of the world's remaining tropical forests.
              We are on the ground protecting every hectare — through science,
              community, and unrelenting commitment.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.cta} href="#cg-s1">
                Explore
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 01 — Wildlife */}
        <section className={styles.section} id="cg-s1">
          <div className={`${styles.textCard} ${styles.textCardRight}`}>
            <div className={styles.hLine}/>
            <div className={styles.tag}>Wildlife Corridors</div>
            <h2 className={styles.h2}>SAFE<br/>PASSAGE<br/>RESTORED</h2>
            <p className={styles.bodyText}>
              Fragmented habitat is a silent extinction. We have reconnected
              over 340 km of forest corridors, allowing Sumatran elephants,
              tigers, and orangutans to move freely once more.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.ctaBack} href="#cg-s0">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5"/></svg>
                Back
              </a>
              <a className={styles.cta} href="#cg-s2">
                Next
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 02 — Rivers */}
        <section className={styles.section} id="cg-s2">
          <div className={styles.textCard}>
            <div className={styles.hLine}/>
            <div className={styles.tag}>Watershed Protection</div>
            <h2 className={styles.h2}>CLEAN<br/>WATER<br/>BEGINS<br/>HERE</h2>
            <p className={styles.bodyText}>
              Forests are the source. Our riparian restoration projects
              protect 1,200 km of river systems that supply fresh water
              to 4 million people downstream.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.ctaBack} href="#cg-s1">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5"/></svg>
                Back
              </a>
              <a className={styles.cta} href="#cg-s3">
                Next
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 03 — Community */}
        <section className={styles.section} id="cg-s3">
          <div className={`${styles.textCard} ${styles.textCardRight}`}>
            <div className={styles.hLine}/>
            <div className={styles.tag}>Community Guardians</div>
            <h2 className={styles.h2}>PEOPLE<br/>PROTECT<br/>WHAT<br/>THEY OWN</h2>
            <p className={styles.bodyText}>
              Conservation that excludes communities fails. We partner with
              62 Indigenous villages, co-managing 480,000 hectares under
              legal land rights they helped secure.
            </p>
            <div className={styles.statRow} style={{ justifyContent: "flex-end" }}>
              <div className={styles.stat}><span className={styles.statNum}>62</span><span className={styles.statLabel}>Villages</span></div>
              <div className={styles.stat}><span className={styles.statNum}>480K</span><span className={styles.statLabel}>Hectares</span></div>
              <div className={styles.stat}><span className={styles.statNum}>12K</span><span className={styles.statLabel}>Guardians</span></div>
            </div>
            <div className={styles.ctaRow}>
              <a className={styles.ctaBack} href="#cg-s2">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5"/></svg>
                Back
              </a>
              <a className={styles.cta} href="#cg-s4">
                Next
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 04 — Research */}
        <section className={styles.section} id="cg-s4">
          <div className={styles.textCard}>
            <div className={styles.hLine}/>
            <div className={styles.tag}>Field Research</div>
            <h2 className={styles.h2}>DATA<br/>DRIVES<br/>ACTION</h2>
            <p className={styles.bodyText}>
              Our sensor networks, satellite monitoring, and on-ground
              ecologists generate the evidence that holds governments and
              corporations accountable to their commitments.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.ctaBack} href="#cg-s3">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5"/></svg>
                Back
              </a>
              <a className={styles.cta} href="#cg-s5">
                Next
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 05 — Restore */}
        <section className={styles.section} id="cg-s5">
          <div className={`${styles.textCard} ${styles.textCardRight}`}>
            <div className={styles.hLine}/>
            <div className={styles.tag}>Restoration</div>
            <h2 className={styles.h2}>PLANT.<br/>WAIT.<br/>WITNESS.</h2>
            <p className={styles.bodyText}>
              We have planted 3.2 million native trees across degraded
              peatlands and hillsides. The forest does not grow overnight —
              but it grows. Join 40,000 supporters making it possible.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.ctaBack} href="#cg-s4">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 6H1M6 11L1 6l5-5"/></svg>
                Back
              </a>
              <a className={styles.cta} href="#cg-s0">
                Join Us
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h10M6 1l5 5-5 5"/></svg>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}