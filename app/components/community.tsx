"use client";

import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const accordionData = [
  {
    id: 0,
    title: "Corporate Partnerships",
    content: "Collaborate with us to meet your CSR goals. We offer tailored programs for corporate teams, including sponsored restoration plots and employee volunteer days.",
  },
  {
    id: 1,
    title: "Contract & Grant Opportunities",
    content: "We actively partner with government agencies, private foundations, and research institutions to execute large-scale conservation contracts and utilize grant funding effectively.",
  },
  {
    id: 2,
    title: "Convening Services",
    content: "Leverage our facilities and expertise to host workshops, stakeholder meetings, and environmental summits in the heart of the habitats we protect.",
  },
];

// Placeholder data for logos. Replace the `name` with actual `<img>` tags in your implementation.
const partnerLogos = [
  "Ford", "Niagara Cares", "Polaris", "TC Energy", "THOR", "Patagonia", "Rivian", "Yeti"
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GetInvolved() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const logoScrollRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollLogos = (direction: "left" | "right") => {
    if (logoScrollRef.current) {
      const scrollAmount = 300; 
      logoScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .get-involved-section {
          font-family: 'Inter', sans-serif;
          /* Premium light green background */
          background-color: #eaf1ea; 
          /* Subtle radial gradient to mimic the abstract background shape from your design */
          background-image: radial-gradient(circle at 70% 30%, #f4f8f4 0%, transparent 40%), 
                            radial-gradient(circle at 20% 80%, #dce8dc 0%, transparent 50%);
          color: #1a2e1a;
          padding: 100px 40px 60px 40px;
          position: relative;
          overflow: hidden;
        }

        .gi-container {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        /* ─── Top Grid Layout ─── */
        .gi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }

        /* Left Side: Image */
        .gi-image-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .gi-image {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 24px; /* Curved edges matching previous components */
          box-shadow: 0 20px 40px rgba(26, 46, 26, 0.08);
        }

        .gi-caption {
          font-size: 12px;
          color: #4a6b4a;
          font-weight: 500;
          padding-left: 8px;
        }

        /* Right Side: Content & Accordion */
        .gi-content {
          padding-top: 20px;
        }

        .gi-h2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 700;
          color: #1a2e1a;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .gi-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #3b593b;
          margin-bottom: 48px;
          max-width: 90%;
        }

        /* Accordion Styles */
        .gi-accordion-item {
          border-top: 1px solid rgba(26, 46, 26, 0.2);
        }
        .gi-accordion-item:last-child {
          border-bottom: 1px solid rgba(26, 46, 26, 0.2);
        }

        .gi-accordion-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #1a2e1a;
          text-align: left;
          transition: color 0.3s ease;
        }
        .gi-accordion-btn:hover {
          color: #2e7d32;
        }

        .gi-icon {
          position: relative;
          width: 16px;
          height: 16px;
        }
        .gi-icon::before, .gi-icon::after {
          content: '';
          position: absolute;
          background-color: #1a2e1a;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease;
        }
        /* Horizontal line */
        .gi-icon::before {
          top: 7px; left: 0; width: 16px; height: 2px;
        }
        /* Vertical line */
        .gi-icon::after {
          top: 0; left: 7px; width: 2px; height: 16px;
        }
        
        /* When active, rotate vertical line to horizontal (forming a minus) */
        .gi-accordion-btn.active .gi-icon::after {
          transform: rotate(90deg);
        }
        .gi-accordion-btn.active .gi-icon::before,
        .gi-accordion-btn.active .gi-icon::after {
          background-color: #2e7d32;
        }

        .gi-accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
          opacity: 0;
        }
        .gi-accordion-content.active {
          max-height: 200px; /* Arbitrary large height for smooth transition */
          opacity: 1;
        }
        .gi-accordion-inner {
          padding-bottom: 24px;
          font-size: 15px;
          line-height: 1.6;
          color: #4a6b4a;
          padding-right: 40px;
        }

        /* ─── Bottom Partners Carousel ─── */
        .gi-partners-wrapper {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 40px;
        }

        .gi-partner-controls {
          flex-shrink: 0;
        }

        .gi-partner-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(26, 46, 26, 0.3);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gi-partner-btn svg {
          width: 18px; height: 18px;
          fill: #1a2e1a;
          transition: transform 0.3s ease;
        }
        .gi-partner-btn:hover {
          background: #1a2e1a;
          border-color: #1a2e1a;
        }
        .gi-partner-btn:hover svg { fill: #fff; }
        .gi-partner-btn.left:hover svg { transform: translateX(-2px); }
        .gi-partner-btn.right:hover svg { transform: translateX(2px); }

        .gi-partner-track {
          display: flex;
          align-items: center;
          gap: 60px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          flex: 1;
          padding: 10px 0;
          
          /* Hide Scrollbar */
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .gi-partner-track::-webkit-scrollbar { display: none; }

        .gi-partner-logo {
          scroll-snap-align: center;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #1a2e1a;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          /* If using real images: */
          /* width: 120px; height: auto; object-fit: contain; filter: grayscale(100%); */
        }
        .gi-partner-logo:hover {
          opacity: 1;
        }

        /* Responsive Breakpoints */
        @media (max-width: 968px) {
          .gi-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .gi-image {
            aspect-ratio: 16/9;
          }
          .gi-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 600px) {
          .get-involved-section {
            padding: 60px 20px;
          }
          .gi-h2 {
            font-size: 32px;
          }
          .gi-accordion-btn {
            font-size: 16px;
          }
          .gi-partner-track {
            gap: 40px;
          }
          .gi-partner-logo {
            font-size: 16px;
          }
          .gi-partner-btn {
            width: 36px; height: 36px;
          }
        }
      `}</style>

      <section className="get-involved-section">
        <div className="gi-container">
          
          {/* ─── Top Grid: Image & Content ─── */}
          <div className="gi-grid">
            
            {/* Left: Image */}
            <div className="gi-image-wrapper">
              <img 
                className="gi-image" 
                src="/event-5feco.jpg" 
                alt="Volunteers meeting in the forest" 
                loading="lazy"
              />
            </div>

            {/* Right: Accordion */}
            <div className="gi-content">
              <h2 className="gi-h2">Get Involved</h2>
              <p className="gi-desc">
                There are many ways to support our mission to restore and enhance National Forests and Grasslands.
              </p>

              <div className="gi-accordion">
                {accordionData.map((item, index) => {
                  const isActive = openIndex === index;
                  return (
                    <div key={item.id} className="gi-accordion-item">
                      <button 
                        className={`gi-accordion-btn ${isActive ? "active" : ""}`} 
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isActive}
                      >
                        {item.title}
                        <span className="gi-icon"></span>
                      </button>
                      
                      <div className={`gi-accordion-content ${isActive ? "active" : ""}`}>
                        <div className="gi-accordion-inner">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ─── Bottom: Partners Logo Track ─── */}
          <div className="gi-partners-wrapper">
            
            {/* Left Control */}
            <div className="gi-partner-controls">
              <button className="gi-partner-btn left" onClick={() => scrollLogos("left")} aria-label="Scroll left">
                <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
              </button>
            </div>

            {/* Scrolling Logos */}
            <div className="gi-partner-track" ref={logoScrollRef}>
              {/* Replace these spans with <img> tags containing your SVG/PNG logos */}
              {partnerLogos.map((logo, idx) => (
                <span key={idx} className="gi-partner-logo">
                  {logo}
                </span>
              ))}
            </div>

            {/* Right Control */}
            <div className="gi-partner-controls">
              <button className="gi-partner-btn right" onClick={() => scrollLogos("right")} aria-label="Scroll right">
                <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </button>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}