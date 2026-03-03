import React, { useState, useEffect } from 'react';
import './Bubble.css';

const Bubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [bubbleClass, setBubbleClass] = useState('bubble blue');

    const toggleBubble = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        const bubble = e.currentTarget;
        const offset = {
            x: e.clientX - bubble.getBoundingClientRect().left,
            y: e.clientY - bubble.getBoundingClientRect().top,
        };

        const handleMouseMove = (moveEvent) => {
            bubble.style.left = `${moveEvent.clientX - offset.x}px`;
            bubble.style.top = `${moveEvent.clientY - offset.y}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        const updateBubbleState = (status) => {
            switch (status) {
                case 'checkpoint':
                    setBubbleClass('bubble orange');
                    break;
                case 'alarm':
                    setBubbleClass('bubble purple');
                    break;
                case 'critical':
                    setBubbleClass('bubble red');
                    break;
                default:
                    setBubbleClass('bubble blue');
            }
        };

        // Example: Simulate status updates
        const interval = setInterval(() => {
            // Logic to determine the current status
            // For demonstration, we cycle through statuses
            updateBubbleState('checkpoint');
            setTimeout(() => updateBubbleState('alarm'), 3000);
            setTimeout(() => updateBubbleState('critical'), 6000);
            setTimeout(() => updateBubbleState('normal'), 9000);
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={bubbleClass}
            onMouseDown={handleMouseDown}
            onClick={toggleBubble}
            style={{ position: 'absolute', cursor: 'pointer' }}
        >
            {isOpen && <div className="compact-panel">Compact Panel Content</div>}
        </div>
    );
};

export default Bubble;