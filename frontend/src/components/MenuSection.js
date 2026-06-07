import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MENU } from '../utils/menuData';
import { getAvailableMenus } from '../utils/availability';
import toast from 'react-hot-toast';

function MenuCard({ item, category, isMenuAvailable }) {
  const { cart, addItem, updateQuantity } = useCart();
  const cartItem = cart.items.find(i => i.name === item.name);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    if (!isMenuAvailable) {
      toast.error(`${category} is not available right now. Check timings!`, { icon: '⏰' });
      return;
    }
    addItem({ name: item.name, price: item.price, img: item.img, category });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <motion.div
      className={`menu-card${!isMenuAvailable ? ' unavailable-card' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      whileHover={{ y: isMenuAvailable ? -6 : 0, transition: { duration: 0.2 } }}
    >
      <div className="menu-card-img">
        {!imgError ? (
          <img
            src={item.img}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="menu-card-img-fallback">🍽️</div>
        )}
        <div className="menu-card-img-overlay" />
      </div>
      <div className="menu-card-body">
        <div className={`menu-availability-tag ${isMenuAvailable ? 'available' : 'unavailable'}`}>
          {isMenuAvailable ? '✅ Available Now' : '⏰ Not Available Now'}
        </div>
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <div className="menu-card-footer">
          <span className="menu-price">₹{item.price}</span>
          {cartItem ? (
            <div className="qty-controls">
              <button className="qty-btn" onClick={() => updateQuantity(item.name, cartItem.quantity - 1)}>−</button>
              <span className="qty-num">{cartItem.quantity}</span>
              <button className="qty-btn" onClick={() => updateQuantity(item.name, cartItem.quantity + 1)}>+</button>
            </div>
          ) : (
            <button
              className={`add-btn${!isMenuAvailable ? ' in-cart' : ''}`}
              onClick={handleAdd}
              title={isMenuAvailable ? 'Add to cart' : 'Not available right now'}
              style={!isMenuAvailable ? { background: '#bbb', cursor: 'not-allowed' } : {}}
            >
              {isMenuAvailable ? '+' : '⏰'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('breakfast');
  const current = MENU[activeTab];
  const available = getAvailableMenus();
  const isCurrentMenuAvailable = available[activeTab];

  return (
    <section className="section" id="menu">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Our Menu</div>
          <h2 className="section-title">Taste the Difference</h2>
          <p className="section-desc">Fresh, homestyle food crafted with love – served from morning to night</p>
          <div className="section-divider" />
        </div>

        <div className="menu-tabs">
          {Object.entries(MENU).map(([key, val]) => (
            <button
              key={key}
              className={`menu-tab${activeTab === key ? ' active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {val.emoji} {val.label}
              {available[key] && (
                <span style={{
                  marginLeft: '0.4rem', fontSize: '0.65rem',
                  background: 'rgba(46,125,50,0.2)', color: '#2E7D32',
                  padding: '0.1rem 0.4rem', borderRadius: '50px',
                  fontWeight: 700
                }}>LIVE</span>
              )}
            </button>
          ))}
        </div>

        <div className="menu-time-badge">
          🕐 {current.label} Available: {current.time}
          <span style={{
            marginLeft: '0.8rem',
            color: isCurrentMenuAvailable ? '#2E7D32' : '#c62828',
            fontWeight: 700
          }}>
            {isCurrentMenuAvailable ? '✅ Serving Now' : '⏰ Not Active Now'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="menu-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {current.items.map(item => (
              <MenuCard
                key={item.name}
                item={item}
                category={current.label}
                isMenuAvailable={isCurrentMenuAvailable}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {!isCurrentMenuAvailable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem',
              background: 'rgba(198,40,40,0.08)',
              border: '1px solid rgba(198,40,40,0.2)',
              borderRadius: 'var(--radius)', padding: '1rem 1.5rem',
              color: '#c62828', fontSize: '0.9rem'
            }}
          >
            ⏰ {current.label} is served {current.time}. You can still pre-order!
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-light)' }}>
              (Items will be added to cart for ordering)
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
