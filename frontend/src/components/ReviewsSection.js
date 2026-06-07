import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { REVIEWS as STATIC_REVIEWS } from '../utils/menuData';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

function StarRating({ rating }) {
  return (
    <div className="review-stars">
      {[1,2,3,4,5].map(s => <span key={s}>{s <= rating ? '★' : '☆'}</span>)}
    </div>
  );
}

function ReviewCard({ r, index }) {
  return (
    <div className="review-card" style={{ flexShrink: 0, minWidth: 300, maxWidth: 340 }}>
      <StarRating rating={r.rating} />
      <p className="review-comment">"{r.comment}"</p>
      <div className="review-author">
        <div className="review-avatar">{r.name[0]}</div>
        <div>
          <div className="review-author-name">{r.name}</div>
          <div className="review-author-date">
            {r.createdAt
              ? new Date(r.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
              : r.date
              ? new Date(r.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
              : 'Recent'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([...STATIC_REVIEWS]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Load approved reviews from backend on mount
  useEffect(() => {
    api.getReviews()
      .then(res => {
        if (res.success && res.reviews.length > 0) {
          // Merge backend reviews with static ones, show backend first
          setReviews([...res.reviews, ...STATIC_REVIEWS]);
        }
      })
      .catch(() => {}); // silently fail – static reviews still show
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      toast.error('Please fill in name and review');
      return;
    }
    setLoading(true);
    try {
      const res = await api.submitReview(form);
      if (res.success) {
        // Instantly add to UI without waiting for approval
        const newReview = {
          name: form.name,
          rating: form.rating,
          comment: form.comment,
          createdAt: new Date().toISOString(),
          isApproved: true, // show immediately
        };
        setReviews(prev => [newReview, ...prev]);
        toast.success('Thank you! Your review is now live 🎉');
        setForm({ name: '', rating: 5, comment: '' });
        setShowForm(false);
      } else {
        // Still add locally even if server says pending approval
        const newReview = {
          name: form.name,
          rating: form.rating,
          comment: form.comment,
          createdAt: new Date().toISOString(),
        };
        setReviews(prev => [newReview, ...prev]);
        toast.success('Thank you for your review! 🎉');
        setForm({ name: '', rating: 5, comment: '' });
        setShowForm(false);
      }
    } catch {
      // Add locally even on error
      const newReview = {
        name: form.name,
        rating: form.rating,
        comment: form.comment,
        createdAt: new Date().toISOString(),
      };
      setReviews(prev => [newReview, ...prev]);
      toast.success('Thank you for your review! 🎉');
      setForm({ name: '', rating: 5, comment: '' });
      setShowForm(false);
    }
    setLoading(false);
  };

  // Double array for infinite scroll
  const doubled = [...reviews, ...reviews];

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Customer Reviews</div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-desc">Real experiences from our valued customers</p>
          <div className="section-divider" />
        </div>

        <div
          className="reviews-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ overflow: 'hidden' }}
        >
          <div
            ref={trackRef}
            className="reviews-track"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {doubled.map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} r={r} index={i} />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            className="btn-primary"
            style={{ border: 'none' }}
            onClick={() => setShowForm(o => !o)}
          >
            {showForm ? '✕ Close' : '✍️ Write a Review'}
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: 500, margin: '2rem auto 0',
              background: 'white', borderRadius: 'var(--radius)',
              padding: '2rem', boxShadow: 'var(--shadow)'
            }}
          >
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Share Your Experience</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating *</label>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '2rem', cursor: 'pointer', marginTop: '0.3rem' }}>
                  {[1,2,3,4,5].map(s => (
                    <span
                      key={s}
                      onClick={() => setForm(f => ({ ...f, rating: s }))}
                      style={{ color: s <= form.rating ? 'var(--secondary)' : '#ddd', transition: 'color 0.2s' }}
                    >★</span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  value={form.comment}
                  onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="submit-order-btn" disabled={loading}>
                {loading ? '⏳ Submitting...' : '📤 Post Review'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
