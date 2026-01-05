import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import './Hero.css';

const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInputCall = () => {
    if (!phoneNumber) return;
    // TODO: Implement actual call logic
    console.log('Initiating call to:', phoneNumber);
  };

  const playSample = () => {
    setIsPlaying(!isPlaying);
    // Logic to play audio would go here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="hero">
      <ParticlesBackground />
      <div className="hero-shape-container">
        <div className="hero-floating-shape"></div>
      </div>
      <motion.div
        className="hero-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="live-demo-badge" variants={itemVariants}>
          <span className="pulse-dot"></span>
          Live Interactive Demo
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Replace your call center with <span className="gradient-text">AI Agents</span>
        </motion.h1>

        <motion.p className="hero-description" variants={itemVariants}>
          Use our pre-trained sales & support agents to handle your calls 24/7.
          Deployment takes less than 5 minutes.
        </motion.p>

        <motion.div className="input-group" variants={itemVariants}>
          <input
            type="tel"
            placeholder="+91 99999 99999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="demo-input"
          />
          <button className="call-demo-button" onClick={handleInputCall}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.5rem' }}>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
            </svg>
            Get Call
          </button>
        </motion.div>

        <motion.div className="hero-buttons" variants={itemVariants} style={{ marginTop: '2rem' }}>
          <button className="listen-samples-button" onClick={playSample}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '0.5rem' }}>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor" />
            </svg>
            {isPlaying ? 'Pause Samples' : 'Listen to Samples'}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

