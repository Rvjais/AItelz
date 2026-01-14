import { useState, useRef, useEffect } from 'react';
import './VoiceCarousel.css';

// Import voice assets
import arushiVoice from '../assets/Voices/arushiVoice.aac';
import imranVoice from '../assets/Voices/imranVoice.aac';
import nehaVoice from '../assets/Voices/nehaVoice.aac';
import riyaVoice from '../assets/Voices/riyaVoice.aac';
import vikramVoice from '../assets/Voices/vikramVoice.aac';

const voices = [
    { id: 'arushi', name: 'Arushi', src: arushiVoice, gender: 'female' },
    { id: 'imran', name: 'Imran', src: imranVoice, gender: 'male' },
    { id: 'neha', name: 'Neha', src: nehaVoice, gender: 'female' },
    { id: 'riya', name: 'Riya', src: riyaVoice, gender: 'female' },
    { id: 'vikram', name: 'Vikram', src: vikramVoice, gender: 'male' },
];

export default function VoiceCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(voices[0].src));

    useEffect(() => {
        // Update audio source when active index changes
        audioRef.current.pause();
        audioRef.current = new Audio(voices[activeIndex].src);
        
        // Auto play when switching (optional, but good for "demo" feel)
        // For now, let's play only if it was already playing or user clicked
        if (isPlaying) {
             audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }

        // Cleanup
        return () => {
            audioRef.current.pause();
        };
    }, [activeIndex]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextVoice = () => {
        setActiveIndex((prev) => (prev + 1) % voices.length);
        setIsPlaying(true); // Auto play on switch
    };

    const prevVoice = () => {
        setActiveIndex((prev) => (prev - 1 + voices.length) % voices.length);
        setIsPlaying(true); // Auto play on switch
    };

    return (
        <div className="voice-carousel">
            <div className="carousel-header">
                <h3>Voice Demos</h3>
                <div className="carousel-controls">
                     <button onClick={prevVoice} className="nav-btn">‹</button>
                     <button onClick={nextVoice} className="nav-btn">›</button>
                </div>
            </div>
            
            <div className="carousel-track">
                {voices.map((voice, index) => {
                    // Calculate relative position for zoom effect
                    // 0 is active, -1 is left, 1 is right, etc.
                    let offset = index - activeIndex;
                    // Handle wrap-around logic for visual positioning if needed, 
                    // but simple map is easier for now. 
                    // Let's just highlight the active one.
                    
                    const isActive = index === activeIndex;
                    
                    return (
                        <div 
                            key={voice.id} 
                            className={`voice-card ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                setActiveIndex(index);
                                setIsPlaying(true);
                            }}
                        >
                            <div className="voice-visual">
                                {isActive && isPlaying ? (
                                    <div className="equalizer">
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                ) : (
                                    <div className="play-icon">▶</div>
                                )}
                            </div>
                            <span className="voice-name">{voice.name}</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="current-voice-status">
                <p>Listening to <strong>{voices[activeIndex].name}</strong></p>
            </div>
        </div>
    );
}
