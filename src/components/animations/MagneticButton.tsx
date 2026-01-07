'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    magnetStrength?: number;
    onClick?: () => void;
    disabled?: boolean;
}

export default function MagneticButton({
    children,
    className = '',
    magnetStrength = 0.3,
    onClick,
    disabled = false
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || disabled) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * magnetStrength);
        y.set(distanceY * magnetStrength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            disabled={disabled}
            style={{
                x: springX,
                y: springY
            }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'relative cursor-pointer transition-all',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
        >
            {children}
        </motion.button>
    );
}
