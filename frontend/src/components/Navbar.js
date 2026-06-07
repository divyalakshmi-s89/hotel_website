import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ onCartClick }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#snacks', label: 'Snacks' },
    { href: '#festival', label: 'Festival' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-icon">🍛</span>
          <div className="nav-logo-text">
            <h2>Jeya Hotel</h2>
            <span>Authentic Home Style Food</span>
          </div>
        </a>

        <div className="nav-links">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <button className="nav-cart-btn" onClick={onCartClick}>
            <FiShoppingCart />
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }} className="mobile-right">
          <button className="nav-cart-btn" onClick={onCartClick} style={{ display: 'flex' }}>
            <FiShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <><span/><span style={{opacity:0}}/><span/></> : <><span/><span/><span/></>}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
