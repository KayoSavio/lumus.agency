"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Zap, Rocket } from "lucide-react";
import GradientText from "@/components/animations/GradientText";
import ScrollReveal from "@/components/animations/ScrollReveal";

const journeySteps = [
    {
        icon: TrendingUp,
        title: "O Desafio",
        subtitle: "Infraestrutura Legada",
        description: "Empresas presas em sistemas antigos, perdendo oportunidades de crescimento e competitividade no mercado digital.",
        stat: "73%",
        statLabel: "das empresas perdem vendas por infraestrutura lenta",
        color: "from-red-500 to-orange-500"
    },
    {
        icon: Zap,
        title: "A Solução",
        subtitle: "Ecossistema Digital Integrado",
        description: "Plataformas modernas, automação inteligente e infraestrutura escalável que trabalham em sincronia perfeita.",
        stat: "10x",
        statLabel: "mais rápido que sistemas tradicionais",
        color: "from-lumus-blue to-lumus-purple"
    },
    {
        icon: Rocket,
        title: "A Transformação",
        subtitle: "Escala para 8 Dígitos",
        description: "Crescimento exponencial com infraestrutura que suporta milhões de usuários e bilhões em transações.",
        stat: "R$ 50M+",
        statLabel: "em vendas geradas para clientes",
        color: "from-lumus-green to-emerald-500"
    }
];

function JourneyCard({ step, index }: { step: typeof journeySteps[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
        >
            {/* Connector line */}
            {index < journeySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2 z-0" />
            )}

            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group h-full">
                {/* Icon with gradient background */}
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} p-[2px] mb-6`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{step.title}</p>
                    <h3 className="text-2xl font-bold text-white">{step.subtitle}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">
                    {step.description}
                </p>

                {/* Stat */}
                <div className={`relative inline-block p-[1px] rounded-xl bg-gradient-to-r ${step.color}`}>
                    <div className="bg-[#0a0a0a] rounded-xl px-5 py-3">
                        <p className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                            {step.stat}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{step.statLabel}</p>
                    </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${step.color} blur-2xl -z-10`} style={{ transform: 'scale(0.8)' }} />
            </div>
        </motion.div>
    );
}

export function Journey() {
    return (
        <section id="journey" className="py-32 relative overflow-hidden bg-transparent">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lumus-purple/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        A Jornada de{" "}
                        <GradientText
                            colors={['#00f597', '#64c6fc', '#d865f3']}
                            animationSpeed={6}
                            className="font-bold"
                        >
                            Transformação
                        </GradientText>
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <ScrollReveal
                            className="text-xl text-gray-400 leading-relaxed justify-center"
                            baseOpacity={0.5}
                        >
                            Do problema à solução. Da estagnação ao crescimento exponencial. Veja como transformamos empresas através de infraestrutura digital de ponta.
                        </ScrollReveal>
                    </div>
                </motion.div>

                {/* Journey steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-7xl mx-auto">
                    {journeySteps.map((step, index) => (
                        <JourneyCard key={index} step={step} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 text-sm">
                        → Pronto para iniciar sua transformação?
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
