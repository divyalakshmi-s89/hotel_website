import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCart } from '../context/CartContext';
import { SNACKS } from '../utils/menuData';
import toast from 'react-hot-toast';

// Snack price per KG
const SNACK_PRICE_PER_KG = 250;

function SnackCard({ snack, index, inView }) {
  const [imgError, setImgError] = useState(false);
  const { cart, addItem, removeItem, updateQuantity } = useCart();

  // Use a unique key combining name + "snack"
  const cartItemName = `${snack.name} (Snack)`;
  const cartItem = cart.items.find(i => i.name === cartItemName);

  const handleAdd = () => {
    addItem({
      name: cartItemName,
      price: SNACK_PRICE_PER_KG,
      img: snack.img,
      category: 'Snacks',
    });
    toast.success(`${snack.name} added! ₹${SNACK_PRICE_PER_KG}/kg`);
  };

  const handleIncrease = () => updateQuantity(cartItemName, cartItem.quantity + 1);
  const handleDecrease = () => {
    if (cartItem.quantity <= 1) {
      removeItem(cartItemName);
      toast('Removed from cart', { icon: '🗑️' });
    } else {
      updateQuantity(cartItemName, cartItem.quantity - 1);
    }
  };

  return (
    <motion.div
      className="snack-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Image */}
      <div className="snack-img-wrap">
        {!imgError ? (
          <img
            src={snack.img}
            alt={snack.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
          />
        ) : (
          <div className="snack-img-fallback">🍟</div>
        )}
      </div>

      {/* Info */}
      <div className="snack-info">
        <div className="snack-name">{snack.name}</div>
        <div className="snack-price-tag">₹{SNACK_PRICE_PER_KG} / kg</div>

        {/* Add / Quantity controls */}
        <div style={{ marginTop: '0.5rem' }}>
          {!cartItem ? (
            <button className="snack-add-btn" onClick={handleAdd}>
              + Add
            </button>
          ) : (
            <div className="qty-controls" style={{ justifyContent: 'center' }}>
              <button className="qty-btn" onClick={handleDecrease}>−</button>
              <span className="qty-num">{cartItem.quantity} kg</span>
              <button className="qty-btn" onClick={handleIncrease}>+</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SnacksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section section-alt" id="snacks" ref={ref}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Homemade Snacks</div>
          <h2 className="section-title">Fresh Snacks Daily</h2>
          <p className="section-desc">
            Made fresh every day – crispy, crunchy & bursting with traditional flavors
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(230,81,0,0.1)', border: '1px solid rgba(230,81,0,0.25)',
            color: 'var(--primary)', padding: '0.4rem 1.2rem', borderRadius: '50px',
            fontSize: '0.9rem', fontWeight: 700, margin: '0.8rem auto 0', width: 'fit-content'
          }}>
            🏷️ All Snacks — ₹250 per kg
          </div>
          <div className="section-divider" />
        </div>

        <div className="snacks-grid">
          {SNACKS.map((snack, i) => (
            <SnackCard key={snack.name} snack={snack} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.95rem' }}>
            📦 Minimum 250g order · Bulk orders available for festivals & events!
          </p>
          <a
            href="https://wa.me/918946086668?text=Hi! I'd like to enquire about homemade snacks order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            💬 Bulk Order via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
