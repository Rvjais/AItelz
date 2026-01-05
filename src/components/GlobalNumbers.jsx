import { motion } from 'framer-motion';
import './GlobalNumbers.css';

const GlobalNumbers = () => {
  const regions = [
    { name: 'United States' },
    { name: 'UK & Europe' },
    { name: 'South' },
    { name: 'Middle East & Africa' }
  ];

  const pricing = {
    monthlyRental: '$1 - $10',
    inbound: '$0.005 - $0.01',
    outbound: '$0.01 - $0.025'
  };

  return (
    <section className="global-numbers">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Global Number Costs
        </motion.h2>

        <div className="regions-grid">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              className="region-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3>{region.name}</h3>
              <div className="pricing-details">
                <div className="pricing-row">
                  <span className="pricing-label">Monthly Rental:</span>
                  <span className="pricing-value">{pricing.monthlyRental}</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Inbound:</span>
                  <span className="pricing-value">{pricing.inbound}</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Outbound:</span>
                  <span className="pricing-value">{pricing.outbound}</span>
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

export default GlobalNumbers;

