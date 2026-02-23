import { motion } from 'framer-motion';
import './BusinessUseCases.css';

const BusinessUseCases = () => {
    const cases = [
        {
            icon: "🎯",
            title: "Lead Generation",
            desc: "AI-powered prospect qualification",
            metric: "5x more qualified leads"
        },
        {
            icon: "🎧",
            title: "Customer Support",
            desc: "24/7 automated customer service",
            metric: "70% cost reduction"
        },
        {
            icon: "📅",
            title: "Appointment Booking",
            desc: "Automated scheduling system",
            metric: "90% booking accuracy"
        },
        {
            icon: "💼",
            title: "Sales Automation",
            desc: "Automated sales calls and follow-ups",
            metric: "300% conversion boost"
        }
    ];

    return (
        <section className="business-use-cases" id="use-cases">
            <div className="section-container">
                <motion.div
                    className="use-cases-box shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="use-cases-title">Perfect for Every Business Use Case</h3>

                    <div className="use-cases-grid">
                        {cases.map((useCase, index) => (
                            <motion.div
                                className="use-case-card"
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="use-case-icon">{useCase.icon}</div>
                                <h4>{useCase.title}</h4>
                                <p>{useCase.desc}</p>
                                <div className="use-case-metric">
                                    <span>{useCase.metric}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="use-cases-footer">
                        <p>
                            <span>Custom solutions available for enterprise clients.</span> Contact us for business partnerships.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BusinessUseCases;
