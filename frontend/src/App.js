import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import SnacksSection from './components/SnacksSection';
import OrderSection from './components/OrderSection';
import FestivalSection from './components/FestivalSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AvailabilityBanner from './components/AvailabilityBanner';
import AdminPage from './pages/AdminPage';
import './index.css';

function Loader() {
  return (
    <div className="loader">
      <div className="loader-logo">🍛</div>
      <h2>Jeya Hotel</h2>
      <p>Authentic Home Style Food</p>
      <div className="loader-bar"><div className="loader-bar-inner" /></div>
    </div>
  );
}

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      {/* Availability banner sits just below navbar */}
      <AvailabilityBanner />
      {/* Extra padding so hero clears both navbar + banner */}
      <main style={{ paddingTop: '36px' }}>
        <Hero />
        <About />
        <MenuSection />
        <SnacksSection />
        <OrderSection scrollToOrder={scrollToOrder} />
        <FestivalSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={scrollToOrder} />

      {/* Floating WhatsApp */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/918946086668?text=Hi Jeya Hotel! I'd like to order food."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
      >
        💬
      </a>

      {/* Back to Top */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        ↑
      </button>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <CartProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#3E2723', color: 'white', borderRadius: 12 },
            success: { iconTheme: { primary: '#FFC107', secondary: '#3E2723' } },
            duration: 2500,
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
