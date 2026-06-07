import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const EVENT_TYPES = [
  'Wedding Function', 'Birthday Party', 'Corporate Event',
  'Festival Celebration', 'House Warming', 'Baby Shower', 'Other',
];

export default function FestivalSection() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', eventType: '',
    eventDate: '', guestCount: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitFestivalOrder(form);
      if (res.success) {
        toast.success(res.message);
        setForm({ name: '', mobile: '', email: '', eventType: '', eventDate: '', guestCount: '', message: '' });
      } else {
        toast.error(res.message || 'Something went wrong');
      }
    } catch {
      toast.error('Server error. Please call us at 8946086668');
    }
    setLoading(false);
  };

  const cards = [
    { icon: '💍', title: 'Wedding Functions',  desc: 'Grand feasts for your most special day' },
    { icon: '🎂', title: 'Birthday Parties',   desc: 'Delicious spreads for joyful celebrations' },
    { icon: '🏢', title: 'Corporate Events',   desc: 'Professional catering with home-style taste' },
    { icon: '🪔', title: 'Festival Catering',  desc: 'Traditional food for every festival occasion' },
  ];

  return (
    <section className="section section-alt" id="festival">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Festival &amp; Bulk Orders</div>
          <h2 className="section-title">Catering for Every Occasion</h2>
          <p className="section-desc">
            From intimate gatherings to grand celebrations, we bring authentic
            home-style food to your event
          </p>
          <div className="section-divider" />
        </div>

        {/* Cards */}
        <div className="festival-grid">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="festival-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="festival-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Enquiry Form */}
        <motion.div
          className="festival-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>🎉 Book Festival / Bulk Order</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Full name" required />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input name="mobile" value={form.mobile} onChange={handleChange}
                  placeholder="10-digit number" maxLength={10} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Event Type *</label>
                <select name="eventType" value={form.eventType} onChange={handleChange} required>
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Event Date *</label>
                <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange}
                  required min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Number of Guests *</label>
                <input name="guestCount" type="number" min="10" value={form.guestCount}
                  onChange={handleChange} placeholder="Minimum 10 guests" required />
              </div>
              <div className="form-group">
                <label>Email (Optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Additional Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us about your event, menu preferences, special requirements…"
                rows={3} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button type="submit" className="submit-order-btn" style={{ flex: 1 }} disabled={loading}>
                {loading ? '⏳ Submitting…' : '🎉 Submit Enquiry'}
              </button>
              <a
                href="https://wa.me/918946086668?text=Hi! I'd like to book a catering order."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, justifyContent: 'center', background: '#25D366',
                  display: 'flex', alignItems: 'center', padding: '0.9rem 1rem',
                  borderRadius: '50px', fontWeight: 700, color: 'white', fontSize: '0.95rem',
                  textDecoration: 'none'
                }}
              >
                💬 WhatsApp Enquiry
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
