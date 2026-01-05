import { motion } from 'framer-motion';
import './HowToGetStarted.css';

const HowToGetStarted = () => {
  const steps = [
    {
      number: '1',
      title: 'Share Basic Details',
      description: 'Tell us your industry and target country so we can provision the correct onboarding and compliance.'
    },
    {
      number: '2',
      title: 'Send Knowledge Base',
      description: 'Fill in your voice for script, and up to 25 FAQ pairs. We can help you draft these if you don\'t have them ready.'
    },
    {
      number: '3',
      title: 'Define Logic Flow',
      description: 'Outline your business logic, qualification or sales, and escalation path for complex queries.'
    },
    {
      number: '4',
      title: 'Go Live in 48 Hours',
      description: 'We configure the agent, train it on your data, and hand over the number so you\'re live and active.'
    }
  ];

  return (
    <section className="how-to-get-started" id="get-started">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">How to Get Started</h2>
          <p className="section-subtitle">
            Our simple 4-step process to go live with a human-like agent.
          </p>
        </motion.div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="step-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring" }}
              >
                {step.number}
              </motion.div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && (
                <motion.div
                  className="step-connector"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToGetStarted;

