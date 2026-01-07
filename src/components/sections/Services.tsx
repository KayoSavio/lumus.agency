"use client";

import { motion } from "framer-motion";
import { Globe, Palette, Bot, Layers } from "lucide-react";
import GradientText from "@/components/animations/GradientText";

const services = [
    {
        title: "Plataformas de Alta Conversão",
        desc: "Sites e Webapps Next.js ultrarrápidos projetados para transformar tráfego em receita recorrente.",
        icon: Globe,
        color: "#00C6FF",
    },
    {
        title: "Autoridade de Mercado",
        desc: "Identidade visual que posiciona sua marca como líder incontestável do setor, permitindo margens de lucro maiores.",
        icon: Palette,
        color: "#8A2BFF",
    },
    {
        title: "Operação Autônoma (IA)",
        desc: "Implementação de agentes de IA e automações n8n que trabalham 24/7 pelo seu comercial e suporte.",
        icon: Bot,
        color: "#FF2B8A",
    },
    {
        title: "Ecossistema Mobile",
        desc: "Aplicativos que retêm clientes e criam canais de vendas diretos no bolso do seu consumidor.",
        icon: Layers,
        color: "#FFC600",
    },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden">
                {/* Gradient border on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]"
                    style={{ background: `linear-gradient(135deg, ${service.color}40, transparent, ${service.color}20)` }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                    >
                        <service.icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </div>

                {/* Subtle glow on hover */}
                <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl"
                    style={{ backgroundColor: service.color }}
                />
            </div>
        </motion.div>
    );
}

export function Services() {
    return (
        <section id="services" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <GradientText
                            colors={['#00f597', '#64c6fc', '#d865f3']}
                            animationSpeed={5}
                            className="font-bold"
                        >
                            Lumus Growth Engine
                        </GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Uma solução completa e integrada. Não vendemos serviços isolados, construímos infraestrutura para escala.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

