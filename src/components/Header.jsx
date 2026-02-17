import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './Header.css';

const Header = ({ onNavigateToCursor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" fill="#000000" />
          </svg>
          <span>AITELZ</span>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="nav desktop-nav">
          <motion.a href="#demo" className="nav-link" whileHover={{ scale: 1.05 }}>Demo</motion.a>
          <motion.a href="#pricing" className="nav-link" whileHover={{ scale: 1.05 }}>Pricing</motion.a>
          <motion.a href="#roi" className="nav-link" whileHover={{ scale: 1.05 }}>ROI Calculator</motion.a>
          <motion.button
            className="demo-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo
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
            <a href="#demo" onClick={toggleMenu}>Demo</a>
            <a href="#pricing" onClick={toggleMenu}>Pricing</a>
            <a href="#roi" onClick={toggleMenu}>ROI Calculator</a>
            <button className="demo-button" ><a href="https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot" target="_blank">
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

