import { motion } from 'framer-motion';
import ROICalculator from './ROICalculator';
import './CostComparison.css';

const CostComparison = () => {
  const benefits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor" />
        </svg>
      ),
      title: '70% Cost Reduction',
      description: 'Save up to 70% on your operational costs.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor" />
        </svg>
      ),
      title: '24/7 Coverage',
      description: 'Provide round-the-clock service to your customers.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor" />
        </svg>
      ),
      title: 'Reduced Leadtime',
      description: 'Go live in 48 hours with minimal setup.'
    }
  ];

  return (
    <section className="cost-comparison" id="comparison">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Cost Comparison & ROI</h2>
          <p className="section-subtitle">Why businesses are switching from manual staffing to AI.</p>
        </motion.div>

        <div className="comparison-cards">
          <motion.div
            className="comparison-card traditional"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
              </svg>
            </div>
            <h3>Traditional Human Agent</h3>
            <div className="cost-label">Avg. Cost Per Month</div>
            <div className="cost-amount">
              <div>₹35k - ₹60k</div>
              <div className="cost-usd">$3,000 - $4,500+</div>
            </div>
            <div className="overhead-badge red">HIGH OVERHEADS</div>
            <ul className="disadvantages">
              <li>Coverage limited to 8-9 hours</li>
              <li>Initial heavy operational overheads</li>
              <li>Hiring & training overheads</li>
            </ul>
          </motion.div>

          <motion.div
            className="comparison-card aitelz"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor" />
              </svg>
            </div>
            <h3>AITELZ.com AI Agent</h3>
            <div className="cost-label">Avg. Cost Per Month</div>
            <div className="cost-amount">
              <div>₹19,999</div>
              <div className="cost-usd">$999</div>
            </div>
            <div className="overhead-badge green">LOW OVERHEADS</div>
            <ul className="advantages">
              <li>24/7 Coverage included</li>
              <li>Pay only for actual utilization - not idle time</li>
              <li>Instant scaling to campaigns</li>
            </ul>
          </motion.div>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator Section */}
        <ROICalculator />

      </div>
    </section>
  );
};

export default CostComparison;

