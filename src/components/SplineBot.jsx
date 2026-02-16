import Spline from '@splinetool/react-spline';
import VoiceCarousel from './VoiceCarousel';
import { useState, useEffect } from 'react';
import './SplineBot.css';

// Typewriter component
function Typewriter({ text, delay = 50, startDelay = 0 }) {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(startTimer);
    }, [startDelay]);

    useEffect(() => {
        if (!started) return;

        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, delay);

        return () => clearInterval(timer);
    }, [text, delay, started]);

    return <span>{displayText}<span className="cursor">|</span></span>;
}

export default function SplineBot() {
    const [sceneUrl, setSceneUrl] = useState('/desktop.splinecode');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setSceneUrl('/mobile.splinecode');
            } else {
                setSceneUrl('/desktop.splinecode');
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="spline-wrapper">
            <Spline scene={sceneUrl} />

            {/* Desktop: Top left info */}
            <div className="info-box top-left">
                <h3><Typewriter text="Smart Conversations" delay={40} startDelay={300} /></h3>
                <p><Typewriter text="Natural language AI that understands context and intent." delay={25} startDelay={1200} /></p>
            </div>

            {/* Desktop: Top right info */}
            <div className="info-box top-right">
                <h3><Typewriter text="Enterprise Ready" delay={40} startDelay={600} /></h3>
                <p><Typewriter text="Secure, scalable, and compliant with industry standards." delay={25} startDelay={1600} /></p>
            </div>

            {/* Desktop: Bottom left info - REMOVED as per user request */}
            <div className="info-box bottom-left">
            </div>

            {/* Desktop: Bottom right info */}
            <div className="info-box bottom-right">
                <VoiceCarousel />
            </div>


        </div>
    );
}
