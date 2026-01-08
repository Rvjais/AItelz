import { useState } from 'react';
import { motion } from 'framer-motion';
// import cardBgVideo from '../assets/cardbg.mp4'; // Removed in favor of GSAP card
import PricingCard from './PricingCard';
import './Pricing.css';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Small',
      monthlyPrice: 19999,
      minutes: '2,000',
      concurrentCalls: '10',
      borderColor: '#3B82F6'
    },
    {
      name: 'Medium',
      monthlyPrice: 69999,
      minutes: '10,000',
      concurrentCalls: '20',
      borderColor: '#A855F7',
      popular: true
    },
    {
      name: 'Large',
      monthlyPrice: 199999,
      minutes: '35,000',
      concurrentCalls: '50',
      borderColor: '#F97316'
    }
  ];

  const allPlansInclude = [
    'Transcripts & Recordings',
    'Usage Reports',
    '24/7 Support',
    'Calendar Integration',
    'Custom Voice Training'
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="pricing" id="pricing">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">Choose the plan that fits your business scale.</p>
        </motion.div>

        <motion.div
          className="pricing-toggle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={!isAnnual ? 'active' : ''}>Monthly</span>
          <button
            className={`toggle-switch ${isAnnual ? 'annual' : ''}`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <span className="toggle-slider"></span>
          </button>
          <span className={isAnnual ? 'active' : ''}>Annually</span>
        </motion.div>

        <div className="pricing-grid">
          <motion.div
            className="pilot-card-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            style={{ height: '100%' }}
          >
            <PricingCard borderColor="#10b981" className="pilot-card-gsap">
              <h3>1-Week Live Pilot</h3>
              <div className="pilot-price">₹5,000 <span>+ taxes</span></div>
              <ul className="pilot-features">
                <li>Private Knowledge Base</li>
                <li>Train on Top 25 FAQs</li>
                <li>Overall testing (1 week)</li>
                <li>Full transcripts & call logs</li>
              </ul>
              <motion.button
                className="pilot-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Pilot Today
              </motion.button>
            </PricingCard>
          </motion.div>

          {plans.map((plan, index) => {
            const displayPrice = isAnnual ? plan.monthlyPrice * 11 : plan.monthlyPrice;
            const savings = plan.monthlyPrice; // Save 1 month cost

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{ height: '100%' }} // Ensure motion div takes height for card
              >
                <PricingCard borderColor={plan.borderColor} className={plan.popular ? 'popular' : ''}>
                  {plan.popular && (
                    <div className="popular-badge">MOST POPULAR</div>
                  )}
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    {formatPrice(displayPrice)}
                    <span className="price-period">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  {isAnnual && (
                    <div className="price-savings" style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '600' }}>
                      Save {formatPrice(savings)}
                    </div>
                  )}
                  <div className="plan-features">
                    <div className="feature-item">
                      <span className="feature-value">{plan.minutes}</span>
                      <span className="feature-label">minutes</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-value">{plan.concurrentCalls}</span>
                      <span className="feature-label">concurrent calls</span>
                    </div>
                  </div>
                  <motion.button
                    className={`select-plan-button ${plan.popular ? 'popular-button' : ''}`}
                    style={{ backgroundColor: plan.borderColor }}
                    whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${plan.borderColor}40` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Select Plan
                  </motion.button>
                </PricingCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="all-plans-include"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4>ALL PLANS INCLUDE</h4>
          <div className="includes-grid">
            {allPlansInclude.map((item, index) => (
              <div key={index} className="include-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#86EFAC" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
