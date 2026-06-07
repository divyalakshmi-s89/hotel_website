import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-pattern" />
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-badge"
        >
          ⭐ 10+ Years of Trusted Taste
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Jeya <span>Hotel</span>
        </motion.h1>

        <motion.div
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Authentic Home Style Food with 10+ Years of Trust
        </motion.div>

        <motion.div
          className="hero-divider"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.div
          className="hero-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {['🏠 Home Style Cooking', '🥗 Fresh Ingredients', '🎉 Festival Catering', '🚚 Cash on Delivery', '⏰ 7AM – 10PM'].map(f => (
            <div key={f} className="hero-feature">{f}</div>
          ))}
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a href="#menu" className="btn-primary">🛒 Order Now</a>
          <a href="#menu" className="btn-outline">📋 View Menu</a>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <span>Scroll Down</span>
        <span>↓</span>
      </div>
    </section>
  );
}
