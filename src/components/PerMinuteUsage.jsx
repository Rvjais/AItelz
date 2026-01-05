import { motion } from 'framer-motion';
import './PerMinuteUsage.css';

const PerMinuteUsage = () => {
  const plans = [
    {
      name: 'Small Plan',
      price: '₹19,999',
      includedMinutes: '2,000',
      overageCost: '₹10,000',
      averageCost: '₹20,000',
      currency: 'INR',
      rate: '₹5.0'
    },
    {
      name: 'Medium Plan',
      price: '₹69,999',
      includedMinutes: '10,000',
      overageCost: '$750',
      averageCost: '$1,500',
      currency: 'USD',
      rate: '$0.075'
    },
    {
      name: 'Large Plan',
      price: '₹1,99,999',
      includedMinutes: '35,000',
      overageCost: '$2,625',
      averageCost: '$5,250',
      currency: 'USD',
      rate: '$0.075'
    }
  ];

  return (
    <section className="per-minute-usage">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Per-Minute Usage & Overage</h2>
        </motion.div>

        <motion.div
          className="flat-overage"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Flat Overage Rate</h3>
          <p>Applicable to all plans for 1.5x rate if beyond included minutes.</p>
          <div className="overage-rates">
            <div className="rate-item">
              <span className="rate-value">₹5.0</span>
              <span className="rate-label">INR per minute</span>
            </div>
            <div className="rate-item">
              <span className="rate-value">$0.075</span>
              <span className="rate-label">USD per minute</span>
            </div>
          </div>
        </motion.div>

        <div className="usage-plans">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="usage-plan-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h4>{plan.name} ({plan.price})</h4>
              <div className="usage-details">
                <div className="usage-item">
                  <span className="usage-label">Included Minutes:</span>
                  <span className="usage-value">{plan.includedMinutes}</span>
                </div>
                <div className="usage-item">
                  <span className="usage-label">Overage Cost ({plan.rate}):</span>
                  <span className="usage-value">{plan.overageCost}</span>
                </div>
                <div className="usage-item highlight">
                  <span className="usage-label">Average Cost ({plan.rate} + {plan.rate}):</span>
                  <span className="usage-value">{plan.averageCost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="pricing-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          All prices are exclusive of GST/VAT. To get custom pricing, please contact sales.
        </motion.p>
      </div>
    </section>
  );
};

export default PerMinuteUsage;

