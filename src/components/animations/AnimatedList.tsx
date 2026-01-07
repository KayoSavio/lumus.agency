'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface AnimatedListProps {
    children: ReactNode[];
    className?: string;
    staggerDelay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    initialDelay?: number;
    duration?: number;
}

export default function AnimatedList({
    children,
    className = '',
    staggerDelay = 0.1,
    direction = 'up',
    initialDelay = 0,
    duration = 0.5
}: AnimatedListProps) {
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up': return { y: 40, x: 0 };
            case 'down': return { y: -40, x: 0 };
            case 'left': return { y: 0, x: 40 };
            case 'right': return { y: 0, x: -40 };
            default: return { y: 40, x: 0 };
        }
    };

    const offset = getDirectionOffset();

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: offset.y,
            x: offset.x,
            scale: 0.95,
            filter: 'blur(4px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration
            }
        }
    };

    return (
        <motion.div
            className={cn('', className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="will-change-transform"
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}
