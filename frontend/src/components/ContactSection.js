import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const MAPS_LINK = 'https://maps.google.com/?q=Muthalipatti,Sivakasi+Route,Tamil+Nadu+626189';
  const PHONE = '8946086668';
  const WA = '918946086668';

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Find Us</div>
          <h2 className="section-title">Contact & Location</h2>
          <p className="section-desc">Visit us or order online – we're here for you every day</p>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Address */}
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Address</h4>
                <p>
                  Jeya Hotel, Sathanandhapuram,<br />
                  Sivakasi Route, Muthalipatti – 626189,<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <a
                  href={`tel:+91${PHONE}`}
                  style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary)' }}
                >
                  +91 {PHONE}
                </a>
                <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  Call to place orders or enquire
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div
                className="contact-icon"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
              >💬</div>
              <div>
                <h4>WhatsApp</h4>
                <a
                  href={`https://wa.me/${WA}?text=Hi Jeya Hotel! I'd like to place an order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 700, fontSize: '1rem', color: '#25D366' }}
                >
                  +91 {PHONE}
                </a>
                <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  Quick responses during business hours
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-card">
              <div className="contact-icon">⏰</div>
              <div>
                <h4>Opening Hours</h4>
                <p><strong>Every Day:</strong> 7:00 AM – 10:00 PM</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  🌅 Breakfast (7–11 AM) &nbsp;·&nbsp;
                  ☀️ Lunch (12–4 PM) &nbsp;·&nbsp;
                  🌙 Dinner (6–10 PM)
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="map-placeholder">
              <div style={{ fontSize: '4rem' }}>📍</div>
              <h3 style={{
                color: 'var(--text)',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem'
              }}>
                Jeya Hotel
              </h3>
              <p style={{ color: 'var(--text-light)', textAlign: 'center', lineHeight: 1.7 }}>
                Sathanandhapuram, Sivakasi Route<br />
                Muthalipatti – 626189, Tamil Nadu
              </p>
              <div style={{
                display: 'flex', gap: '0.8rem',
                flexWrap: 'wrap', justifyContent: 'center',
                marginTop: '0.5rem'
              }}>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  🗺️ Open in Google Maps
                </a>
                <a
                  href={`https://wa.me/${WA}?text=Hi! I want to order from Jeya Hotel.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                  style={{ background: '#25D366' }}
                >
                  💬 WhatsApp Order
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
