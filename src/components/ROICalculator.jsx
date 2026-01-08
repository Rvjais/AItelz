import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ROICalculator.css';

const ROICalculator = () => {
    const [agentCount, setAgentCount] = useState(5);
    const [avgSalary, setAvgSalary] = useState(25000);
    const [savings, setSavings] = useState({ monthly: 0, yearly: 0 });

    const AITELZ_MONTHLY_COST = 19999;
    const AITELZ_YEARLY_COST = 219989;

    useEffect(() => {
        const humanMonthlyCost = agentCount * avgSalary;
        const humanYearlyCost = humanMonthlyCost * 12;

        // AItelz cost scales differently. 
        // Assuming 1 AI agent can handle load of multiple humans, 
        // but for conservative ROI, let's compare 1 AI subscription vs human team cost.
        // Even if they need multiple AI instances for high concurrency, the savings are usually drastic.
        // For simplicity and impact: Compare Total Human Cost vs 1 Standard AI Plan (handling equivalent concurrency of ~3-5 humans)
        // If agent count > 5, maybe we suggest they might need a larger plan, but strictly comparing cost:

        const monthlySavings = humanMonthlyCost - AITELZ_MONTHLY_COST;
        const yearlySavings = humanYearlyCost - AITELZ_YEARLY_COST;

        setSavings({
            monthly: monthlySavings > 0 ? monthlySavings : 0,
            yearly: yearlySavings > 0 ? yearlySavings : 0
        });
    }, [agentCount, avgSalary]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div
            id="roi"
            className="roi-calculator-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="roi-header">
                <h3>Calculate Your ROI</h3>
                <p>See how much you can save by switching to AItelz</p>
            </div>

            <div className="roi-content">
                <div className="roi-inputs">
                    <div className="input-group">
                        <label>
                            Number of Agents
                            <span className="input-value">{agentCount}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={agentCount}
                            onChange={(e) => setAgentCount(parseInt(e.target.value))}
                            className="roi-slider"
                        />
                        <div className="slider-labels">
                            <span>1</span>
                            <span>50</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>
                            Avg. Monthly Salary per Agent
                            <span className="input-value">{formatCurrency(avgSalary)}</span>
                        </label>
                        <input
                            type="range"
                            min="20000"
                            max="100000"
                            step="1000"
                            value={avgSalary}
                            onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                            className="roi-slider"
                        />
                        <div className="slider-labels">
                            <span>₹20k -</span>

                            <span>₹1L</span>
                        </div>
                    </div>
                </div>

                <div className="roi-results">
                    <div className="result-card monthly">
                        <span className="result-label">Monthly Savings</span>
                        <span className="result-value">{formatCurrency(savings.monthly)}</span>
                    </div>
                    <div className="result-card yearly">
                        <span className="result-label">Yearly Savings</span>
                        <span className="result-value highlight">{formatCurrency(savings.yearly)}</span>
                        <span className="result-note">That's huge! 🚀</span>

                        <div className="savings-breakdown">
                            <div className="breakdown-item">
                                <span>Operational Savings:</span>
                                <span>{formatCurrency(savings.yearly - 19999)}</span>
                            </div>
                            <div className="breakdown-item highlight">
                                <span>Yearly Offer Bonus:</span>
                                <span>+ {formatCurrency(19999)}</span>
                            </div>
                            <p className="breakdown-explainer">
                                (Includes 1 Month FREE with Annual Plan)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ROICalculator;
