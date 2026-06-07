import React from 'react';

export default function Footer() {
  const PHONE = '8946086668';
  const WA = '918946086668';

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2>🍛 Jeya Hotel</h2>
          <div className="tagline">Authentic Home Style Food</div>
          <p>
            Serving genuine South Indian home-style food with love and dedication
            for over 10 years. Your satisfaction is our greatest reward.
          </p>
          <div className="hours-badge">⏰ Open 7:00 AM – 10:00 PM Daily</div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a
              href={`tel:+91${PHONE}`}
              style={{ color: 'var(--secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              📞 {PHONE}
            </a>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25D366', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              💬 {PHONE}
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#snacks">Snacks</a></li>
            <li><a href="#order">Order Online</a></li>
            <li><a href="#festival">Festival Orders</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>📍 Sathanandhapuram,</li>
            <li>Sivakasi Route,</li>
            <li>Muthalipatti – 626189</li>
            <li>Tamil Nadu, India</li>
            <li style={{ marginTop: '0.6rem' }}>
              <a href={`tel:+91${PHONE}`}>📞 +91 {PHONE}</a>
            </li>
            <li>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
                💬 +91 {PHONE}
              </a>
            </li>
          </ul>
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Menu Hours</h4>
            <ul>
              <li>🌅 Breakfast: 7 AM – 11 AM</li>
              <li>☀️ Lunch: 12 PM – 4 PM</li>
              <li>🌙 Dinner: 6 PM – 10 PM</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Jeya Hotel. All Rights Reserved.</p>
        <p style={{ fontSize: '0.75rem' }}>Made with ❤️ for authentic South Indian food lovers</p>
      </div>
    </footer>
  );
}
