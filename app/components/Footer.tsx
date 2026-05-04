"use client";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .footer-section {
          font-family: 'Inter', sans-serif;
          /* Deep, rich forest gradient */
          background: linear-gradient(180deg, #0d170d 0%, #050a05 100%);
          color: #ffffff;
          padding: 100px 40px 40px 40px;
          position: relative;
          overflow: hidden;
        }
        
        .footer-section * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        /* ─── Top Grid ─── */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
        }

        /* Column 1: Brand */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Lora', serif;
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          text-decoration: none;
          margin-bottom: 24px;
        }
        
        /* Updated Logo Image Styles */
        .footer-logo img {
          height: 56px; /* Adjust height as needed */
          width: auto;
          object-fit: contain;
        }

        .footer-mission {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          max-width: 380px;
        }

        /* Social Icons */
        .footer-socials {
          display: flex;
          gap: 16px;
        }
        .social-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-btn svg {
          width: 18px; height: 18px;
          fill: currentColor;
          transition: transform 0.3s ease;
        }
        .social-btn:hover {
          background: #a5d6a7;
          border-color: #a5d6a7;
          color: #050a05;
          transform: translateY(-4px);
        }

        /* Columns 2 & 3: Links */
        .footer-col-title {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-link {
          font-size: 14.5px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .footer-link:hover {
          color: #a5d6a7;
          transform: translateX(6px); /* Premium slide effect */
        }

        /* Column 4: Newsletter */
        .footer-newsletter-desc {
          font-size: 14.5px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }
        .newsletter-form {
          position: relative;
          display: flex;
          align-items: center;
        }
        .newsletter-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 16px 24px;
          padding-right: 60px; /* Space for the button */
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .newsletter-input:focus {
          border-color: #a5d6a7;
          background: rgba(255, 255, 255, 0.08);
        }
        .newsletter-btn {
          position: absolute;
          right: 6px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #a5d6a7;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .newsletter-btn svg {
          width: 16px; height: 16px;
          fill: #050a05;
          transition: transform 0.3s ease;
        }
        .newsletter-btn:hover {
          background: #ffffff;
        }
        .newsletter-btn:hover svg {
          transform: translateX(2px);
        }

        /* ─── Bottom Bar ─── */
        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-copyright {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.5);
        }
        .footer-legal-links {
          display: flex;
          gap: 24px;
        }
        .footer-legal-link {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-legal-link:hover {
          color: #ffffff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px 40px;
          }
          .footer-brand-col {
            grid-column: span 2;
          }
          .footer-mission { max-width: 600px; }
        }

        @media (max-width: 600px) {
          .footer-section { padding: 80px 24px 40px 24px; }
          .footer-grid { grid-template-columns: 1fr; gap: 48px; }
          .footer-brand-col { grid-column: span 1; }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-legal-links { flex-wrap: wrap; gap: 16px; }
        }
      `}</style>

      <footer className="footer-section">
        <div className="footer-container">
          
          {/* Main Content Grid */}
          <div className="footer-grid">
            
            {/* Column 1: Brand & Mission */}
            <div className="footer-brand-col">
              <a href="#" className="footer-logo">
                {/* Replaced SVG with standard img tag */}
                <img src="/5feco-logo-trans.png" alt="WildCare Logo" />
                5F Eco Foundation of India
              </a>
              <p className="footer-mission">
                We are dedicated to the preservation, rescue, and rehabilitation of wildlife. Working alongside local communities to restore natural habitats and ensure ecological balance for future generations.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-btn" aria-label="Twitter">
                  <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="footer-col-title">Organization</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Our Story</a></li>
                <li><a href="#" className="footer-link">Impact & Reach</a></li>
                <li><a href="#" className="footer-link">Our Team</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Volunteer With Us</a></li>
                <li><a href="#" className="footer-link">Donate</a></li>
                <li><a href="#" className="footer-link">Rescue Stories</a></li>
                <li><a href="#" className="footer-link">Partner With Usl</a></li>
                <li><a href="#" className="footer-link">Workshops & Events</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="footer-col-title">Stay Connected</h4>
              <p className="footer-newsletter-desc">
                Subscribe to our field dispatches. Get monthly updates on our rescue missions and ecosystem restoration projects.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter your email address" 
                  required 
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} 5F Eco Foundation of India. All rights reserved.
            </div>
            <div className="footer-legal-links">
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Terms of Service</a>
              <a href="#" className="footer-legal-link">Cookie Settings</a>
              <a href="#" className="footer-legal-link">Transparency</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}