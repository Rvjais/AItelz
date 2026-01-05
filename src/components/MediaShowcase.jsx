import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import videoSource from '../assets/Robot_Phone_Call_Video_Generation.mp4';
import './MediaShowcase.css';

const MediaShowcase = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to scale: starts at 0.5 (50% width visual) and scales up to 1 (full width)
    // We want the zoom to happen as the element comes into view and centers
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

    // Optional: fade opacity in slightly as well
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

    // Radius change for extra polish
    const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["32px", "0px"]);

    return (
        <section className="media-showcase" ref={containerRef}>
            <motion.div
                className="media-container"
                style={{ scale, opacity, borderRadius }}
            >
                <video
                    className="showcase-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="media-overlay">
                    <h2>Experience the Difference</h2>
                    <p>See how our AI handles calls compared to traditional methods</p>
                </div>
            </motion.div>
        </section>
    );
};

export default MediaShowcase;
