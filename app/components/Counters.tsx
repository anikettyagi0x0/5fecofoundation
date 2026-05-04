"use client";

import { useEffect, useRef, useState } from "react";

// ─── Human-Centric Impact Data ────────────────────────────────────────────────

const statsData = [
  {
    id: 1,
    value: "1,250",
    suffix: "+",
    label: "Lives Saved",
    description: "Orphaned and injured wildlife successfully rehabilitated and returned to the wild by our veterinary teams.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1691031428727-3b8c7adfad37?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    value: "45",
    suffix: "k",
    label: "Roots in the Ground",
    description: "Native saplings planted by the hands of local volunteers, restoring vital, breathing forest corridors.",
    imageUrl: "https://images.unsplash.com/photo-1691123629124-4d267a0eb3a6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hands planting in soil
  },
  {
    id: 3,
    value: "15",
    suffix: "k+",
    label: "Safe Havens",
    description: "Acres of pristine land secured from commercial development, guarded daily by indigenous scouts.",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop", // Majestic untouched forest
  },
  {
    id: 4,
    value: "150",
    suffix: "+",
    label: "Minds Inspired",
    description: "Educational gatherings hosted in local villages, empowering the next generation of earth stewards.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop", // Community/children learning
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .stats-section {
          font-family: 'Inter', sans-serif;
          background: #fdfdfc;
          padding: 140px 40px 180px 40px;
          color: #1a2e1a;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .stats-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .stats-container {
          max-width: 1400px;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* ─── Unified About Us Heading Style ─── */
        .stats-header-center {
          text-align: center;
          margin-bottom: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .is-visible .stats-header-center {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-tag {
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
        .stats-tag::before, .stats-tag::after {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #2e7d32;
        }

        .stats-h2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(36px, 4.5vw, 52px);
          font-weight: 700;
          line-height: 1.15;
          color: #1a2e1a;
          letter-spacing: -0.02em;
          max-width: 800px;
          margin-bottom: 20px;
        }
        .stats-h2 em {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          color: #2e7d32;
        }

        .stats-desc {
          font-size: 16px;
          line-height: 1.8;
          color: #4a6b4a;
          font-weight: 300;
          max-width: 640px;
          margin: 0 auto;
        }

        /* ─── Cinematic Staggered Grid ─── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: start;
        }

        /* The organic stagger effect */
        .stat-card:nth-child(even) {
          margin-top: 60px;
        }

        .stat-card {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: #000; /* Dark base for images */
          box-shadow: 0 24px 48px rgba(26, 46, 26, 0.08);
          
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Staggered entrance animations */
        .is-visible .stat-card { opacity: 1; transform: translateY(0); }
        .is-visible .stat-card:nth-child(even) { transform: translateY(60px); } /* Maintain stagger after entrance */
        
        .is-visible .stat-card:nth-child(1) { transition-delay: 0.1s; }
        .is-visible .stat-card:nth-child(2) { transition-delay: 0.2s; }
        .is-visible .stat-card:nth-child(3) { transition-delay: 0.3s; }
        .is-visible .stat-card:nth-child(4) { transition-delay: 0.4s; }

        /* The Image */
        .stat-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7; /* Keep it slightly dim to let typography shine */
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease;
        }

        /* Rich Gradient Overlay */
        .stat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 20, 10, 0.95) 0%, rgba(10, 20, 10, 0.2) 60%, rgba(10, 20, 10, 0.4) 100%);
          transition: background 0.6s ease;
        }

        .stat-card:hover .stat-bg {
          transform: scale(1.06);
          opacity: 0.5;
        }
        .stat-card:hover .stat-overlay {
          background: linear-gradient(to top, rgba(10, 20, 10, 0.98) 0%, rgba(10, 20, 10, 0.4) 60%, rgba(10, 20, 10, 0.6) 100%);
        }

        /* The Content Layer */
        .stat-content {
          position: absolute;
          inset: 0;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Number at top, text at bottom */
          color: #fff;
          z-index: 2;
        }

        /* The Number Typography */
        .stat-number-wrap {
          display: flex;
          align-items: baseline;
        }
        .stat-number {
          font-family: 'Lora', serif;
          font-size: clamp(48px, 4vw, 64px);
          font-weight: 400;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.04em;
          text-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .stat-suffix {
          font-family: 'Inter', sans-serif;
          font-size: clamp(24px, 2vw, 32px);
          font-weight: 300;
          color: #a5d6a7;
          margin-left: 2px;
        }

        /* The Story Text */
        .stat-text-block {
          transform: translateY(16px);
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .stat-card:hover .stat-text-block {
          transform: translateY(0);
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        /* Elegant accent line next to the label */
        .stat-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.2);
          transition: background 0.6s ease;
        }
        .stat-card:hover .stat-label::after {
          background: rgba(165, 214, 167, 0.5); /* Glows green on hover */
        }

        .stat-detail {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          opacity: 0.8;
          transition: opacity 0.6s ease;
        }
        .stat-card:hover .stat-detail {
          opacity: 1;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
          .stat-card:nth-child(even) { margin-top: 40px; }
          .is-visible .stat-card:nth-child(even) { transform: translateY(40px); }
        }
        
        @media (max-width: 600px) {
          .stats-section { padding: 100px 24px; }
          .stats-header-center { margin-bottom: 60px; }
          .stats-grid { 
            grid-template-columns: 1fr; 
            gap: 24px; 
          }
          /* Remove stagger on mobile to keep it clean */
          .stat-card:nth-child(even) { margin-top: 0; }
          .is-visible .stat-card:nth-child(even) { transform: translateY(0); }
          .stat-card { aspect-ratio: 4/5; }
          
          /* Keep text fully visible on mobile */
          .stat-text-block { transform: translateY(0); }
          .stat-detail { opacity: 1; }
        }
      `}</style>

      <section className={`stats-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="stats-container">
          
          <div className="stats-header-center">
            <span className="stats-tag">Our Reality</span>
            <h2 className="stats-h2">
              Measurable impact across <em>ecosystems.</em>
            </h2>
            <p className="stats-desc">
              Behind every statistic is a real life. We measure our success not just in numbers, but in the habitats restored and the communities we empower.
            </p>
          </div>

          <div className="stats-grid">
            {statsData.map((stat) => (
              <article key={stat.id} className="stat-card">
                
                {/* The Photographic Background */}
                <img src={stat.imageUrl} alt={stat.label} className="stat-bg" loading="lazy" />
                <div className="stat-overlay"></div>
                
                {/* The Overlaid Typography and Story */}
                <div className="stat-content">
                  
                  <div className="stat-number-wrap">
                    <span className="stat-number">{stat.value}</span>
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  
                  <div className="stat-text-block">
                    <h3 className="stat-label">{stat.label}</h3>
                    <p className="stat-detail">{stat.description}</p>
                  </div>

                </div>

              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}