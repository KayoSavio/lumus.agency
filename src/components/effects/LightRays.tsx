'use client';

import { useEffect, useRef, useState } from 'react';

interface LightRaysProps {
    raysOrigin?: 'top-left' | 'top-center' | 'top-right' | 'center';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    className?: string;
}

export default function LightRays({
    raysOrigin = 'top-center',
    raysColor = '#ffffff',
    raysSpeed = 1.5,
    lightSpread = 0.8,
    rayLength = 1.2,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0.1,
    className = ''
}: LightRaysProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0 });
    const animationRef = useRef<number>(0);

    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            };
        };

        if (followMouse) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        const rgb = hexToRgb(raysColor);
        let time = 0;

        const getOrigin = () => {
            const baseX = raysOrigin.includes('left') ? 0.2 :
                raysOrigin.includes('right') ? 0.8 : 0.5;
            const baseY = raysOrigin.includes('top') ? -0.1 : 0.5;

            if (followMouse) {
                return {
                    x: baseX + (mouseRef.current.x - 0.5) * mouseInfluence,
                    y: baseY
                };
            }
            return { x: baseX, y: baseY };
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const origin = getOrigin();
            const originX = origin.x * canvas.width;
            const originY = origin.y * canvas.height;

            const numRays = 12;
            const baseAngle = Math.PI / 2; // Pointing down
            const spreadAngle = Math.PI * lightSpread;

            for (let i = 0; i < numRays; i++) {
                const rayProgress = i / (numRays - 1);
                const angle = baseAngle - spreadAngle / 2 + rayProgress * spreadAngle;

                // Add subtle animation
                const noise = Math.sin(time * raysSpeed + i * 0.5) * noiseAmount;
                const adjustedAngle = angle + noise * 0.1;

                const length = canvas.height * rayLength;
                const endX = originX + Math.cos(adjustedAngle) * length;
                const endY = originY + Math.sin(adjustedAngle) * length;

                // Create gradient for each ray
                const gradient = ctx.createLinearGradient(originX, originY, endX, endY);

                const alpha = 0.15 + Math.sin(time * raysSpeed * 0.5 + i * 0.3) * 0.08;
                gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 1.5})`);
                gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
                gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha * 0.5})`);
                gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

                // Draw the ray as a triangle/cone
                const rayWidth = 60 + i * 15;

                ctx.beginPath();
                ctx.moveTo(originX, originY);
                ctx.lineTo(
                    endX - Math.cos(adjustedAngle + Math.PI / 2) * rayWidth,
                    endY - Math.sin(adjustedAngle + Math.PI / 2) * rayWidth
                );
                ctx.lineTo(
                    endX + Math.cos(adjustedAngle + Math.PI / 2) * rayWidth,
                    endY + Math.sin(adjustedAngle + Math.PI / 2) * rayWidth
                );
                ctx.closePath();
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Add central glow
            const glowGradient = ctx.createRadialGradient(
                originX, originY + 50, 0,
                originX, originY + 50, 300
            );
            glowGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
            glowGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
            glowGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

            ctx.beginPath();
            ctx.arc(originX, originY + 50, 300, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();

            time += 0.016;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, raysOrigin]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
