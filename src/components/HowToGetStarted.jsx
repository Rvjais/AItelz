import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HowToGetStarted.css';

const HowToGetStarted = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the path length based on scroll
  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

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
    <section className="how-to-get-started" id="get-started" ref={containerRef}>
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

        <div className="steps-wrapper">
          {/* SVG Connector Line */}
          <div className="svg-container">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
              <motion.path
                d="M50,0 C50,100 20,100 20,200 C20,300 80,300 80,450 C80,600 20,600 20,750 C20,900 80,900 80,1000"
                className="connector-path-bg"
              />
              <motion.path
                d="M50,0 C50,100 20,100 20,200 C20,300 80,300 80,450 C80,600 20,600 20,750 C20,900 80,900 80,1000"
                className="connector-path-fill"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="steps-list">
            {steps.map((step, index) => (
              <div key={index} className={`step-row ${index % 2 === 0 ? 'left' : 'right'}`}>
                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="step-number">
                    {step.number}
                  </div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
                <div className="step-spacer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToGetStarted;

