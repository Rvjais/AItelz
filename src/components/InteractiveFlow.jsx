import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import flowPng from '../assets/flow.png';
import flowMp4 from '../assets/flow.mp4';
import botAnimation from '../assets/bottalk.mp4';
import './InteractiveFlow.css';

const InteractiveFlow = () => {
    const [isHovering, setIsHovering] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <section className="interactive-flow" id="flow">
            {/* Background Tapes */}
            <div className="tape-container tape-top">
                <div className="tape-scroll scroll-left">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="tape-content">
                            <div className="tape-item tape-caution">
                                Conversations that feel real.
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tape-container tape-bottom">
                <div className="tape-scroll scroll-right">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="tape-content">
                            <div className="tape-item tape-restricted">
                                Never miss another call
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section-container flow-layout">
                {/* Left Side: Animated Bot */}
                <motion.div
                    className="bot-animation-container"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <video
                        src={botAnimation}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="bot-video"
                    />
                </motion.div>

                {/* Right Side: Flow Interaction */}
                <div className="flow-content-wrapper">
                    <motion.div
                        className="flow-media-wrapper"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        animate={{
                            scale: isHovering ? 1.1 : 1
                        }}
                    >
                        <img
                            src={flowPng}
                            alt="Flow Diagram"
                            className={`flow-image ${isHovering ? 'hidden' : 'visible'}`}
                        />
                        <video
                            ref={videoRef}
                            src={flowMp4}
                            className={`flow-video ${isHovering ? 'visible' : 'hidden'}`}
                            muted
                            loop
                            playsInline
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveFlow;
