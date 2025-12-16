"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu, Palette, Zap, Star } from "lucide-react";

const features = [
    {
        title: "Design Futurista",
        description: "Estética visual que desafia o convencional e define tendências.",
        icon: Palette,
        colSpan: "md:col-span-2",
        gradient: "from-lumus-blue/20 to-transparent",
    },
    {
        title: "Tecnologia de Ponta",
        description: "Next.js, WebGL e as stacks mais modernas do mercado.",
        icon: Cpu,
        colSpan: "md:col-span-1",
        gradient: "from-lumus-purple/20 to-transparent",
    },
    {
        title: "Automação com IA",
        description: "Integração profunda com LLMs e workflows inteligentes.",
        icon: Zap,
        colSpan: "md:col-span-1",
        gradient: "from-amber-500/10 to-transparent",
    },
    {
        title: "Experiência Premium",
        description: "Cada detalhe é polido para transmitir exclusividade e valor.",
        icon: Star,
        colSpan: "md:col-span-2",
        gradient: "from-emerald-500/10 to-transparent",
    },
];

export function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Por que <span className="text-lumus-blue">Lumos</span>?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Unimos criatividade e engenharia de software para criar produtos digitais que não apenas funcionam, mas impressionam.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={feature.colSpan}
                        >
                            <GlassCard className="h-full flex flex-col justify-between">
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:opacity-40 transition-opacity`} />

                                <feature.icon className="w-10 h-10 text-white mb-6" />

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
