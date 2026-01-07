'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
    triggerOnView?: boolean;
    scrambleChars?: string;
    delay?: number;
}

export default function TextScramble({
    text,
    className = '',
    speed = 50,
    triggerOnView = true,
    scrambleChars = '!<>-_\\/[]{}—=+*^?#________',
    delay = 0
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (triggerOnView && !isInView) return;
        if (hasAnimated.current) return;

        const startAnimation = () => {
            hasAnimated.current = true;
            setIsAnimating(true);

            const chars = text.split('');
            const iterations = chars.length;
            let frame = 0;

            const animate = () => {
                const output = chars.map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < frame) {
                        return chars[index];
                    }
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }).join('');

                setDisplayText(output);

                if (frame < iterations) {
                    frame += 0.5;
                    setTimeout(animate, speed);
                } else {
                    setDisplayText(text);
                    setIsAnimating(false);
                }
            };

            animate();
        };

        const timeoutId = setTimeout(startAnimation, delay);
        return () => clearTimeout(timeoutId);
    }, [isInView, text, speed, scrambleChars, triggerOnView, delay]);

    return (
        <motion.span
            ref={containerRef}
            className={cn('inline-block font-mono', className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText}
        </motion.span>
    );
}
