"use client";

import { useEffect, useRef, useState } from "react";

export default function FeaturedBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for a smooth entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

        .featured-banner-section {
          font-family: 'Inter', sans-serif;
          background: #fdfdfc;

          padding: 5px 5px; 
          
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .featured-banner-section * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .banner-card {
          position: relative;
          width: 100%;
          max-width: 1000px;
          min-height: 340px;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
          
          /* Entrance Animation */
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .featured-banner-section.is-visible .banner-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* Background Image */
        .banner-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: transform 3s ease;
        }
        
        .banner-card:hover .banner-image {
          transform: scale(1.03); 
        }

        /* Slightly darker overlay for better text readability */
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.58); /* Increased from 0.45 → 0.58 */
          z-index: 2;
        }

        /* Content Wrapper */
        .banner-content {
          position: relative;
          z-index: 3;
          width: 100%; 
          max-width: 650px;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #ffffff;
        }

        .banner-tag {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.9);
        }

        .banner-title {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 800; 
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .banner-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 28px;
        }

        /* Pill Button */
        .banner-btn {
          background: #ffffff;
          color: #111111;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 50px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
          background: #f8f8f8;
        }

        /* Responsive adjustments for Mobile */
        @media (max-width: 768px) {
          .featured-banner-section {
            padding: 5px 5px;
          }
          .banner-card {
            min-height: 380px;
          }
          .banner-title {
            font-size: 26px;
          }
        }
      `}</style>

      <section 
        className={`featured-banner-section ${isVisible ? 'is-visible' : ''}`}
        ref={sectionRef}
      >
        <div className="banner-card">
          <img 
            className="banner-image" 
            src="https://images.unsplash.com/photo-1530598554585-ee355b518dc9?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="A ranger walking a forest trail, symbolizing the daily work of wildlife conservation NGOs"
            loading="lazy"
          />
          
          <div className="banner-overlay"></div>

          <div className="banner-content">
            <span className="banner-tag">The Real Crisis</span>
            <h2 className="banner-title">
              What NGOs Are Fighting<br/>Against Right Now
            </h2>
            <p className="banner-desc">
              From shrinking government funding and accelerating habitat loss to the growing mistrust between local communities and conservationists — the challenges facing wildlife NGOs today are more urgent, and more complex, than ever before.
            </p>
            <a href="#articles" className="banner-btn">
              Read Our Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}