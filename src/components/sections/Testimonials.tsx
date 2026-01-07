"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import AnimatedList from "@/components/animations/AnimatedList";
import GradientText from "@/components/animations/GradientText";
import SpotlightCard from "@/components/animations/SpotlightCard";

const testimonials = [
    {
        name: "Carlos Mendes",
        role: "CEO",
        company: "TechCorp Brasil",
        image: "/api/placeholder/80/80",
        content: "A LUMUS transformou nossa operação digital. Escalamos de R$ 2M para R$ 15M em 18 meses com a infraestrutura que eles construíram.",
        metric: "+650% crescimento",
        color: "#00f597"
    },
    {
        name: "Ana Paula Silva",
        role: "CTO",
        company: "FinanceHub",
        image: "/api/placeholder/80/80",
        content: "Automação com IA que realmente funciona. Reduzimos 70% dos custos operacionais e aumentamos a satisfação do cliente em 40%.",
        metric: "70% redução de custos",
        color: "#64c6fc"
    },
    {
        name: "Roberto Almeida",
        role: "Diretor de Tecnologia",
        company: "Marketplace Pro",
        image: "/api/placeholder/80/80",
        content: "Parceria estratégica de verdade. O ecossistema mobile que desenvolveram gerou R$ 3M em vendas diretas no primeiro trimestre.",
        metric: "R$ 3M em vendas",
        color: "#d865f3"
    }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <SpotlightCard
            spotlightColor={`${testimonial.color}20`}
            spotlightSize={300}
            className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group h-full"
        >
            {/* Quote icon */}
            <Quote className="absolute top-6 right-6 w-8 h-8 text-lumus-blue/20 group-hover:text-lumus-blue/40 transition-colors" />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lumus-green text-lumus-green" />
                ))}
            </div>

            {/* Content */}
            <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
            </p>

            {/* Metric highlight */}
            <div className="inline-block px-3 py-1 rounded-full bg-lumus-green/10 border border-lumus-green/30 mb-6">
                <span className="text-lumus-green text-xs font-bold">{testimonial.metric}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)` }}
                >
                    <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                </div>
                <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role} • {testimonial.company}</p>
                </div>
            </div>

            {/* Glow effect */}
            <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl"
                style={{ backgroundColor: testimonial.color }}
            />
        </SpotlightCard>
    );
}

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lumus-green/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        O Que Dizem Nossos <GradientText colors={['#00f597', '#64c6fc', '#d865f3']} animationSpeed={5}>Parceiros</GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Decisores que confiaram na LUMUS para escalar seus negócios
                    </p>
                </div>

                <AnimatedList
                    staggerDelay={0.15}
                    direction="up"
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, i) => (
                        <TestimonialCard key={i} testimonial={testimonial} />
                    ))}
                </AnimatedList>
            </div>
        </section>
    );
}

