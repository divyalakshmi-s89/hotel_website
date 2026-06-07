import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2 } from 'react-icons/fi';

function CartItemImg({ img, name }) {
  const [err, setErr] = useState(false);
  if (!err && img) {
    return <img src={img} alt={name} className="cart-item-img" onError={() => setErr(true)} />;
  }
  return <div className="cart-item-img-fallback">🍽️</div>;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cart-header">
              <h2>🛒 Your Cart {totalItems > 0 && `(${totalItems})`}</h2>
              <button className="cart-close" onClick={onClose}><FiX /></button>
            </div>

            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items from our menu!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.items.map(item => (
                    <div key={item.name} className="cart-item">
                      <CartItemImg img={item.img} name={item.name} />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <span className="cart-item-price">
                          ₹{item.price} × {item.quantity} = <strong>₹{item.price * item.quantity}</strong>
                        </span>
                      </div>
                      <div className="qty-controls" style={{ marginRight: '0.4rem' }}>
                        <button className="qty-btn" style={{ width: 24, height: 24, fontSize: '0.85rem' }}
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}>−</button>
                        <span className="qty-num" style={{ fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button className="qty-btn" style={{ width: 24, height: 24, fontSize: '0.85rem' }}
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.name)}><FiTrash2 /></button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Delivery Charge</span>
                    <span style={{ color: 'var(--accent)' }}>Based on distance</span>
                  </div>
                  <div className="cart-total-row">
                    <span>Estimated Total</span>
                    <span style={{ color: 'var(--primary)' }}>₹{subtotal}+</span>
                  </div>
                  <button className="cart-checkout-btn" onClick={() => { onClose(); onCheckout(); }}>
                    🚀 Proceed to Order
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
