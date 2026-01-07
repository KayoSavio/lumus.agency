"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { ProjectBriefWizard } from "@/components/features/ProjectBriefWizard";
import GradientText from "@/components/animations/GradientText";
import RotatingText from "@/components/animations/RotatingText";

export function Contact() {
    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lumus-blue/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <div className="glass-panel p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lumus-blue to-lumus-purple" />

                    <div className="text-center mb-8">
                        <div className="inline-block px-3 py-1 rounded-full bg-lumus-purple/10 border border-lumus-purple/30 mb-4">
                            <span className="text-lumus-purple text-xs font-semibold uppercase flex items-center gap-2">
                                ⚡{" "}
                                <RotatingText
                                    texts={[
                                        "Vagas limitadas",
                                        "Agenda preenchendo",
                                        "Reserve agora",
                                        "Apenas 4 vagas/mês"
                                    ]}
                                    mainClassName="inline"
                                    rotationInterval={3000}
                                    staggerDuration={0.015}
                                    splitBy="characters"
                                />
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            <GradientText
                                colors={['#00f597', '#64c6fc', '#d865f3']}
                                animationSpeed={6}
                                className="font-bold"
                            >
                                Agendar Sessão de Diagnóstico
                            </GradientText>
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Análise profunda do seu negócio para identificar <span className="text-white font-semibold">gargalos de crescimento</span> e oportunidades de escala através de infraestrutura digital.
                        </p>

                        {/* Benefits bullets */}
                        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8 text-left">
                            <div className="flex items-start gap-2">
                                <span className="text-lumus-green text-xl">✓</span>
                                <span className="text-sm text-gray-300">Auditoria completa de infraestrutura</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-lumus-blue text-xl">✓</span>
                                <span className="text-sm text-gray-300">Roadmap personalizado de crescimento</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-lumus-purple text-xl">✓</span>
                                <span className="text-sm text-gray-300">Projeção de ROI e timeline</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-600 italic">
                            * Garantimos qualidade máxima limitando nosso atendimento a 4 novos projetos mensais
                        </p>
                    </div>

                    <ProjectBriefWizard />
                </div>
            </div>
        </section>
    );
}
