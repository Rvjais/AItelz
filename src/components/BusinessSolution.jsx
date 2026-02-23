import { motion } from 'framer-motion';
import './BusinessSolution.css';
// Reusing local videos according to user
import campaignVideo from '../assets/campaign.mp4';
import leadsVideo from '../assets/leads.mp4';
import automationVideo from '../assets/automation.mp4';

const BusinessSolution = () => {
    return (
        <section className="business-solution" id="business-solution">
            <div className="section-container">

                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Everything You Need for AI Calling Success</h2>
                    <p className="section-subtitle">
                        Complete AI calling platform with advanced voice technology, customer management, and business automation
                    </p>
                </motion.div>

                <div className="features-list">
                    {/* Feature 1 */}
                    <motion.div
                        className="feature-row"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="feature-content">
                            <div className="feature-header">
                                <div className="feature-icon bg-gradient-blue">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <h3>AI Calling Platform</h3>
                            </div>
                            <p className="feature-desc">Complete AI-powered calling solution with advanced voice technology integration for automated customer interactions</p>
                            <ul className="feature-bullets">
                                <li>
                                    <div className="bullet-icon bg-gradient-blue">
                                        <span>✓</span>
                                    </div>
                                    <span>Advanced AI powered calls</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-blue">
                                        <span>✓</span>
                                    </div>
                                    <span>Intelligent call routing and management</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-blue">
                                        <span>✓</span>
                                    </div>
                                    <span>Real-time conversation analytics</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-blue">
                                        <span>✓</span>
                                    </div>
                                    <span>Automated follow-up sequences</span>
                                </li>
                            </ul>
                        </div>
                        <div className="feature-visual">
                            <div className="video-wrapper">
                                <video className="feature-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center">
                                    <source src={campaignVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-overlay bg-gradient-blue-overlay"></div>
                            </div>
                            <motion.div
                                className="floating-icon bg-gradient-blue"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Feature 2 (Reversed logic using CSS) */}
                    <motion.div
                        className="feature-row row-reverse"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="feature-content">
                            <div className="feature-header">
                                <div className="feature-icon bg-gradient-black">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                                <h3>Customer Management</h3>
                            </div>
                            <p className="feature-desc">Comprehensive customer relationship management with AI-driven insights and automated workflows</p>
                            <ul className="feature-bullets">
                                <li>
                                    <div className="bullet-icon bg-gradient-black">
                                        <span>✓</span>
                                    </div>
                                    <span>Centralized customer database</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-black">
                                        <span>✓</span>
                                    </div>
                                    <span>Automated lead qualification</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-black">
                                        <span>✓</span>
                                    </div>
                                    <span>Customer journey tracking</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-black">
                                        <span>✓</span>
                                    </div>
                                    <span>Personalized interaction history</span>
                                </li>
                            </ul>
                        </div>
                        <div className="feature-visual">
                            <div className="video-wrapper">
                                <video className="feature-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center">
                                    <source src={leadsVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-overlay bg-gradient-black-overlay"></div>
                            </div>
                            <motion.div
                                className="floating-icon bg-gradient-black"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="feature-row"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="feature-content">
                            <div className="feature-header">
                                <div className="feature-icon bg-gradient-mix">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                </div>
                                <h3>Business Automation</h3>
                            </div>
                            <p className="feature-desc">Streamline your business processes with intelligent automation and seamless integrations</p>
                            <ul className="feature-bullets">
                                <li>
                                    <div className="bullet-icon bg-gradient-mix">
                                        <span>✓</span>
                                    </div>
                                    <span>CRM integrations (Zoho, HubSpot, Salesforce)</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-mix">
                                        <span>✓</span>
                                    </div>
                                    <span>Automated appointment scheduling</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-mix">
                                        <span>✓</span>
                                    </div>
                                    <span>Custom workflow builder</span>
                                </li>
                                <li>
                                    <div className="bullet-icon bg-gradient-mix">
                                        <span>✓</span>
                                    </div>
                                    <span>API integrations and webhooks</span>
                                </li>
                            </ul>
                        </div>
                        <div className="feature-visual">
                            <div className="video-wrapper">
                                <video className="feature-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center">
                                    <source src={automationVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-overlay bg-gradient-mix-overlay"></div>
                            </div>
                            <motion.div
                                className="floating-icon bg-gradient-mix"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Value Props Grid */}
                <motion.div
                    className="value-props-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="section-subtitle-focused">Complete Business Solution</h3>
                    <div className="props-grid">
                        {[
                            { title: "Cost Effective", desc: "Reduce operational costs by up to 70%", icon: <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>, strokeExtra: <line x1="12" y1="1" x2="12" y2="23"></line>, gradientClass: "bg-gradient-blue" },
                            { title: "Easy Billing", desc: "Transparent pricing with flexible plans", icon: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></>, gradientClass: "bg-gradient-black" },
                            { title: "Voice Cloning", desc: "Create custom AI voices for your brand", icon: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></>, gradientClass: "bg-gradient-mix" },
                            { title: "Lead Generation", desc: "AI-powered prospect identification", icon: <><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></>, gradientClass: "bg-gradient-black" },
                            { title: "Analytics Dashboard", desc: "Comprehensive reporting and insights", icon: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>, gradientClass: "bg-gradient-blue" },
                            { title: "Enterprise Security", desc: "Bank-grade security and compliance", icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>, gradientClass: "bg-gradient-mix" },
                        ].map((prop, index) => (
                            <motion.div
                                className="prop-card glass-card-enhanced"
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className={`prop-icon ${prop.gradientClass}`}>
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                        {prop.strokeExtra}
                                        {prop.icon}
                                    </svg>
                                </div>
                                <h4>{prop.title}</h4>
                                <p>{prop.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Box */}
                <motion.div
                    className="cta-box glass-card-enhanced"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3>Transform Your Business Operations 🚀</h3>
                    <p>Join hundreds of businesses already using AItelZ to automate their calling processes and boost productivity.</p>

                    <div className="stats-grid">
                        <div className="stat-item glass-card-enhanced"><span>70% Cost Reduction</span></div>
                        <div className="stat-item glass-card-enhanced"><span>24/7 Availability</span></div>
                        <div className="stat-item glass-card-enhanced"><span>5x Faster Response</span></div>
                        <div className="stat-item glass-card-enhanced"><span>Unlimited Scale</span></div>
                    </div>

                    <motion.button
                        className="cta-action-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open("https://wa.me/919648165493?text=Hello%20AItelz%20im%20intrested%20i%20the%20voice%20chatbot", "_blank")}
                    >
                        Start Your Free Trial
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default BusinessSolution;
