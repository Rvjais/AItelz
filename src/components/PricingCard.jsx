import React, { useEffect, useRef, useId, useState } from 'react';
import gsap from 'gsap';
import './PricingCard.css';

const PricingCard = ({ children, borderColor = '#000', className = '' }) => {
    const cardRef = useRef(null);
    const cardId = useId().replace(/:/g, ''); // Ensure valid ID for SVG
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!cardRef.current) return;

        const ctx = gsap.context(() => {
            // Initial setup
            gsap.set(`.card-${cardId} .card-bg-rect`, {
                scale: 1,
                transformOrigin: '50% 50%'
            });

            // Entrance animation
            gsap.fromTo(cardRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                    rotationX: 10
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1,
                    ease: 'power3.out'
                }
            );

        }, cardRef);

        return () => ctx.revert();
    }, [cardId]);

    useEffect(() => {
        if (!cardRef.current) return;

        // Mouse movement interaction
        const moveCard = () => {
            if (!isHovering) {
                gsap.to(`.card-${cardId} .card-rotate-group`, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                gsap.to(`.card-${cardId} .fillLight`, { opacity: 0, duration: 0.5 });
                gsap.to(`.card-${cardId} .bg-pattern`, { x: 0, y: 0, duration: 0.5 });
                return;
            }

            const rotationX = (mousePosition.y - 0.5) * 10; // Max 5 deg tilt vertical
            const rotationY = (mousePosition.x - 0.5) * -10; // Max 5 deg tilt horizontal

            gsap.to(`.card-${cardId} .card-rotate-group`, {
                rotationY: rotationY,
                rotationX: rotationX,
                duration: 0.5,
                ease: 'power2.out'
            });

            const distFromCenter = Math.sqrt(Math.pow(mousePosition.x - 0.5, 2) + Math.pow(mousePosition.y - 0.5, 2)) * 2;

            gsap.to(`.card-${cardId} .fillLight`, {
                opacity: 0.2 + (distFromCenter * 0.5),
                duration: 0.1
            });

            gsap.to(`.card-${cardId} .bg-pattern`, {
                x: (0.5 - mousePosition.x) * 50,
                y: (0.5 - mousePosition.y) * 50,
                duration: 0.1
            });
        };

        moveCard();

    }, [mousePosition, isHovering, cardId]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
    };

    return (
        <div
            ref={cardRef}
            className={`pricing-card-gsap card-${cardId} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }} // Essential for 3D rotation
        >
            <div className="card-rotate-group" style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>

                {/* SVG Background Layer */}
                <div className="card-svg-layer">
                    <svg width="100%" height="100%" viewBox="0 0 340 540" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id={`grad1-${cardId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>

                            <linearGradient id={`grad2-${cardId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={borderColor} stopOpacity="0.8" />
                                <stop offset="100%" stopColor={borderColor} stopOpacity="0.2" />
                            </linearGradient>

                            <filter id={`noise-${cardId}`}>
                                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
                                <feComponentTransfer>
                                    <feFuncA type="table" tableValues="0 0.5" />
                                </feComponentTransfer>
                            </filter>

                            <mask id={`mask-${cardId}`}>
                                <rect fill="#fff" width="340" height="540" rx="20" ry="20" />
                            </mask>
                        </defs>

                        {/* Main Card Shape */}
                        <rect
                            className="card-bg-rect"
                            fill={`url(#grad1-${cardId})`}
                            width="340" height="540" rx="20" ry="20"
                        />

                        {/* Animated Orbs/Gradients */}
                        <circle className="bg-pattern" fill={`url(#grad2-${cardId})`} cx="50" cy="50" r="120" style={{ filter: 'blur(40px)', opacity: 0.6 }} />
                        <circle className="bg-pattern" fill={`url(#grad2-${cardId})`} cx="290" cy="490" r="100" style={{ filter: 'blur(40px)', opacity: 0.4 }} />

                        {/* Noise/Texture Overlay */}
                        <rect
                            width="100%" height="100%"
                            filter={`url(#noise-${cardId})`}
                            opacity="0.05"
                            style={{ mixBlendMode: 'overlay' }}
                            rx="20" ry="20"
                        />

                        {/* Lighting Glare */}
                        <rect
                            className="fillLight"
                            width="340" height="540" rx="20" ry="20"
                            fill="url(#grad2)" // Reusing grad2 generic if needed or create specific white gradient
                            style={{ fill: 'white', mixBlendMode: 'overlay', pointerEvents: 'none', opacity: 0 }}
                        />

                        {/* Border Stroke */}
                        <rect
                            fill="none"
                            stroke={borderColor}
                            strokeWidth="2"
                            strokeOpacity="0.3"
                            width="338" height="538" x="1" y="1" rx="20" ry="20"
                        />
                    </svg>
                </div>

                {/* Content Layer (Overlaid on top of SVG) */}
                <div className="card-content-layer">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
