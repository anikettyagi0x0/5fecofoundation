"use client";

import { useEffect, useRef, useState } from "react";

export default function DonationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form State
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");

  const presetAmounts = [25, 50, 100, 250];

  // Scroll reveal animation
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

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
    alert(`Processing ${donationType} donation of $${finalAmount}`);
    // In a real app, redirect to Stripe/payment gateway here
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .donation-section {
          font-family: 'Inter', sans-serif;
          position: relative;
          padding: 140px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          min-height: 800px;
        }
        
        .donation-section * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── Cinematic Background ─── */
        .donation-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }
        
        .donation-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10, 20, 10, 0.9) 0%, rgba(20, 40, 20, 0.7) 100%);
          z-index: 2;
        }

        /* ─── Layout Container ─── */
        .donation-container {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1280px;
          display: grid;
          grid-template-columns: 1fr 480px; /* Text on left, fixed-width form on right */
          gap: 80px;
          align-items: center;
        }

        /* ─── Left Column (Text) ─── */
        .donation-text-wrap {
          color: #fff;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .is-visible .donation-text-wrap {
          opacity: 1;
          transform: translateY(0);
        }

        .donation-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a5d6a7;
          margin-bottom: 24px;
        }
        .donation-tag::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: #a5d6a7;
        }

        .donation-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(40px, 4.5vw, 64px);
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .donation-h2 em {
          font-style: italic;
          color: #a5d6a7;
        }

        .donation-desc {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          max-width: 500px;
          margin-bottom: 40px;
        }

        .trust-badges {
          display: flex;
          gap: 24px;
          align-items: center;
          opacity: 0.8;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
        }
        .trust-item svg { width: 18px; height: 18px; fill: #a5d6a7; }

        /* ─── Right Column (The Form Card) ─── */
        .donation-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
          
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
        }
        .is-visible .donation-card {
          opacity: 1;
          transform: translateY(0);
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .form-title {
          font-size: 22px;
          font-weight: 600;
          color: #111;
          margin-bottom: 8px;
        }
        .form-subtitle {
          font-size: 14px;
          color: #666;
        }

        /* Segmented Control (One-time / Monthly) */
        .type-toggle {
          display: flex;
          background: #f1f5f1;
          border-radius: 50px;
          padding: 4px;
          position: relative;
          margin-bottom: 32px;
        }
        .type-btn {
          flex: 1;
          padding: 12px 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          background: transparent;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }
        .type-btn.active { color: #1a2e1a; }
        
        .toggle-slider {
          position: absolute;
          top: 4px; bottom: 4px;
          width: calc(50% - 4px);
          background: #ffffff;
          border-radius: 50px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          z-index: 1;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Slider logic based on state */
        [data-type="monthly"] .toggle-slider { transform: translateX(100%); }

        /* Amount Selection Grid */
        .amount-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .amount-btn {
          padding: 16px 0;
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #111;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .amount-btn:hover { border-color: #a5d6a7; }
        .amount-btn.active {
          border-color: #2e7d32;
          background: #f1f8e9;
          color: #2e7d32;
          box-shadow: 0 0 0 1px #2e7d32 inset;
        }

        /* Custom Amount Input */
        .custom-amount-wrapper {
          position: relative;
          margin-bottom: 32px;
        }
        .custom-amount-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
          font-weight: 500;
          color: #555;
        }
        .custom-amount-input {
          width: 100%;
          padding: 16px 16px 16px 36px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #111;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .custom-amount-input:focus {
          border-color: #2e7d32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }
        /* Hide input when not selected */
        .custom-amount-wrapper.hidden { display: none; }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          background: #1a2e1a;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 18px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          background: #2e7d32;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(46, 125, 50, 0.25);
        }
        .submit-btn svg { width: 18px; height: 18px; fill: currentColor; }

        /* Footer text */
        .form-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .form-footer svg { width: 12px; height: 12px; fill: #888; }

        /* Responsive */
        @media (max-width: 1024px) {
          .donation-container {
            grid-template-columns: 1fr;
            max-width: 600px;
            gap: 60px;
          }
          .donation-text-wrap { text-align: center; }
          .donation-tag { justify-content: center; }
          .donation-tag::before { display: none; }
          .donation-desc { margin: 0 auto 40px auto; }
          .trust-badges { justify-content: center; }
        }
        
        @media (max-width: 600px) {
          .donation-section { padding: 100px 20px; }
          .donation-card { padding: 32px 24px; border-radius: 16px; }
          .donation-h2 { font-size: 32px; }
        }
      `}</style>

      <section className={`donation-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
        
        {/* Replace with your actual background image URL */}
        <img 
          src="/donation-bg.jpg" 
          alt="Deep forest landscape" 
          className="donation-bg"
        />
        <div className="donation-overlay"></div>

        <div className="donation-container">
          
          {/* ─── Left Side: Impact Copy ─── */}
          <div className="donation-text-wrap">
            <span className="donation-tag">Take Action</span>
            <h2 className="donation-h2">
              Your donation protects the <em>wild.</em>
            </h2>
            <p className="donation-desc">
              100% of your contribution goes directly to field operations, anti-poaching patrols, and wildlife rehabilitation centers. Together, we can restore balance to these fragile ecosystems.
            </p>
            
            <div className="trust-badges">
              <div className="trust-item">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                Secure Donation
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                Tax Deductible
              </div>
            </div>
          </div>

          {/* ─── Right Side: Interactive Form Card ─── */}
          <form className="donation-card" onSubmit={handleDonate}>
            
            <div className="form-header">
              <h3 className="form-title">Choose your impact</h3>
              <p className="form-subtitle">Every contribution makes a difference.</p>
            </div>

            {/* Segmented Toggle Control */}
            <div className="type-toggle" data-type={donationType}>
              <div className="toggle-slider"></div>
              <button 
                type="button" 
                className={`type-btn ${donationType === "one-time" ? "active" : ""}`}
                onClick={() => setDonationType("one-time")}
              >
                Give Once
              </button>
              <button 
                type="button" 
                className={`type-btn ${donationType === "monthly" ? "active" : ""}`}
                onClick={() => setDonationType("monthly")}
              >
                Monthly
              </button>
            </div>

            {/* Preset Amount Grid */}
            <div className="amount-grid">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`amount-btn ${selectedAmount === amt ? "active" : ""}`}
                  onClick={() => setSelectedAmount(amt)}
                >
                  ${amt}
                </button>
              ))}
              <button
                type="button"
                className={`amount-btn ${selectedAmount === "custom" ? "active" : ""}`}
                onClick={() => setSelectedAmount("custom")}
              >
                Custom
              </button>
            </div>

            {/* Hidden/Revealed Custom Input */}
            <div className={`custom-amount-wrapper ${selectedAmount !== "custom" ? "hidden" : ""}`}>
              <span className="custom-amount-icon">$</span>
              <input 
                type="number" 
                placeholder="Enter amount"
                className="custom-amount-input"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="1"
                required={selectedAmount === "custom"}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Donate {selectedAmount !== "custom" ? `$${selectedAmount}` : ""}
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Footer Trust Text */}
            <div className="form-footer">
              <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
              Encrypted and secure. Cancel monthly anytime.
            </div>

          </form>

        </div>
      </section>
    </>
  );
}