import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/aitelz_transparent.png';

import './Header.css';

const Header = ({ onNavigateToCursor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Add a slight offset for the fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="header"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{ gap: '0' }}
        >
          <img src={logoImg} alt="AItelz Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="nav desktop-nav">
          <motion.a href="#flow" onClick={(e) => handleScroll(e, 'flow')} className="nav-link" whileHover={{ scale: 1.05 }}>Flow</motion.a>
          <motion.a href="#business-solution" onClick={(e) => handleScroll(e, 'business-solution')} className="nav-link" whileHover={{ scale: 1.05 }}>Solutions</motion.a>
          <motion.a href="#setup-steps" onClick={(e) => handleScroll(e, 'setup-steps')} className="nav-link" whileHover={{ scale: 1.05 }}>Setup</motion.a>
          <motion.a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')} className="nav-link" whileHover={{ scale: 1.05 }}>Pricing</motion.a>
          <motion.a href="#roi" onClick={(e) => handleScroll(e, 'roi')} className="nav-link" whileHover={{ scale: 1.05 }}>ROI Calculator</motion.a>
          <motion.button
            className="demo-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
              Book a Demo
            </a>
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#flow" onClick={(e) => handleScroll(e, 'flow')}>Flow</a>
            <a href="#business-solution" onClick={(e) => handleScroll(e, 'business-solution')}>Solutions</a>
            <a href="#setup-steps" onClick={(e) => handleScroll(e, 'setup-steps')}>Setup</a>
            <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')}>Pricing</a>
            <a href="#roi" onClick={(e) => handleScroll(e, 'roi')}>ROI Calculator</a>
            <button className="demo-button" >
              <a href="https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
                Book a Demo
              </a>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

