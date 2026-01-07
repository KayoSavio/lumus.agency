'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface CountUpProps {
    end: number;
    start?: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    decimals?: number;
    className?: string;
    triggerOnView?: boolean;
    delay?: number;
    easing?: 'linear' | 'easeOut' | 'easeInOut';
}

export default function CountUp({
    end,
    start = 0,
    prefix = '',
    suffix = '',
    duration = 2,
    decimals = 0,
    className = '',
    triggerOnView = true,
    delay = 0,
    easing = 'easeOut'
}: CountUpProps) {
    const [count, setCount] = useState(start);
    const [hasStarted, setHasStarted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });
    const animationRef = useRef<number | null>(null);

    const easingFunctions = {
        linear: (t: number) => t,
        easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
        easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    };

    const animate = useCallback(() => {
        const startTime = performance.now();
        const durationMs = duration * 1000;

        const tick = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = easingFunctions[easing](progress);
            const currentValue = start + (end - start) * easedProgress;

            setCount(currentValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(tick);
            } else {
                setIsComplete(true);
            }
        };

        animationRef.current = requestAnimationFrame(tick);
    }, [start, end, duration, easing]);

    useEffect(() => {
        if (triggerOnView && !isInView) return;
        if (hasStarted) return;

        const timeoutId = setTimeout(() => {
            setHasStarted(true);
            animate();
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isInView, triggerOnView, hasStarted, delay, animate]);

    // Show animated value, or end value if animation hasn't started yet for better UX
    const displayValue = hasStarted ? count : (triggerOnView ? start : end);
    const formattedCount = displayValue.toFixed(decimals);

    return (
        <motion.span
            ref={containerRef}
            className={cn('tabular-nums inline-block', className)}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            {prefix}{formattedCount}{suffix}
        </motion.span>
    );
}

