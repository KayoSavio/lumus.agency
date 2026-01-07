'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionTemplate } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface ScrollRevealProps {
    children: string;
    className?: string;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    rotationEnd?: number;
    wordAnimationEnd?: number;
}

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    enableBlur: boolean;
    baseOpacity: number;
    baseRotation: number;
    blurStrength: number;
}

const Word = ({ children, progress, range, enableBlur, baseOpacity, baseRotation, blurStrength }: WordProps) => {
    const opacity = useTransform(progress, range, [baseOpacity, 1]);
    const y = useTransform(progress, range, [10, 0]);

    return (
        <span className="inline-block mr-[0.25em] last:mr-0">
            <motion.span
                style={{
                    opacity,
                    y,
                    display: 'inline-block',
                }}
            >
                {children}
            </motion.span>
        </span>
    );
};

export default function ScrollReveal({
    children,
    className,
    scrollContainerRef,
    enableBlur = false, // Disabled by default for better readability
    baseOpacity = 0.3,
    baseRotation = 0,
    blurStrength = 2,
    containerClassName,
    rotationEnd = 0.9,
    wordAnimationEnd = 0.8
}: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ['start 0.95', 'start 0.5']
    });

    const words = useMemo(() => children.split(' '), [children]);

    return (
        <div
            ref={containerRef}
            className={cn('relative', containerClassName)}
        >
            <motion.p
                className={cn(
                    'flex flex-wrap text-pretty',
                    className
                )}
            >
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + wordAnimationEnd / words.length;
                    return (
                        <Word
                            key={i}
                            progress={scrollYProgress}
                            range={[start, end]}
                            enableBlur={enableBlur}
                            baseOpacity={baseOpacity}
                            baseRotation={baseRotation}
                            blurStrength={blurStrength}
                        >
                            {word}
                        </Word>
                    );
                })}
            </motion.p>
        </div>
    );
}

