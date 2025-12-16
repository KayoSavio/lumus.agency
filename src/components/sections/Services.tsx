"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, Palette, Bot, Layers } from "lucide-react";

const services = [
    {
        title: "Sites & Sistemas Web",
        desc: "Desenvolvimento high-end com Next.js e performance extrema.",
        icon: Globe,
        color: "#00C6FF",
    },
    {
        title: "Identidade Visual Premium",
        desc: "Design system completo e marca memorável.",
        icon: Palette,
        color: "#8A2BFF",
    },
    {
        title: "Automação com IA",
        desc: "Bots, agentes n8n e integração com LLMs.",
        icon: Bot,
        color: "#FF2B8A",
    },
    {
        title: "Branding & UX",
        desc: "Estratégia de marca e experiência do usuário imersiva.",
        icon: Layers,
        color: "#FFC600",
    },
];

function TiltCard({ service, index }: { service: any; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[300px] w-full rounded-2xl bg-[#0a0a0a] border border-white/5 p-8 flex flex-col justify-center items-center text-center gap-6 group cursor-pointer"
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="relative bg-white/5 p-4 rounded-full border border-white/10 group-hover:border-white/30 transition-colors"
            >
                <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: service.color }} />
                <service.icon className="w-8 h-8 text-white relative z-10" />
            </div>

            <div style={{ transform: "translateZ(50px)" }}>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>

            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
        </motion.div>
    );
}

export function Services() {
    return (
        <section id="services" className="py-24 bg-[#030303]">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                    Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">Serviços</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
                    {services.map((service, i) => (
                        <div key={i} className="perspective-1000">
                            <TiltCard service={service} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
