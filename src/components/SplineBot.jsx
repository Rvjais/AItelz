import Spline from '@splinetool/react-spline';
import VoiceCarousel from './VoiceCarousel';
import { initiateCall } from '../services/bolnaService';
import sceneFile from '../assets/scene.splinecode';
import { useState, useEffect, useRef } from 'react';
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
    // const [sceneUrl, setSceneUrl] = useState(() => window.innerWidth <= 768 ? '/mobile.splinecode' : '/desktop.splinecode');
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const videoRef = useRef(null);

    // Voice Agent State
    const [phoneNumber, setPhoneNumber] = useState('+91 ');
    const [callStatus, setCallStatus] = useState('idle'); // idle, loading, success, error
    const [statusMessage, setStatusMessage] = useState('');

    // Phone number formatting
    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const digits = input.replace(/\D/g, '');

        let cleanDigits = digits;
        // Ensure it starts with 91
        if (!cleanDigits.startsWith('91')) {
            cleanDigits = '91' + cleanDigits;
        }

        // Limit to 12 digits (91 + 10 digits)
        if (cleanDigits.length > 12) {
            cleanDigits = cleanDigits.slice(0, 12);
        }

        // Format as +91 XXXXX XXXXX
        let formatted = '+91';
        if (cleanDigits.length > 2) {
            formatted += ' ' + cleanDigits.slice(2, 7);
        }
        if (cleanDigits.length > 7) {
            formatted += ' ' + cleanDigits.slice(7, 12);
        }

        setPhoneNumber(formatted);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && videoRef.current.currentTime >= 15) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleCall = async () => {
        if (!phoneNumber) {
            setStatusMessage('Please enter a phone number.');
            return;
        }

        setCallStatus('loading');
        setStatusMessage('Initiating call...');

        try {
            await initiateCall(phoneNumber);
            setCallStatus('success');
            setStatusMessage('Call initiated successfully! You should receive a call shortly.');
            setPhoneNumber('');
        } catch (error) {
            setCallStatus('error');
            setStatusMessage(`Failed to initiate call: ${error.message}`);
        } finally {
            // Reset status after a few seconds
            setTimeout(() => {
                setCallStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="spline-wrapper">
            {isMobile ? (
                <video
                    ref={videoRef}
                    src="/splineMobile.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="mobile-video-bg"
                    onTimeUpdate={handleTimeUpdate}
                />
            ) : (
                <Spline scene={sceneFile} />
            )}

            {/* Desktop: Bottom Left - Voice Agent Input */}
            <div className="info-box bottom-left">
                <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#222' }}>
                    Enter your number to talk to our AI Voice Agent
                </p>
                <div className="voice-input-container">
                    <input
                        type="tel"
                        placeholder="+91 0000000000"
                        className="voice-agent-input"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={callStatus === 'loading'}
                    />
                    <button
                        className="voice-agent-btn"
                        onClick={handleCall}
                        disabled={callStatus === 'loading'}
                    >
                        {callStatus === 'loading' ? 'Calling...' : 'Talk'}
                    </button>
                </div>
                {statusMessage && (
                    <p style={{ fontSize: '0.9rem', color: callStatus === 'error' ? 'red' : 'green', marginTop: '8px', fontWeight: 500 }}>
                        {statusMessage}
                    </p>
                )}
            </div>

            {/* Desktop: Bottom right info */}
            <div className="info-box bottom-right">
                <VoiceCarousel />
            </div>
        </div>
    );
}
