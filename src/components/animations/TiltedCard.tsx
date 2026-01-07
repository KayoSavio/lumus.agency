'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface TiltedCardProps {
    children: ReactNode;
    className?: string;
    rotateAmplitude?: number;
    scaleOnHover?: number;
    perspective?: number;
    showReflection?: boolean;
}

export default function TiltedCard({
    children,
    className = '',
    rotateAmplitude = 15,
    scaleOnHover = 1.05,
    perspective = 1000,
    showReflection = true
}: TiltedCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig);
    const scale = useSpring(1, springConfig);

    // Reflection/shine position
    const shineX = useTransform(x, [-0.5, 0.5], ['150%', '-50%']);
    const shineY = useTransform(y, [-0.5, 0.5], ['150%', '-50%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        x.set(mouseX / rect.width);
        y.set(mouseY / rect.height);
    };

    const handleMouseEnter = () => {
        scale.set(scaleOnHover);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        scale.set(1);
    };

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                transformStyle: 'preserve-3d'
            }}
            className={cn('relative', className)}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformStyle: 'preserve-3d'
                }}
                className="relative w-full h-full"
            >
                {/* Reflection/shine effect */}
                {showReflection && (
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
                        style={{
                            background: `linear-gradient(
                                105deg,
                                transparent 40%,
                                rgba(255, 255, 255, 0.1) 45%,
                                rgba(255, 255, 255, 0.2) 50%,
                                rgba(255, 255, 255, 0.1) 55%,
                                transparent 60%
                            )`,
                            backgroundPosition: `${shineX}% ${shineY}%`,
                            backgroundSize: '200% 200%'
                        }}
                    />
                )}

                {/* Content with 3D depth */}
                <div style={{ transform: 'translateZ(0px)' }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
