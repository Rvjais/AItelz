import { useEffect, useRef } from 'react';
import './InteractiveCursor.css';

const InteractiveCursor = () => {
    const cursorRef = useRef(null);
    const positionRef = useRef({
        distanceX: 0,
        distanceY: 0,
        distance: 0,
        pointerX: 0,
        pointerY: 0,
    });
    const previousPointerRef = useRef({ x: 0, y: 0 });
    const angleRef = useRef({ current: 0, previous: 0, displace: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const root = document.body;
        const cursorSize = 20;

        if (!cursor) return;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            cursor.remove();
            return;
        }

        // Initial setup
        cursor.removeAttribute("hidden");

        const move = (event) => {
            const previousPointer = previousPointerRef.current;
            const position = positionRef.current;

            previousPointer.x = position.pointerX;
            previousPointer.y = position.pointerY;

            // Handle both MouseEvent and TouchEvent
            const pageX = event.pageX || (event.touches && event.touches[0].pageX);
            const pageY = event.pageY || (event.touches && event.touches[0].pageY);

            if (pageX === undefined || pageY === undefined) return;

            position.pointerX = pageX + root.getBoundingClientRect().x;
            position.pointerY = pageY + root.getBoundingClientRect().y;
            position.distanceX = previousPointer.x - position.pointerX;
            position.distanceY = previousPointer.y - position.pointerY;
            position.distance = Math.sqrt(position.distanceY ** 2 + position.distanceX ** 2);

            let transformString = `translate3d(${position.pointerX}px, ${position.pointerY}px, 0)`;

            // Check hover targets for scaling
            const target = event.target;
            const isHovering = target.localName === 'button' ||
                target.localName === 'a' ||
                target.localName === 'input' ||
                target.localName === 'textarea' ||
                target.onclick !== null ||
                (target.className && typeof target.className === 'string' && target.className.includes('curzr-hover')) ||
                target.closest('a') ||
                target.closest('button');

            if (isHovering) {
                transformString += ` scale(1.3)`;
            }

            cursor.style.transform = transformString;

            if (position.distance > 1) {
                rotate(position);
            } else {
                cursor.style.transform += ` rotate(${angleRef.current.displace}deg)`;
            }
        };

        const rotate = (position) => {
            const degrees = 57.296;
            let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * degrees;
            const angleState = angleRef.current;
            angleState.previous = angleState.current;

            if (position.distanceX <= 0 && position.distanceY >= 0) {
                angleState.current = 90 - unsortedAngle + 0;
            } else if (position.distanceX < 0 && position.distanceY < 0) {
                angleState.current = unsortedAngle + 90;
            } else if (position.distanceX >= 0 && position.distanceY <= 0) {
                angleState.current = 90 - unsortedAngle + 180;
            } else if (position.distanceX > 0 && position.distanceY > 0) {
                angleState.current = unsortedAngle + 270;
            }

            if (isNaN(angleState.current)) {
                angleState.current = angleState.previous;
            } else {
                if (angleState.current - angleState.previous <= -270) {
                    angleState.displace += 360 + angleState.current - angleState.previous;
                } else if (angleState.current - angleState.previous >= 270) {
                    angleState.displace += angleState.current - angleState.previous - 360;
                } else {
                    angleState.displace += angleState.current - angleState.previous;
                }
            }

            cursor.style.left = `${-cursorSize / 2}px`;
            cursor.style.top = `${0}px`;
            cursor.style.transform += ` rotate(${angleState.displace}deg)`;
        };

        const handleClick = () => {
            // Optional click animation if needed
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("touchmove", move);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="curzr-arrow-pointer" ref={cursorRef} hidden>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path className="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
                <path className="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
            </svg>
        </div>
    );
};

export default InteractiveCursor;
