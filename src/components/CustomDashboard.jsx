import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomDashboard.css';
import dashboardImg from '../assets/DashBoard.png';
import expensesImg from '../assets/Expenses.png';
import historyImg from '../assets/History.png';
import loginImg from '../assets/login.png';
import paymentImg from '../assets/payment.png';

const CustomDashboard = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const images = [
    { src: dashboardImg, alt: 'Dashboard Analytics' },
    { src: expensesImg, alt: 'Expenses View' },
    { src: historyImg, alt: 'Call History' },
    { src: paymentImg, alt: 'Billing & Payments' },
    { src: loginImg, alt: 'Secure Login' }
  ];

  const openImage = (index) => setSelectedImageIndex(index);
  const closeImage = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    if (selectedImageIndex !== null) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Gallery Scroll Logic
  const scrollContainerRef = useRef(null);

  const scrollGallery = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" />
        </svg>
      ),
      text: 'Real-time data analytics'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" fill="currentColor" />
        </svg>
      ),
      text: 'Head-to-head agent-AI testing'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor" />
        </svg>
      ),
      text: 'Granular multi-level user access'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" />
        </svg>
      ),
      text: 'Custom CRM and billing logic'
    }
  ];

  const features = [
    'Business Analyst',
    'Custom CRM Integration',
    'Full-time support',
    'Dedicated PM'
  ];

  return (
    <section className="custom-dashboard">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-with-tag">
            <h2 className="section-title">Custom Dashboard & BI</h2>
            <span className="optional-tag">OPTIONAL</span>
          </div>
          <p className="section-description">
            For large enterprises, a custom-built dashboard provides an unparalleled compliance and transparency.
          </p>
        </motion.div>

        <div className="dashboard-content">
          <motion.div
            className="when-to-choose"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>When to choose this?</h3>
            <p>
              Enterprises with 2+ million calls per month, heavy compliance, or a custom CRM integration usually opt for this.
            </p>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="benefit-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="benefit-icon">{benefit.icon}</div>
                  <span>{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="pricing-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Pricing:</h3>
            <div className="pricing-items">
              <div className="pricing-item">
                <span className="pricing-label">Custom Dashboard Setup:</span>
                <span className="pricing-value">₹1,50,000</span>
                <span className="pricing-note">(one-time)</span>
              </div>
              <div className="pricing-item">
                <span className="pricing-label">Monthly Maintenance:</span>
                <span className="pricing-value">₹30,000</span>
                <span className="pricing-note">(per month)</span>
              </div>
            </div>
            <div className="features-list">
              <h4>Included:</h4>
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>


        <motion.div
          className="dashboard-gallery"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <button className="gallery-scroll-btn left" onClick={() => scrollGallery('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="gallery-track" ref={scrollContainerRef}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                onClick={() => openImage(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>

          <button className="gallery-scroll-btn right" onClick={() => scrollGallery('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="lightbox-image"
              />

              <button className="lightbox-nav prev" onClick={prevImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="lightbox-nav next" onClick={nextImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <button className="lightbox-close" onClick={closeImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CustomDashboard;

