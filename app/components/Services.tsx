"use client";

import { useEffect, useRef, useState } from "react";
import WorldDotMap from "../components/utils/WorldMap";

// ─── Services data (Forest & Wildlife) ────────────────────────────────────────

const services = [
  {
    id: 1,
    label: "Wildlife Rescue & Rehabilitation",
    color: "#2e7d32",
    angle: -120,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2C7 2 3.5 5.5 3.5 9.5c0 3 1.5 5.5 4 7V18h7v-1.5c2.5-1.5 4-4 4-7C18.5 5.5 15 2 11 2z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"
        />
        <circle cx="8.5" cy="9" r="1.2" fill="currentColor" />
        <circle cx="13.5" cy="9" r="1.2" fill="currentColor" />
        <path d="M8.5 17.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Forest Restoration & Planting",
    color: "#558b2f",
    angle: -60,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 1.5L5 9h3.5L4.5 15H9v5.5h4V15h4.5L13.5 9H17L11 1.5z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Biodiversity Conservation",
    color: "#00897b",
    angle: 0,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M11 2.5C11 2.5 7 6 7 11s4 8.5 4 8.5M11 2.5c0 0 4 3.5 4 8.5s-4 8.5-4 8.5"
          stroke="currentColor" strokeWidth="1.4"
        />
        <path d="M2.5 11h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Community Education",
    color: "#f9a825",
    angle: 60,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L2 6.5l9 4.5 9-4.5L11 2z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
        <path
          d="M2 6.5v6M20 6.5v6M5.5 8.5v5c0 2 2.5 4 5.5 4s5.5-2 5.5-4v-5"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    label: "Anti-Poaching Initiatives",
    color: "#e65100",
    angle: 120,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L4 5v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V5L11 2z"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"
        />
        <path
          d="M8 11l2 2 4-4"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 6,
    label: "Climate & Carbon Programs",
    color: "#6a1b9a",
    angle: 180,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M6 16.5A5 5 0 016 6.5a5 5 0 019.5-2 4 4 0 110 8H6"
          stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M11 13v4M9 15l2 2 2-2"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// ─── Diagram constants ────────────────────────────────────────────────────────

const CX = 420;
const CY = 300;
const RADIUS = 230;

const MAP_W = 1580;
const MAP_H = 820;
const MAP_X = CX - MAP_W / 2;
const MAP_Y = CY - MAP_H / 2;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function getPos(angle: number, r: number) {
  return {
    x: CX + r * Math.cos(toRad(angle - 90)),
    y: CY + r * Math.sin(toRad(angle - 90)),
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WhatWeDo() {
  const [visible, setVisible]       = useState(false);
  const [hovered, setHovered]       = useState<number | null>(null);
  const [mapDataUrl, setMapDataUrl] = useState<string>("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .wwd {
          font-family: 'Inter', sans-serif;
          background: #fff;
          color: #1a2e1a;
          position: relative;
          overflow: hidden;
        }
        .wwd * { box-sizing: border-box; margin: 0; padding: 0; }

        .wwd-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 40px;
        }
        @media (max-width: 768px) { .wwd-inner { padding: 72px 20px; } }

        .wwd-head {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .wwd-head.vis { opacity: 1; transform: translateY(0); }

        .wwd-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2e7d32;
          margin-bottom: 24px;
        }
        .wwd-tag::before, .wwd-tag::after {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #2e7d32;
        }

        .wwd-h1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          color: #1a2e1a;
          letter-spacing: -0.02em;
          max-width: 800px;
          margin-bottom: 16px;
        }
        .wwd-h1 em {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          color: #2e7d32;
        }

        .wwd-sub {
          font-size: 16px;
          line-height: 1.7;
          color: #4a6b4a;
          font-weight: 300;
          max-width: 640px;
          margin: 0 auto;
        }

        .wwd-diagram {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .wwd-svg { width: 100%; height: auto; overflow: visible; }

        /* ── Spinning ring ── */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .center-ring {
          transform-origin: 420px 300px;
          animation: spin-slow 20s linear infinite;
        }

        /* ── Node bloom ── */
        @keyframes nodeBloom {
          0%   { transform: scale(0.01); opacity: 0; }
          55%  { opacity: 1; }
          65%  { transform: scale(1.07); }
          82%  { transform: scale(0.97); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ── Connector draw-in ── */
        @keyframes drawPath {
          from { stroke-dashoffset: 500; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }

        /* ── Label card slide-in ── */
        @keyframes labelSlide {
          from { opacity: 0; transform: scale(0.82) translateY(4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* ── Glow ring breathe on hover ── */
        @keyframes glowBreathe {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.9; }
        }

        /* ── Icon ring smooth transitions ── */
        .node-outer-ring {
          transition:
            r 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            stroke-width 0.25s ease,
            stroke 0.25s ease;
        }
        .node-inner-fill {
          transition:
            r 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            fill-opacity 0.3s ease;
        }
        .node-glow-circle {
          transition: r 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease;
        }

        /* ── Label pill ── */
        .label-pill-rect {
          transition:
            stroke 0.25s ease,
            filter 0.3s ease;
        }
        .label-pill-text {
          transition: fill 0.2s ease;
        }
        .label-arrow {
          transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          transform-box: fill-box;
          transform-origin: center;
        }

        .wwd-node {
          cursor: pointer;
          transition: filter 0.3s ease;
        }
        .wwd-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.10));
        }
      `}</style>

      <WorldDotMap
        onReady={setMapDataUrl}
        dotColor="#1c1c1c"
        dotRadius={1.3}
        dotSpacing={4}
      />

      <section className="wwd" ref={ref as React.RefObject<HTMLElement>}>
        <div className="wwd-inner">

          {/* Heading */}
          <div className={`wwd-head ${visible ? "vis" : ""}`}>
            <span className="wwd-tag">What We Do</span>
            <h2 className="wwd-h1">
              Our work across <em>forest & wildlife.</em>
            </h2>
            <p className="wwd-sub">
              From rescuing injured animals to restoring entire ecosystems —
              every branch of our work connects back to one living, breathing mission.
            </p>
          </div>

          {/* Radial diagram */}
          <div className="wwd-diagram">
            <svg
              className="wwd-svg"
              viewBox="0 0 840 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="hub-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.12" />
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.08" />
                </filter>
                <radialGradient id="hub-3d" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f8f9fa" />
                  <stop offset="100%" stopColor="#e9ecef" />
                </radialGradient>
                <linearGradient id="hub-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
                </linearGradient>

                {services.map((s) => (
                  <radialGradient key={`grad-${s.id}`} id={`grad-${s.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor={s.color} stopOpacity="0.22" />
                    <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                  </radialGradient>
                ))}

                {services.map((s) => {
                  const end = getPos(s.angle, RADIUS - 60);
                  return (
                    <linearGradient
                      key={`line-grad-${s.id}`}
                      id={`line-grad-${s.id}`}
                      x1={CX} y1={CY} x2={end.x} y2={end.y}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%"   stopColor="#a5d6a7" />
                      <stop offset="100%" stopColor={s.color} />
                    </linearGradient>
                  );
                })}

                <radialGradient id="map-vignette" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="white" stopOpacity="1" />
                  <stop offset="60%"  stopColor="white" stopOpacity="0.85" />
                  <stop offset="90%"  stopColor="white" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="map-mask">
                  <rect x={MAP_X} y={MAP_Y} width={MAP_W} height={MAP_H} fill="url(#map-vignette)" />
                </mask>

                <clipPath id="logo-clip">
                  <circle cx={CX} cy={CY} r={46} />
                </clipPath>
              </defs>

              {/* Map overlay */}
              <g style={{ opacity: visible ? 1 : 0, transition: "opacity 1.5s ease" }}>
                {mapDataUrl && (
                  <image
                    href={mapDataUrl}
                    x={MAP_X} y={MAP_Y}
                    width={MAP_W} height={MAP_H}
                    opacity={0.38}
                    mask="url(#map-mask)"
                    preserveAspectRatio="xMidYMid meet"
                  />
                )}
              </g>

              {/* ── Connectors ── */}
              {services.map((s, i) => {
                const end = getPos(s.angle, RADIUS - 50);
                const curveOffset = 45;
                const cp1 = getPos(s.angle - curveOffset, RADIUS * 0.35);
                const cp2 = getPos(s.angle + (curveOffset / 3), RADIUS * 0.75);
                const isHov = hovered === s.id;

                return (
                  <path
                    key={`path-${s.id}`}
                    d={`M ${CX} ${CY} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${end.x} ${end.y}`}
                    fill="none"
                    stroke={`url(#line-grad-${s.id})`}
                    strokeWidth={isHov ? 3.5 : 2}
                    strokeOpacity={isHov ? 1 : 0.55}
                    strokeDasharray="500"
                    strokeLinecap="round"
                    style={
                      visible
                        ? {
                            strokeDashoffset: 0,
                            opacity: 1,
                            animation: `drawPath 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${0.08 + i * 0.1}s both`,
                            transition: "stroke-width 0.3s ease, stroke-opacity 0.3s ease",
                          }
                        : { strokeDashoffset: 500, opacity: 0 }
                    }
                  />
                );
              })}

              {/* ── Service nodes ── */}
              {services.map((s, i) => {
                const pos      = getPos(s.angle, RADIUS - 10);
                const isHov    = hovered === s.id;
                const labelPos = getPos(s.angle, RADIUS + 50);
                const isLeft   = pos.x < CX - 30;
                const isRight  = pos.x > CX + 30;

                // THE FIX: Wide enough to fit text, giving it breathing room
                const cardW  = 240; 
                const cardH  = 40;
                const cardRx = 6;

                const cardX = isLeft
                  ? labelPos.x - cardW + 8
                  : isRight
                  ? labelPos.x - 8
                  : labelPos.x - cardW / 2;

                return (
                  <g
                    key={`node-${s.id}`}
                    className="wwd-node"
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* ── Icon circle ── */}
                    <g
                      style={
                        visible
                          ? {
                              transformOrigin: `${CX}px ${CY}px`,
                              animation: `nodeBloom 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.18 + i * 0.11}s both`,
                            }
                          : { opacity: 0, transform: "scale(0.01)", transformOrigin: `${CX}px ${CY}px` }
                      }
                    >
                      <circle
                        className="node-glow-circle"
                        cx={pos.x} cy={pos.y}
                        r={isHov ? 62 : 0}
                        fill={`url(#grad-${s.id})`}
                        style={
                          isHov
                            ? { animation: "glowBreathe 1.8s ease-in-out infinite" }
                            : undefined
                        }
                      />
                      <circle
                        className="node-outer-ring"
                        cx={pos.x} cy={pos.y}
                        r={isHov ? 30 : 26}
                        fill="white"
                        stroke={s.color}
                        strokeWidth={isHov ? 2.5 : 1.5}
                      />
                      <circle
                        className="node-inner-fill"
                        cx={pos.x} cy={pos.y}
                        r={isHov ? 22 : 18}
                        fill={s.color}
                        fillOpacity={isHov ? 0.14 : 0.07}
                      />
                      <g
                        fill={s.color}
                        stroke={s.color}
                        style={{ transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                        transform={`translate(${pos.x - 11}, ${pos.y - 11})`}
                      >
                        {s.icon}
                      </g>
                    </g>

                    {/* ── Label card ── */}
                    <g
                      style={
                        visible
                          ? {
                              animation: `labelSlide 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.32 + i * 0.11}s both`,
                            }
                          : { opacity: 0 }
                      }
                    >
                      <rect
                        className="label-pill-rect"
                        x={cardX}
                        y={labelPos.y - cardH / 2}
                        width={cardW}
                        height={cardH}
                        rx={cardRx}
                        fill="white"
                        stroke={isHov ? s.color : "#e4e8e4"}
                        strokeWidth={isHov ? 1.5 : 1}
                        style={{
                          filter: isHov
                            ? `drop-shadow(0 6px 18px ${s.color}28)`
                            : "drop-shadow(0 2px 8px rgba(0,0,0,0.06))",
                        }}
                      />
                      <rect
                        x={cardX}
                        y={labelPos.y - cardH / 2}
                        width={3}
                        height={cardH}
                        rx={0}
                        fill={s.color}
                        fillOpacity={isHov ? 1 : 0.55}
                        style={{
                          borderRadius: `${cardRx}px 0 0 ${cardRx}px`,
                          transition: "fill-opacity 0.25s ease",
                        }}
                      />
                      <rect
                        x={cardX}
                        y={labelPos.y - cardH / 2}
                        width={3 + cardRx}
                        height={cardH}
                        rx={cardRx}
                        fill={s.color}
                        fillOpacity={isHov ? 1 : 0.55}
                        style={{ transition: "fill-opacity 0.25s ease" }}
                      />

                      {/* THE MAGIC FIX: `textAnchor="start"` completely stops the text from bleeding backward over the green bar! */}
                      <text
                        x={cardX + 16} 
                        y={labelPos.y + 1}
                        dominantBaseline="middle"
                        textAnchor="start" 
                        fontSize={11}
                        fontWeight={isHov ? 600 : 500}
                        fontFamily="Inter, sans-serif"
                        fill={isHov ? "#1a2e1a" : "#2d4a2d"}
                        className="label-pill-text"
                        style={{ letterSpacing: "0.01em" }}
                      >
                        {s.label}
                      </text>

                      {/* THE MAGIC FIX: `textAnchor="end"` places the arrow perfectly against the right border */}
                      <text
                        x={cardX + cardW - 14}
                        y={labelPos.y + 1}
                        dominantBaseline="middle"
                        textAnchor="end"
                        fontSize={11}
                        fill={s.color}
                        className="label-arrow"
                        style={{
                          opacity: isHov ? 1 : 0,
                          transform: isHov ? "translateX(0px)" : "translateX(-4px)",
                          transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                      >
                        →
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* ── Center hub ── */}
              <g
                style={{
                  transformOrigin: `${CX}px ${CY}px`,
                  transform: visible ? "scale(1)" : "scale(0)",
                  transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <circle cx={CX} cy={CY} r={65} fill="url(#hub-3d)" filter="url(#hub-shadow)" />
                <circle cx={CX} cy={CY} r={56} fill="transparent" stroke="#e0e0e0" strokeWidth="2" opacity="0.8" />
                <circle cx={CX} cy={CY} r={53} fill="#ffffff" />
                <circle
                  className="center-ring"
                  cx={CX} cy={CY} r={78}
                  fill="none"
                  stroke="#2e7d32"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  opacity="0.4"
                />
                <image
                  href="/logo-5feco.jpeg"
                  x={CX - 40} y={CY - 40}
                  width="80" height="80"
                  clipPath="url(#logo-clip)"
                  preserveAspectRatio="xMidYMid meet"
                />
                <circle cx={CX} cy={CY} r={65} fill="url(#hub-gloss)" style={{ pointerEvents: "none" }} />
              </g>

            </svg>
          </div>

        </div>
      </section>
    </>
  );
}