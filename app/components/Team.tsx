"use client";

import { useEffect, useRef, useState } from "react";

// ─── Team Data ────────────────────────────────────────────────────────────────

const teamData = [
  {
    id: 1,
    name: "Dr. Maya Sharma",
    role: "Chief Ecologist",
    bio: "Ph.D. in Conservation Biology. Leads our habitat restoration strategy and field research teams.",
    imgUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    id: 2,
    name: "Rajiv Menon",
    role: "Head of Operations",
    bio: "Former logistics director who now orchestrates our rapid-response rescue teams across the country.",
    imgUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Lead Veterinarian",
    bio: "Specializes in large mammal trauma care. Oversees our primary rehabilitation sanctuary.",
    imgUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    id: 4,
    name: "Arjun Patel",
    role: "Community Director",
    bio: "Bridges the gap between our conservation efforts and local indigenous communities.",
    imgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    socials: { linkedin: "#", twitter: "#" }
  }
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TeamSection() {
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

        .team-section {
          font-family: 'Inter', sans-serif;
          background: #ffffff; /* Seamlessly flows from the About Us top section */
          color: #1a2e1a;
          padding: 80px 40px 140px 40px;
          overflow: hidden;
        }
        .team-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .team-container {
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ─── Header ─── */
        .team-header {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .is-visible .team-header {
          opacity: 1;
          transform: translateY(0);
        }

        .team-tag {
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
        .team-tag::before, .team-tag::after {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #2e7d32;
        }

        .team-h2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          color: #1a2e1a;
          letter-spacing: -0.02em;
          max-width: 800px;
        }
        .team-h2 em { 
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          color: #2e7d32; 
        }

        /* ─── Team Grid ─── */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        /* ─── Team Card ─── */
        .team-card {
          position: relative;
          aspect-ratio: 3/4; /* Elegant portrait ratio */
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          background: #fdfdfc;
          box-shadow: 0 12px 32px rgba(26, 46, 26, 0.05);
          
          /* Entrance Animation */
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Staggered load */
        .is-visible .team-card { opacity: 1; transform: translateY(0); }
        .is-visible .team-card:nth-child(1) { transition-delay: 0.2s; }
        .is-visible .team-card:nth-child(2) { transition-delay: 0.3s; }
        .is-visible .team-card:nth-child(3) { transition-delay: 0.4s; }
        .is-visible .team-card:nth-child(4) { transition-delay: 0.5s; }

        .team-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%); /* Premium editorial feel */
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease;
        }
        .team-card:hover .team-img {
          transform: scale(1.06);
          filter: grayscale(0%);
        }

        /* Gradient shadow to ensure text is always readable */
        .team-overlay-shadow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 20, 10, 0.95) 0%, rgba(10, 20, 10, 0.2) 50%, transparent 100%);
          opacity: 0.8;
          transition: opacity 0.4s ease;
        }
        .team-card:hover .team-overlay-shadow {
          opacity: 0.95;
        }

        /* Content block at the bottom */
        .team-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          color: #fff;
          z-index: 2;
        }

        .team-name {
          font-family: 'Lora', serif;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 4px;
          transform: translateY(20px);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .team-card:hover .team-name {
          transform: translateY(0);
        }

        .team-role {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #a5d6a7; /* Accent green */
          transform: translateY(20px);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .team-card:hover .team-role {
          transform: translateY(0);
        }

        /* Bio and Socials (Hidden by default, reveal on hover) */
        .team-hover-content {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          margin-top: 0;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .team-card:hover .team-hover-content {
          max-height: 150px;
          opacity: 1;
          margin-top: 16px;
        }

        .team-bio {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 16px;
        }

        .team-socials {
          display: flex;
          gap: 12px;
        }
        .team-social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .team-social-icon svg {
          width: 14px;
          height: 14px;
          fill: currentColor;
        }
        .team-social-icon:hover {
          background: #a5d6a7;
          color: #1a2e1a;
          transform: translateY(-2px);
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
          .team-card { aspect-ratio: 4/5; }
        }
        
        @media (max-width: 600px) {
          .team-section { padding: 60px 24px 100px 24px; }
          .team-grid { grid-template-columns: 1fr; gap: 32px; }
          .team-card { aspect-ratio: 1/1; } /* Squarer on mobile so it's not too tall */
          
          /* On mobile, keep text partially visible without hover */
          .team-name, .team-role { transform: translateY(0); }
          .team-hover-content { max-height: 150px; opacity: 1; margin-top: 16px; }
          .team-img { filter: grayscale(0%); }
        }
      `}</style>

      <section className={`team-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        <div className="team-container">
          
          {/* Header */}
          <div className="team-header">
            <span className="team-tag">Our People</span>
            <h2 className="team-h2">
              Meet the minds behind the <em>mission.</em>
            </h2>
          </div>

          {/* Grid */}
          <div className="team-grid">
            {teamData.map((member) => (
              <article key={member.id} className="team-card">
                <img 
                  src={member.imgUrl} 
                  alt={member.name} 
                  className="team-img" 
                  loading="lazy" 
                />
                
                <div className="team-overlay-shadow"></div>

                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  
                  {/* Slides up on hover */}
                  <div className="team-hover-content">
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-socials">
                      <a href={member.socials.linkedin} className="team-social-icon" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href={member.socials.twitter} className="team-social-icon" aria-label="Twitter">
                        <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                      </a>
                    </div>
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