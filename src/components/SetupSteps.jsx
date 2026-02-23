import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SetupSteps.css';

const SetupSteps = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const steps = [
        {
            id: 1,
            time: "2 minutes",
            title: "Step 1: Create Your Account",
            desc: "Sign up and get instant access to your AI calling dashboard",
            icon: <polyline points="20 6 9 17 4 12"></polyline>,
            detailsIcon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
            gradient: "from-gray-600 to-gray-700",
            bullets: [
                "Create your business account with company details",
                "Choose your subscription plan",
                "Access your personalized dashboard immediately",
                "Start with our comprehensive onboarding guide"
            ]
        },
        {
            id: 2,
            time: "10 minutes",
            title: "Step 2: Setup Phone Numbers",
            desc: "Configure your business phone numbers and call routing",
            icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
            gradient: "from-black to-gray-800",
            bullets: [
                "Choose local or toll-free numbers",
                "Configure call forwarding and routing rules",
                "Set up voicemail and call recording",
                "Test your phone system integration"
            ]
        },
        {
            id: 3,
            time: "15 minutes",
            title: "Step 3: Configure AI Agents",
            desc: "Set up your AI calling agents with custom scripts and workflows",
            icon: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>,
            image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&h=400&fit=crop&crop=center",
            gradient: "from-gray-800 to-black",
            bullets: [
                "Create AI agents with custom personalities",
                "Upload your business scripts and knowledge base",
                "Configure voice AI settings",
                "Set up CRM integrations and data sync"
            ]
        },
        {
            id: 4,
            time: "5 minutes",
            title: "Step 4: Import Your Contacts",
            desc: "Upload your customer database and organize calling campaigns",
            icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>,
            image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&crop=center",
            gradient: "from-gray-700 to-gray-800",
            bullets: [
                "Import contacts from CSV or CRM systems",
                "Organize contacts into calling lists",
                "Set up automated calling sequences",
                "Configure lead scoring and prioritization"
            ]
        },
        {
            id: 5,
            time: "5 minutes",
            title: "Step 5: Launch Your Campaigns",
            desc: "Go live with your AI calling campaigns and start automating",
            icon: <polygon points="5 3 19 12 5 21 5 3"></polygon>,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
            gradient: "from-black to-gray-700",
            bullets: [
                "Test your AI agents with sample calls",
                "Launch your first calling campaign",
                "Monitor real-time performance metrics",
                "Optimize based on analytics and results"
            ]
        }
    ];

    const currentStep = steps[activeStep - 1];

    return (
        <section id="setup-steps" className="ss-section">
            <div className="ss-container">
                {/* Header */}
                <motion.div
                    className="ss-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="ss-title">Get Started with AI Calling in 5 Simple Steps</h2>
                    <p className="ss-subtitle">
                        From signup to your first automated call - complete setup in under 40 minutes
                    </p>
                    <div className="ss-time-indicator">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Total Setup Time: ~37 minutes</span>
                    </div>
                </motion.div>

                {/* Desktop Layout */}
                {!isMobile ? (
                    <div className="ss-desktop-layout">
                        {/* Left: Steps List */}
                        <div className="ss-steps-list">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    className={`ss-step-card ${activeStep === step.id ? 'ss-active' : ''}`}
                                    onClick={() => setActiveStep(step.id)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <div className="ss-step-card-inner">
                                        <div className={`ss-step-icon ${activeStep === step.id ? 'ss-icon-active' : 'ss-icon-inactive'}`}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {step.icon}
                                            </svg>
                                        </div>
                                        <div className="ss-step-text">
                                            <div className="ss-step-title-row">
                                                <h3>{step.title}</h3>
                                                <span className="ss-step-time">{step.time}</span>
                                            </div>
                                            <p>{step.desc}</p>
                                        </div>
                                        <div className="ss-step-arrow">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Right: Detail Panel */}
                        <div className="ss-detail-panel">
                            <motion.div
                                className="ss-detail-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="ss-detail-image">
                                    <img src={currentStep.image} alt={currentStep.title.split(': ')[1]} />
                                    <div className="ss-detail-image-overlay"></div>
                                </div>
                                <div className="ss-detail-content">
                                    <div className="ss-detail-header">
                                        <div className="ss-detail-icon">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {currentStep.detailsIcon || currentStep.icon}
                                            </svg>
                                        </div>
                                        <div>
                                            <h3>{currentStep.title.split(': ')[1]}</h3>
                                            <p>{currentStep.desc}</p>
                                        </div>
                                    </div>

                                    <ul className="ss-detail-bullets">
                                        {currentStep.bullets.map((bullet, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            >
                                                <div className="ss-bullet-check">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span>{bullet}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="ss-detail-footer">
                                        <span className="ss-detail-time">Estimated time: {currentStep.time}</span>
                                        <button
                                            className="ss-detail-btn"
                                            onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}
                                        >
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    /* Mobile Layout */
                    <div className="ss-mobile-wrapper">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className="ss-mobile-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="ss-mobile-image">
                                    <img src={step.image} alt={step.title.split(': ')[1]} />
                                    <div className="ss-mobile-image-overlay"></div>
                                    <div className="ss-mobile-number">
                                        <span>{step.id}</span>
                                    </div>
                                    <div className="ss-mobile-time-badge">
                                        <span>{step.time}</span>
                                    </div>
                                </div>
                                <div className="ss-mobile-content">
                                    <div className="ss-mobile-header">
                                        <div className="ss-mobile-icon">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {step.detailsIcon || step.icon}
                                            </svg>
                                        </div>
                                        <div className="ss-mobile-title">
                                            <h3>{step.title.split(': ')[1]}</h3>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                    <ul className="ss-mobile-bullets">
                                        {step.bullets.map((bullet, idx) => (
                                            <li key={idx}>
                                                <div className="ss-mobile-check">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="ss-mobile-btn"
                                        onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}
                                    >
                                        <span>Start Step {step.id}</span>
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    className="ss-cta-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="ss-cta-banner">
                        <h3>Ready to Automate Your Business Calls?</h3>
                        <p>Join hundreds of businesses already using AItelZ to automate their calling processes and boost productivity!</p>
                        <button
                            className="ss-cta-btn"
                            onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}
                        >
                            <span>Start Free Trial</span>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SetupSteps;
