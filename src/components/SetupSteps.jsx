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
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
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
            icon: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
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
            icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>,
            image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&h=400&fit=crop&crop=center",
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
            icon: <><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></>,
            image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=400&fit=crop&crop=center",
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
            bullets: [
                "Test your AI agents with sample calls",
                "Launch your first calling campaign",
                "Monitor real-time performance metrics",
                "Optimize based on analytics and results"
            ]
        }
    ];

    return (
        <section id="setup-steps" className="setup-steps bg-white">
            <div className="section-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-gray-900">Get Started with AI Calling in 5 Simple Steps</h2>
                    <p className="section-subtitle">
                        From signup to your first automated call - complete setup in under 40 minutes
                    </p>
                    <div className="time-indicator">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>Total Setup Time: ~37 minutes</span>
                    </div>
                </motion.div>

                {!isMobile ? (
                    <div className="steps-desktop-layout">
                        <div className="steps-list">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`step-card ${activeStep === step.id ? 'active' : ''}`}
                                    onClick={() => setActiveStep(step.id)}
                                >
                                    <div className="step-card-content">
                                        <div className={`step-icon ${activeStep === step.id ? 'bg-gradient-blue' : 'bg-gray-100'}`}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {step.icon}
                                            </svg>
                                        </div>
                                        <div className="step-text">
                                            <div className="step-header-mobile">
                                                <h3>{step.title}</h3>
                                                <span className="step-time">{step.time}</span>
                                            </div>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                    <div className={`step-arrow ${activeStep === step.id ? 'text-black' : 'text-gray-400'}`}>
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="step-details-panel">
                            <div className="details-card shadow-xl">
                                <div className="details-image-container">
                                    <img src={steps[activeStep - 1].image} alt={steps[activeStep - 1].title} />
                                    <div className="image-overlay bg-gradient-blue-overlay"></div>
                                </div>
                                <div className="details-content">
                                    <div className="details-header">
                                        <div className="details-icon bg-gradient-blue">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {steps[activeStep - 1].icon}
                                            </svg>
                                        </div>
                                        <div>
                                            <h3>{steps[activeStep - 1].title.split(': ')[1]}</h3>
                                            <p>{steps[activeStep - 1].desc}</p>
                                        </div>
                                    </div>

                                    <ul className="details-bullets">
                                        {steps[activeStep - 1].bullets.map((bullet, idx) => (
                                            <li key={idx}>
                                                <div className="bullet-icon bg-gradient-blue">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="details-footer">
                                        <span className="details-time">Estimated time: {steps[activeStep - 1].time}</span>
                                        <button className="details-btn bg-gradient-blue text-white hover:shadow-lg transition-all"
                                            onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}>
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="steps-mobile-wrapper">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className="mobile-step-card shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="mobile-image-container">
                                    <img src={step.image} alt={step.title} />
                                    <div className="image-overlay bg-gradient-mix-overlay"></div>
                                    <div className="mobile-step-number bg-gradient-blue">
                                        <span>{step.id}</span>
                                    </div>
                                    <div className="mobile-step-time">
                                        <span>{step.time}</span>
                                    </div>
                                </div>

                                <div className="mobile-step-content">
                                    <div className="mobile-step-header">
                                        <div className="mobile-icon bg-gradient-blue">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                {step.icon}
                                            </svg>
                                        </div>
                                        <div className="mobile-title">
                                            <h3>{step.title.split(': ')[1]}</h3>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>

                                    <ul className="mobile-bullets">
                                        {step.bullets.map((bullet, idx) => (
                                            <li key={idx}>
                                                <div className="bullet-icon bg-gradient-blue">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="mobile-start-btn bg-gradient-blue hover:shadow-lg"
                                        onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}>
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

                <motion.div
                    className="bottom-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="cta-banner">
                        <h3>Ready to Automate Your Business Calls?</h3>
                        <p>Join hundreds of businesses already using AItelZ to automate their calling processes and boost productivity!</p>
                        <button className="cta-btn" onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}>
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
