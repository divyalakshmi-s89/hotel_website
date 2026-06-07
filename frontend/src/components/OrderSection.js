import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderSection() {
  const { cart, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    customerName: '',
    mobileNumber: '',
    address: '',
    landmark: '',
    pincode: '',
    distance: '',
    specialInstructions: '',
  });
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const dist = parseFloat(form.distance);
    if (!isNaN(dist) && dist >= 0) {
      api.getDeliveryCharge(dist)
        .then(res => { if (res.success) setDeliveryCharge(res.deliveryCharge); })
        .catch(() => {});
    }
  }, [form.distance]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (cart.items.length === 0) { toast.error('Add items to cart first!'); return; }
    if (!form.customerName || !form.mobileNumber || !form.address) {
      toast.error('Please fill Name, Mobile and Address'); return;
    }
    if (!/^\d{10}$/.test(form.mobileNumber)) {
      toast.error('Enter a valid 10-digit mobile number'); return;
    }

    setLoading(true);
    try {
      const res = await api.placeOrder({
        ...form,
        items: cart.items,
        subtotal,
        deliveryCharge,
        totalAmount: subtotal + deliveryCharge,
      });
      if (res.success) {
        setSuccess(res);
        clearCart();
        toast.success('Order placed successfully!');
      } else {
        toast.error(res.message || 'Failed to place order');
      }
    } catch {
      toast.error('Server error. Please call us at 8946086668');
    }
    setLoading(false);
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <section className="section order-section" id="order">
        <div className="container">
          <div className="order-success">
            <div className="success-icon"><FiCheckCircle size={64} color="#4CAF50" /></div>
            <h2>Order Placed Successfully! 🎉</h2>
            <p>{success.message}</p>
            <div className="order-id">Order ID: <strong>{success.orderId}</strong></div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
              Total: <strong style={{ color: 'var(--secondary)' }}>₹{success.totalAmount}</strong>
              &nbsp;| Delivery: ₹{success.deliveryCharge}
              &nbsp;| 💵 Cash on Delivery
            </p>
            <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              📱 We will call you at <strong>{form.mobileNumber}</strong> to confirm your order.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <button
                className="btn-primary"
                style={{ border: 'none' }}
                onClick={() => {
                  setSuccess(null);
                  setForm({ customerName:'', mobileNumber:'', address:'', landmark:'', pincode:'', distance:'', specialInstructions:'' });
                }}
              >
                🛒 Place Another Order
              </button>
              <a
                href="https://wa.me/918946086668?text=Hi! I just placed an order. Please confirm."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                💬 Confirm via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── Order Form ── */
  return (
    <section className="section order-section" id="order">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Online Ordering</div>
          <h2 className="section-title" style={{ color: 'white' }}>Place Your Order</h2>
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Order from home – fresh food delivered to your doorstep
          </p>
          <div className="section-divider" />
        </div>

        <div className="order-grid">
          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="order-form-card">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '1.2rem' }}>
                📋 Customer Details
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="customerName" value={form.customerName} onChange={handleChange}
                      placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange}
                      placeholder="10-digit number" maxLength={10} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery Address *</label>
                  <textarea name="address" value={form.address} onChange={handleChange}
                    placeholder="House no, Street, Village / Town" rows={3} required
                    style={{ resize: 'vertical' }} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Landmark</label>
                    <input name="landmark" value={form.landmark} onChange={handleChange}
                      placeholder="Near school / temple" />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange}
                      placeholder="626189" maxLength={6} />
                  </div>
                </div>

                <div className="form-group">
                  <label>Approx. Distance from Hotel (km)</label>
                  <input name="distance" type="number" min="0" step="0.5"
                    value={form.distance} onChange={handleChange}
                    placeholder="e.g. 2.5" />
                </div>

                {form.distance && (
                  <div className="delivery-info">
                    <h4>🚚 Delivery Charge: ₹{deliveryCharge}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
                      ≤1 km: Free &nbsp;|&nbsp; 1–3 km: ₹20 &nbsp;|&nbsp; 3–5 km: ₹40
                      &nbsp;|&nbsp; 5–10 km: ₹60 &nbsp;|&nbsp; 10 km+: ₹80
                    </p>
                  </div>
                )}

                <div className="form-group">
                  <label>Special Instructions</label>
                  <textarea name="specialInstructions" value={form.specialInstructions}
                    onChange={handleChange}
                    placeholder="Allergy info, spice level, extra chutney…"
                    rows={2} style={{ resize: 'vertical' }} />
                </div>

                <button type="submit" className="submit-order-btn"
                  disabled={loading || cart.items.length === 0}>
                  {loading ? '⏳ Placing Order…' : '🚀 Place Order — Cash on Delivery'}
                </button>

                {cart.items.length === 0 && (
                  <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                    ← Add items from the menu first
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* ── Right: Summary ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="order-summary-card">
              <h3>🛒 Order Summary</h3>

              {cart.items.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  No items in cart yet
                </p>
              ) : (
                <>
                  {cart.items.map(item => (
                    <div key={item.name} className="order-summary-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="order-summary-item"
                    style={{ borderBottom: 'none', marginTop: '0.5rem', fontWeight: 600 }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="order-summary-item" style={{ borderBottom: 'none' }}>
                    <span>Delivery Charge</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                  <div className="order-summary-item"
                    style={{
                      borderBottom: '2px solid rgba(255,255,255,0.15)',
                      paddingBottom: '0.8rem', marginBottom: '0.8rem',
                      fontWeight: 700, fontSize: '1.1rem'
                    }}>
                    <span>Total Payable</span>
                    <span style={{ color: 'var(--secondary)' }}>₹{subtotal + deliveryCharge}</span>
                  </div>
                </>
              )}

              <div className="cod-badge">✅ Cash on Delivery</div>

              <div style={{
                marginTop: '1.5rem', display: 'flex', flexDirection: 'column',
                gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)'
              }}>
                <p>📍 Sathanandhapuram, Sivakasi Route, Muthalipatti</p>
                <p>📞 <a href="tel:+918946086668" style={{ color: 'var(--secondary)' }}>8946086668</a></p>
                <p>💬 <a href="https://wa.me/918946086668" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#25D366' }}>WhatsApp: 8946086668</a></p>
                <p>⏰ 7:00 AM – 10:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
