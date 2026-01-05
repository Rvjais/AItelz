import { motion } from 'framer-motion';
import './IndiaVoIP.css';

const IndiaVoIP = () => {
  const plans = [
    {
      name: 'Local DID',
      price: '₹999',
      period: 'per month',
      rates: [
        { type: 'Local', range: '₹0.25 - ₹0.50' },
        { type: 'National', range: '₹0.50 - ₹1.00' },
        { type: 'Outbound', range: '₹1.00 - ₹2.00' }
      ]
    },
    {
      name: 'Toll-Free',
      price: '₹2,499',
      period: 'per month',
      rates: [
        { type: 'Inbound', range: '₹1.50 - ₹2.50' }
      ]
    }
  ];

  return (
    <section className="india-voip">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">India VoIP Number & Carrier Costs</h2>
          <p className="section-subtitle">Typical overages from popular providers. Rates are actuals (based on avg).</p>
        </motion.div>

        <div className="voip-plans">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="voip-plan-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="voip-header">
                <h3>{plan.name}</h3>
                <div className="voip-price">
                  <span className="price-value">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
              </div>
              <div className="voip-rates">
                {plan.rates.map((rate, rateIndex) => (
                  <div key={rateIndex} className="rate-row">
                    <span className="rate-type">Call & Applicable GST ({rate.type})</span>
                    <span className="rate-amount">per minute: {rate.range}</span>
                  </div>
                ))}
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

export default IndiaVoIP;

