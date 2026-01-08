import { useEffect } from 'react';

const AutoScrollHandler = () => {
    useEffect(() => {
        const threshold = 100; // px from edge
        const maxSpeed = 15; // max px per frame

        let animationFrameId;

        const handleMouseMove = (e) => {
            const { clientY } = e;
            const { innerHeight } = window;

            cancelAnimationFrame(animationFrameId);

            if (clientY < threshold) {
                // Scroll Up
                const intensity = (threshold - clientY) / threshold;
                const speed = intensity * maxSpeed;

                const scrollUp = () => {
                    window.scrollBy(0, -speed);
                    animationFrameId = requestAnimationFrame(scrollUp);
                };
                animationFrameId = requestAnimationFrame(scrollUp);

            } else if (clientY > innerHeight - threshold) {
                // Scroll Down
                const intensity = (clientY - (innerHeight - threshold)) / threshold;
                const speed = intensity * maxSpeed;

                const scrollDown = () => {
                    window.scrollBy(0, speed);
                    animationFrameId = requestAnimationFrame(scrollDown);
                };
                animationFrameId = requestAnimationFrame(scrollDown);
            }
        };

        // Only apply on non-touch devices ideally, or just desktop
        // Simple check: window.innerWidth > 768
        if (window.innerWidth > 768) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return null;
};

export default AutoScrollHandler;
