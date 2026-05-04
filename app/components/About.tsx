"use client";

import { useEffect, useRef, useState } from "react";

// ─── Human-Centric Global Evolution Data ──────────────────────────────────────

const globalTimelineData = [
  {
    id: "1980s",
    tag: "The Local Awakening",
    title: "Voices from the Forest.",
    description: "Before global treaties were signed, the conservation movement was born in local villages. As industrial logging expanded, indigenous tribes and local farmers were the first to sound the alarm. The fight to save the forests began not in boardrooms, but with the people fighting for their homes and livelihoods.",
    metric: "Grassroots & Community Action"
  },
  {
    id: "1990s",
    tag: "The Human Cost",
    title: "Protecting People & Planet.",
    description: "The global community realized that deforestation wasn't just an ecological crisis—it was a human rights crisis. International NGOs began forming deep alliances with forest-dependent communities, shifting the focus from simply 'saving trees' to protecting the survival and culture of the people who rely on them.",
    metric: "Focus on Forest Communities"
  },
  {
    id: "2000s",
    tag: "The Guardians",
    title: "Empowering Indigenous Leaders.",
    description: "A massive shift occurred in global conservation: turning locals into leaders. Instead of sending outside experts, organizations started funding indigenous scouts, local veterinarians, and community educators. We learned that the most effective way to save a forest is to empower its people.",
    metric: "Indigenous Stewardship"
  },
  {
    id: "2015",
    tag: "Sustainable Lives",
    title: "Ecology Meets Economy.",
    description: "Global initiatives proved that protecting nature could provide better livelihoods than destroying it. Conservation evolved to include human survival—funding schools, building local healthcare clinics, and supporting sustainable eco-agriculture so communities could thrive without cutting down the forests.",
    metric: "Sustainable Human Ecosystems"
  },
  {
    id: "Present",
    tag: "Global Coalition",
    title: "A Worldwide Human Network.",
    description: "Today, conservation is a deeply human, interconnected global network. Millions of people—from local village leaders to global scientists and everyday donors—work together. We don't just protect isolated habitats; we build resilient human communities that thrive alongside nature.",
    metric: "Global Human Coalition"
  }
];

// ─── Image data for the three cards ───────────────────────────────────────────

const cardImages = {
  wildlife: {
    src: "https://scontent.fixc1-5.fna.fbcdn.net/v/t39.30808-6/516096320_746585818059995_3511935112501348240_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=kqE0GP8yKioQ7kNvwEbQC1p&_nc_oc=Adogqp6T34CfcWaLEHKu2dOgUxTF5YZB0xns-H9HiRJMjai3bvB8S6JXUwk9QYGnCRE&_nc_zt=23&_nc_ht=scontent.fixc1-5.fna&_nc_gid=6kb74wdeL-j60byTqxvV2Q&_nc_ss=7b289&oh=00_Af5sMXBAOemx622Llq0_kQluPtbzItL26p2NLE58KxH0oQ&oe=69FE6074",
    alt: "A snake being carefully rescued and handled by a conservationist in the wild",
    label: "Rescue",
  },
  forest: {
    src: "https://plus.unsplash.com/premium_photo-1664302740919-e6645ba8c053?q=80&w=879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Green forests and misty mountains of the Indian wilderness, home to diverse wildlife",
    label: "Nature",
  },
  community: {
    src: "https://scontent.fixc1-4.fna.fbcdn.net/v/t39.30808-6/472854294_943903747841563_5124589154110700682_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=7-w-Hn0NGY4Q7kNvwGOH7se&_nc_oc=AdqckNuoJiD2UaXZA-H35qLKKiCVgb9R1c0-FfQ9hbOqAtDmkXTGeZGrM3nW_CqdmH8&_nc_zt=23&_nc_ht=scontent.fixc1-4.fna&_nc_gid=1fFo-2-bhB1S_ioLDvSOzA&_nc_ss=7b289&oh=00_Af55G_sxx0QHDl6AL5WDbTdBAlHigkEgD8iqKm4lUNfV4g&oe=69FE796B",
    alt: "People working together as a community",
    label: "Community",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const [visible, setVisible] = useState(false);
  const [activeEra, setActiveEra] = useState(0);
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

  // Calculate the percentage width for the progress bar
  const progressPercentage = (activeEra / (globalTimelineData.length - 1)) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .ab {
          font-family: 'Inter', sans-serif;
          background: #fff;
          color: #1a2e1a;
          overflow: hidden;
        }
        .ab * { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-wrap { max-width: 1300px; margin: 0 auto; padding: 120px 40px; }
        @media (max-width: 768px) { .ab-wrap { padding: 80px 24px; } }

        /* ─── Shared Heading Styles ─── */
        .ab-center {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ab-tag {
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
        .ab-tag::before, .ab-tag::after {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #2e7d32;
        }

        .ab-h1 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          color: #1a2e1a;
          letter-spacing: -0.02em;
          max-width: 800px;
        }
        .ab-h1 em {
          font-family: 'Lora', serif;
          font-style: italic;
          font-weight: 400;
          color: #2e7d32;
        }

        .ab-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #3b593b;
          font-weight: 400;
          margin-bottom: 32px;
        }

        .ab-header-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #4a6b4a;
          font-weight: 300;
          max-width: 640px;
          margin-top: 20px;
        }

        /* ─── Body Layout ─── */
        .ab-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 120px;
        }
        @media (max-width: 968px) { .ab-body { grid-template-columns: 1fr; gap: 48px; margin-bottom: 80px; } }

        .ab-quote {
          border-left: 2px solid rgba(26, 46, 26, 0.2);
          padding-left: 24px;
          margin-bottom: 40px;
        }
        .ab-quote p {
          font-family: 'Lora', serif;
          font-size: 18px;
          font-style: italic;
          color: #1a2e1a;
          line-height: 1.6;
        }

        .ab-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #2e7d32;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: gap 0.3s ease, border-color 0.3s ease;
        }
        .ab-link:hover { gap: 12px; border-color: #2e7d32; }

        /* ─── Right: 3-image grid ─── */
        .ab-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }

        .ab-img {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          box-shadow: 0 12px 32px rgba(26, 46, 26, 0.1);
          background: #e8f5e9; /* placeholder bg while image loads */
        }
        .ab-img-tall { grid-row: 1 / 3; }
        .ab-img-sm { /* no extra styles needed */ }

        /* ─── REAL IMAGE STYLES ─── */
        .ab-img-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Tall card needs a fixed height so the image fills it properly */
        .ab-img-tall .ab-img-photo {
          min-height: 420px;
        }
        /* Small cards */
        .ab-img-sm .ab-img-photo {
          height: 200px;
        }
        .ab-img:hover .ab-img-photo { transform: scale(1.05); }

        /* Skeleton shimmer shown until image loads */
        .ab-img-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #e8f5e9 25%,
            #c8e6c9 50%,
            #e8f5e9 75%
          );
          background-size: 200% 100%;
          animation: ab-shimmer 1.5s infinite;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .ab-img-skeleton.hidden { opacity: 0; }
        @keyframes ab-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }

        .ab-overlay {
          position: absolute; inset: 0;
          background: rgba(26, 46, 26, 0);
          transition: background 0.4s ease;
          display: flex; align-items: flex-end; padding: 20px;
        }
        .ab-img:hover .ab-overlay { background: rgba(26, 46, 26, 0.3); }

        .ab-overlay-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff; opacity: 0;
          transform: translateY(8px); transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .ab-img:hover .ab-overlay-label { opacity: 1; transform: translateY(0); }


        /* ─── Horizontal Slider Track Section ─── */
        .ab-global-section {
          width: 100%;
          border-top: 1px solid rgba(26, 46, 26, 0.15);
          padding-top: 100px;

          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.4s;
        }
        .is-visible .ab-global-section { opacity: 1; transform: translateY(0); }

        .slider-wrapper {
          width: 100%;
          padding: 20px 0 80px 0;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider-wrapper::-webkit-scrollbar { display: none; }

        .slider-track-container {
          position: relative;
          width: calc(100% - 100px);
          min-width: 600px;
          height: 40px;
          margin: 0 auto;
        }

        .slider-line-bg {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(26, 46, 26, 0.15);
          transform: translateY(-50%);
          border-radius: 2px;
        }

        .slider-line-progress {
          position: absolute;
          top: 50%;
          left: 0;
          height: 2px;
          background: #2e7d32;
          transform: translateY(-50%);
          transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 2px;
        }

        .slider-node {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #eaf1ea;
          border: 2px solid #a5d6a7;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 0 0 4px #fff;
        }

        .slider-node:hover .slider-dot {
          transform: scale(1.4);
          border-color: #2e7d32;
        }

        .slider-node.active .slider-dot {
          background: #2e7d32;
          border-color: #2e7d32;
          transform: scale(1.6);
          box-shadow: 0 0 0 4px #fff, 0 4px 12px rgba(46, 125, 50, 0.3);
        }

        .slider-label {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #7a9478;
          transition: color 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
        }
        .slider-node.active .slider-label {
          color: #1a2e1a;
          transform: translateX(-50%) translateY(4px);
        }

        .global-content-box {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          min-height: 220px;
          background: #fcfcfc;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 12px 40px rgba(26, 46, 26, 0.04);
          border: 1px solid rgba(26, 46, 26, 0.05);
        }

        .global-content-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .global-era-tag {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2e7d32;
          background: rgba(46, 125, 50, 0.1);
          padding: 6px 14px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .global-era-title {
          font-family: 'Lora', serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 400;
          color: #1a2e1a;
          line-height: 1.25;
          margin-bottom: 24px;
        }

        .global-metric {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #4a6b4a;
          border-top: 1px solid rgba(26, 46, 26, 0.1);
          padding-top: 16px;
          width: 100%;
        }
        .global-metric svg {
          width: 16px; height: 16px; fill: #2e7d32;
        }

        .global-era-desc {
          font-size: 16px;
          line-height: 1.8;
          color: #3b593b;
          font-weight: 300;
        }

        .fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 968px) {
          .ab-global-section { padding-top: 60px; }
          .slider-wrapper { padding: 20px 20px 80px 20px; }
          .slider-track-container { width: 100%; min-width: 500px; }
          .global-content-box { grid-template-columns: 1fr; gap: 32px; padding: 32px 24px; }
          .global-metric { border-top: none; padding-top: 0; margin-bottom: 16px; }
        }
      `}</style>

      <section className={`ab ${visible ? "is-visible" : ""}`} ref={ref as React.RefObject<HTMLElement>}>
        <div className="ab-wrap">

          {/* Centered heading */}
          <div className="ab-center" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <span className="ab-tag">About Us</span>
            <h2 className="ab-h1">
              We protect animals and the <em>world they call home.</em>
            </h2>
          </div>

          {/* Two col: left text, right images */}
          <div className="ab-body">
            {/* Left Text */}
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}>
              <p className="ab-desc">
                For nearly three decades, our nonprofit has worked at the intersection
                of wildlife rescue and environmental restoration. We believe that
                healing animals and healing ecosystems are inseparable — and that
                every community has a role to play in building a kinder, greener world.
              </p>
              <div className="ab-quote">
                <p>"The forest is not a resource. It is a home — for every creature that breathes within it."</p>
              </div>
              <a href="#mission" className="ab-link">
                Read our story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Right Images */}
            <div className="ab-right" style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}>
              {/* Tall card: Wildlife */}
              <ImageCard
                src={cardImages.wildlife.src}
                alt={cardImages.wildlife.alt}
                label={cardImages.wildlife.label}
                className="ab-img-tall"
              />

              {/* Top-right: Forest */}
              <ImageCard
                src={cardImages.forest.src}
                alt={cardImages.forest.alt}
                label={cardImages.forest.label}
                className="ab-img-sm"
              />

              {/* Bottom-right: Community */}
              <ImageCard
                src={cardImages.community.src}
                alt={cardImages.community.alt}
                label={cardImages.community.label}
                className="ab-img-sm"
              />
            </div>
          </div>

          {/* ─── Global Slider Track Timeline ─── */}
          <div className="ab-global-section">

            <div className="ab-center" style={{ marginBottom: "60px" }}>
              <span className="ab-tag">Global Evolution</span>
              <h2 className="ab-h1">
                Conservation driven by <em>human connection.</em>
              </h2>
              <p className="ab-header-desc">
                Our work is part of a global shift. Explore how worldwide conservation evolved from isolating nature to actively empowering the communities that live within it.
              </p>
            </div>

            {/* Interactive Horizontal Slider */}
            <div className="slider-wrapper">
              <div className="slider-track-container">
                <div className="slider-line-bg"></div>
                <div className="slider-line-progress" style={{ width: `${progressPercentage}%` }}></div>

                {globalTimelineData.map((item, index) => {
                  const positionPercentage = (index / (globalTimelineData.length - 1)) * 100;
                  return (
                    <button
                      key={item.id}
                      className={`slider-node ${activeEra === index ? "active" : ""}`}
                      style={{ left: `${positionPercentage}%` }}
                      onClick={() => setActiveEra(index)}
                      aria-label={`View era ${item.id}`}
                    >
                      <div className="slider-dot"></div>
                      <span className="slider-label">{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Content Display */}
            <div key={activeEra} className="global-content-box fade-in">
              <div className="global-content-left">
                <span className="global-era-tag">{globalTimelineData[activeEra].tag}</span>
                <h4 className="global-era-title">{globalTimelineData[activeEra].title}</h4>
                <div className="global-metric">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  {globalTimelineData[activeEra].metric}
                </div>
              </div>

              <div className="global-content-right">
                <p className="global-era-desc">
                  {globalTimelineData[activeEra].description}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

// ─── ImageCard sub-component ──────────────────────────────────────────────────

function ImageCard({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`ab-img ${className}`}>
      <img
        className="ab-img-photo"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
      />
      {/* Shimmer skeleton until image loads */}
      <div
        className="ab-img-skeleton"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: "none" }}
      />
      <div className="ab-overlay">
        <span className="ab-overlay-label">{label}</span>
      </div>
    </div>
  );
}