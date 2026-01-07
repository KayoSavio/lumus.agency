"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Cpu, Palette, Zap, Star } from "lucide-react";
import GradientText from "@/components/animations/GradientText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";

const features = [
    {
        title: "Engenharia de Vendas",
        description: "Sistemas projetados para maximizar conversão em cada etapa do funil, transformando leads em contratos de alto valor.",
        icon: Palette,
        colSpan: "md:col-span-2",
        gradient: "from-lumus-blue/20 to-transparent",
    },
    {
        title: "Otimização de Performance",
        description: "Infraestrutura Next.js de nível enterprise com tempos de carregamento sub-segundo e 99.9% uptime.",
        icon: Cpu,
        colSpan: "md:col-span-1",
        gradient: "from-lumus-purple/20 to-transparent",
    },
    {
        title: "ROI Mensurável",
        description: "Dashboards em tempo real que mostram exatamente quanto cada componente do ecossistema está gerando de receita.",
        icon: Zap,
        colSpan: "md:col-span-1",
        gradient: "from-amber-500/10 to-transparent",
    },
    {
        title: "Segurança de Dados Enterprise",
        description: "Compliance LGPD, criptografia end-to-end e infraestrutura blindada para proteger seus ativos digitais.",
        icon: Star,
        colSpan: "md:col-span-2",
        gradient: "from-emerald-500/10 to-transparent",
    },
];

export function About() {
    return (
        <section id="about" className="py-32 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Infraestrutura Digital para{" "}
                        <GradientText
                            colors={['#00f597', '#64c6fc', '#d865f3']}
                            animationSpeed={6}
                            className="font-bold"
                        >
                            Crescimento Exponencial
                        </GradientText>
                    </h2>
                    <div className="max-w-2xl">
                        <ScrollReveal
                            className="text-gray-400 text-lg"
                            baseOpacity={0.5}
                        >
                            Parceiro estratégico de empresas que buscam domínio de mercado através de tecnologia de ponta e processos otimizados.
                        </ScrollReveal>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-8 mt-6 text-sm text-gray-500"
                    >
                        <div>
                            <div className="font-bold text-2xl">
                                <GradientText colors={['#00f597', '#22c55e']} animationSpeed={4}>
                                    R$ <CountUp end={50} duration={2.5} triggerOnView />M+
                                </GradientText>
                            </div>
                            <span className="block mt-1">em vendas geradas</span>
                        </div>
                        <div>
                            <div className="font-bold text-2xl">
                                <GradientText colors={['#64c6fc', '#3b82f6']} animationSpeed={4}>
                                    <CountUp end={99.9} decimals={1} duration={2} triggerOnView />%
                                </GradientText>
                            </div>
                            <span className="block mt-1">Uptime</span>
                        </div>
                        <div>
                            <div className="font-bold text-2xl">
                                <GradientText colors={['#d865f3', '#a855f7']} animationSpeed={4}>
                                    <CountUp end={4} duration={1.5} triggerOnView />-<CountUp end={6} duration={1.8} delay={200} triggerOnView />x
                                </GradientText>
                            </div>
                            <span className="block mt-1">ROI médio</span>
                        </div>
                    </motion.div>
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

