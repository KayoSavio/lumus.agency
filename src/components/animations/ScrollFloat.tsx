'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface ScrollFloatProps {
    children: ReactNode;
    className?: string;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    containerClassName?: string;
    animationDuration?: number;
    ease?: string;
    floatAmount?: number;
    rotateAmount?: number;
    scaleAmount?: number;
}

export default function ScrollFloat({
    children,
    className,
    scrollContainerRef,
    containerClassName,
    animationDuration = 0.3,
    ease = 'easeOut',
    floatAmount = 50,
    rotateAmount = 5,
    scaleAmount = 0.95
}: ScrollFloatProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ['start end', 'end start']
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    const smoothProgress = useSpring(scrollYProgress, springConfig);

    const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [floatAmount, 0, 0, -floatAmount]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [scaleAmount, 1, 1, scaleAmount]);
    const rotateX = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [rotateAmount, 0, 0, -rotateAmount]);

    return (
        <div
            ref={containerRef}
            className={cn('relative', containerClassName)}
        >
            <motion.div
                className={className}
                style={{
                    y,
                    opacity,
                    scale,
                    rotateX,
                    transformPerspective: 1000,
                    willChange: 'transform, opacity'
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
