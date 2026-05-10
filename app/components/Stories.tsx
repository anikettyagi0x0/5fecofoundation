"use client";

import { useEffect, useRef, useState } from "react";

// ─── Stories Data ─────────────────────────────────────────────────────────────

const stories = [
  {
    id: 1,
    title: "Leopard Rescue – Agra",
    date: "05.2026",
    tag: "Rescue",
    description: "A leopard was safely rescued in Agra by 5F ECO Foundation of India, ensuring its protection and return to a natural habitat",
    mediaUrl: "leopard-rescue-agra.png",
    videoUrl: "https://vimeo.com/1189050514?share=copy&fl=sv&fe=ci",
    type: "video",
    duration: "2:45",
  },
  {
    id: 2,
    title: "Restoration & Conservation Efforts",
    date: "04.2026",
    tag: "Restoration",
    description: "5F ECO Foundation of India is working to protect nature and wildlife. Support us by spreading awareness and encouraging others to join the mission",
    mediaUrl: "restoration.jpg",
    type: "image",
  },
  {
    id: 3,
    title: "Elephant Herd Guided to Safety",
    date: "03.2026",
    tag: "Conservation",
    description: "Using drone surveillance and acoustic deterrence, we successfully redirected a herd of 14 elephants away from a busy agricultural sector.",
    mediaUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://vimeo.com/showcase/example",
    type: "video",
    duration: "5:12",
  },
  {
    id: 4,
    title: "Return to the Wild: Raptor Release",
    date: "02.2026",
    tag: "Rehabilitation",
    description: "After six months of intensive rehabilitation for a broken wing, a majestic Crested Serpent Eagle took to the skies once again.",
    mediaUrl: "https://images.unsplash.com/photo-1552554749-d7eecc21b889?q=80&w=800&auto=format&fit=crop",
    type: "image",
  },
  {
    id: 5,
    title: "Anti-Poaching Patrols Expanded",
    date: "01.2026",
    tag: "Security",
    description: "We have deployed 12 new camera traps and increased night patrols in the northern sector, significantly deterring illegal activities.",
    mediaUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop",
    type: "image",
  }
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ForestUI() {
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (rightScrollRef.current) {
      const scrollAmount = 420;
      rightScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .premium-ui * { box-sizing: border-box; margin: 0; padding: 0; }
        .premium-ui {
          font-family: 'Inter', sans-serif;
          background: #fdfdfc;
          color: #111;
          min-height: 100vh;
        }

        /* ─── Navbar ─── */
        .modern-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 100;
          transition: all 0.4s ease;
          background: ${scrolled ? "rgba(253, 253, 252, 0.85)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
          border-bottom: 1px solid ${scrolled ? "rgba(0,0,0,0.05)" : "transparent"};
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Lora', serif;
          font-size: 22px;
          font-weight: 500;
          color: #1a2e1a;
          text-decoration: none;
        }
        .nav-brand svg { width: 24px; height: 24px; fill: #2e7d32; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          position: relative;
          padding: 8px 0;
          transition: color 0.3s ease;
        }
        .nav-link:hover { color: #2e7d32; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%;
          height: 2px;
          background: #2e7d32;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-cta {
          background: #1a2e1a;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 12px 28px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }
        .nav-cta:hover {
          background: #2e7d32;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(46, 125, 50, 0.2);
        }

        /* ─── Stories Section ─── */
        .editorial-section {
          padding: 160px 0 120px 40px;
          position: relative;
          overflow: hidden;
        }

        .editorial-container {
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .editorial-left {
          flex: 0 0 32%;
          padding-right: 20px;
        }

        .editorial-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2e7d32;
          margin-bottom: 32px;
        }
        .editorial-tag::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #2e7d32;
        }

        .editorial-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(40px, 4.5vw, 64px);
          font-weight: 400;
          line-height: 1.1;
          color: #111;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .editorial-h2 em { font-style: italic; color: #2e7d32; }

        .editorial-desc {
          font-size: 16px;
          color: #555;
          font-weight: 300;
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 40px;
        }

        /* ─── Controls row: arrows + button ─── */
        .ed-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ed-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .ed-btn svg { width: 16px; height: 16px; fill: #111; transition: transform 0.3s ease; }
        .ed-btn:hover {
          background: #2e7d32;
          border-color: #2e7d32;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(46, 125, 50, 0.15);
        }
        .ed-btn:hover svg { fill: #fff; }
        .ed-btn.left:hover svg  { transform: translateX(-2px); }
        .ed-btn.right:hover svg { transform: translateX(2px); }

        /* ─── View Our Stories button ─── */
        .ed-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2e7d32;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 50px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 16px rgba(46, 125, 50, 0.3);
          white-space: nowrap;
        }
        .ed-view-btn:hover {
          background: #1b5e20;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(46, 125, 50, 0.4);
        }
        .ed-view-btn svg {
          transition: transform 0.3s ease;
        }
        .ed-view-btn:hover svg {
          transform: translateX(3px);
        }

        /* ─── Right scroll track ─── */
        .editorial-right {
          flex: 1;
          min-width: 0;
          display: flex;
          gap: 32px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-bottom: 40px;
          padding-top: 40px;
          margin-top: -40px;
          padding-right: 40px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .editorial-right::-webkit-scrollbar { display: none; }

        /* ─── Cards ─── */
        .editorial-card-wrap {
          flex: 0 0 400px;
          height: 560px;
          scroll-snap-align: center;
          position: relative;
          background: #000;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .is-visible .editorial-card-wrap { opacity: 1; transform: translateX(0); }
        .is-visible .editorial-card-wrap:nth-child(1) { transition-delay: 0.1s; }
        .is-visible .editorial-card-wrap:nth-child(2) { transition-delay: 0.2s; }
        .is-visible .editorial-card-wrap:nth-child(3) { transition-delay: 0.3s; }
        .is-visible .editorial-card-wrap:nth-child(4) { transition-delay: 0.4s; }
        .is-visible .editorial-card-wrap:nth-child(5) { transition-delay: 0.5s; }

        .editorial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
        }
        .editorial-card-wrap:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .editorial-card-wrap:hover .editorial-image {
          transform: scale(1.06);
          opacity: 0.6;
        }

        .editorial-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%);
          pointer-events: none;
        }

        .editorial-content {
          position: absolute;
          inset: 0;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #fff;
          pointer-events: none;
        }

        .editorial-header {
          position: absolute;
          top: 32px; left: 32px; right: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-date {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.9);
          background: rgba(0,0,0,0.4);
          padding: 6px 14px;
          border-radius: 30px;
          backdrop-filter: blur(8px);
        }

        .ed-tag {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #fff;
          background: rgba(255,255,255,0.15);
          padding: 6px 14px;
          border-radius: 30px;
          backdrop-filter: blur(8px);
        }

        /* FIX: Prevent title from overflowing if it's too long */
        .ed-title {
          font-family: 'Lora', serif;
          font-size: 26px;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 12px;
          transform: translateY(10px);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          
          /* Safe wrapping */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .editorial-card-wrap:hover .ed-title { transform: translateY(0); }

        /* FIX: Prevent description from crossing the border when expanded */
        .ed-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          opacity: 0;
          max-height: 0;
          transform: translateY(10px);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          
          /* Force line breaks and ellipsis to prevent boundary breaking */
          display: -webkit-box;
          -webkit-line-clamp: 4; /* Keeps text to a maximum of 4 lines */
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .editorial-card-wrap:hover .ed-desc {
          opacity: 1;
          max-height: 150px; /* Slightly increased to give text safe room */
          transform: translateY(0);
        }

        .ed-play-btn {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          text-decoration: none;
          z-index: 10;
        }
        .ed-play-btn svg { width: 16px; height: 16px; fill: #fff; margin-left: 2px; }
        .editorial-card-wrap:hover .ed-play-btn {
          border-color: #fff;
          background: #fff;
          transform: translate(-50%, -50%) scale(1.1);
        }
        .editorial-card-wrap:hover .ed-play-btn svg { fill: #111; }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .editorial-container { flex-direction: column; align-items: flex-start; }
          .editorial-section { padding: 120px 0 80px 20px; }
          .editorial-left { flex: none; width: 100%; padding-right: 20px; }
        }
        @media (max-width: 600px) {
          .modern-nav { padding: 0 20px; }
          .editorial-card-wrap { flex: 0 0 85vw; height: 460px; }
          .ed-view-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="premium-ui">
        <section className={`editorial-section ${isVisible ? "is-visible" : ""}`} ref={sectionRef}>
          <div className="editorial-container">

            <div className="editorial-left">
              <span className="editorial-tag">Field Dispatches</span>
              <h2 className="editorial-h2">
                Stories of <em>resilience</em> and rescue.
              </h2>
              <p className="editorial-desc">
                Every day on the frontlines brings a new challenge. Swipe through the firsthand accounts and unedited footage of our teams working to heal the wild, one life and one acre at a time.
              </p>

              {/* ─── Controls: arrows + View Our Stories button ─── */}
              <div className="ed-controls">
                <button className="ed-btn left" onClick={() => scroll("left")} aria-label="Scroll Left">
                  <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
                </button>
                <button className="ed-btn right" onClick={() => scroll("right")} aria-label="Scroll Right">
                  <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>

                <a href="#stories" className="ed-view-btn">
                  View Our Stories
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="editorial-right" ref={rightScrollRef}>
              {stories.map((story) => (
                <article key={story.id} className="editorial-card-wrap">
                  <img className="editorial-image" src={story.mediaUrl} alt={story.title} loading="lazy" />
                  <div className="editorial-overlay"></div>

                  <div className="editorial-header">
                    <span className="ed-date">{story.date}</span>
                    <span className="ed-tag">{story.tag}</span>
                  </div>

                  {story.type === "video" && story.videoUrl && (
                    <a
                      href={story.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ed-play-btn"
                      aria-label={`Watch video: ${story.title}`}
                    >
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </a>
                  )}

                  <div className="editorial-content">
                    <h3 className="ed-title">{story.title}</h3>
                    <p className="ed-desc">{story.description}</p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      </div>
    </>
  );
}