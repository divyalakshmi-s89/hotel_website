import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const features = [
    { icon: '🏠', title: 'Home Style Cooking', desc: 'Traditional recipes passed down generations' },
    { icon: '🥗', title: 'Fresh Ingredients', desc: 'Sourced fresh daily for authentic taste' },
    { icon: '🎉', title: 'Festival Catering', desc: 'Weddings, birthdays & corporate events' },
    { icon: '👨‍👩‍👧', title: 'Family Friendly', desc: 'A warm, welcoming atmosphere for all' },
  ];

  return (
    <section className="section section-alt" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            <div className="about-img-placeholder">
              <span>🍛</span>
              <p>Jeya Hotel</p>
            </div>
            <div className="about-badge">
              <strong>10+</strong>
              Years of Trust
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div>
              <div className="section-label">Our Story</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: '1rem' }}>
                A Decade of<br /><em style={{ color: 'var(--primary)' }}>Home Style Taste</em>
              </h2>
            </div>
            <p>
              Established over 10 years ago in the heart of Muthalipatti, Jeya Hotel has been serving
              authentic South Indian home-style food with love and dedication. We use the freshest
              ingredients to craft meals that remind you of home.
            </p>
            <p>
              From our signature morning breakfasts to hearty lunches and satisfying dinners, every
              dish is prepared with traditional recipes and genuine care. Our homemade snacks are
              crafted fresh daily, ensuring the best quality for our valued customers.
            </p>

            <div className="about-features">
              {features.map(f => (
                <div key={f.title} className="about-feature">
                  <span className="about-feature-icon">{f.icon}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '0.7rem 1.2rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>10+</div>
                <div style={{ fontSize: '0.75rem' }}>Years Experience</div>
              </div>
              <div style={{ background: 'var(--secondary)', color: 'var(--text)', padding: '0.7rem 1.2rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>1</div>
                <div style={{ fontSize: '0.75rem' }}>Trusted Branch</div>
              </div>
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.7rem 1.2rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>7AM</div>
                <div style={{ fontSize: '0.75rem' }}>Opens Daily</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
