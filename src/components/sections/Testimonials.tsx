"use client";

import { motion } from "framer-motion";
import { Star, Quote, Linkedin } from "lucide-react";
import AnimatedList from "@/components/animations/AnimatedList";
import GradientText from "@/components/animations/GradientText";
import SpotlightCard from "@/components/animations/SpotlightCard";

const testimonials = [
    {
        name: "Tulio de Aguiar",
        role: "Engenheiro Ambiental",
        company: "Especialista em Qualidade e Melhoria Contínua",
        linkedIn: "https://www.linkedin.com/in/tuliodeaguiar/",
        content: "Tive a oportunidade de conhecer os trabalhos do Kayo Savio em um projeto de design, e fiquei impressionado com sua habilidade e profissionalismo. Mesmo em um curto espaço de tempo, Kayo demonstrou um profundo conhecimento técnico e um talento incrível para transformar ideias em realidade. Kayo é detalhista, criativo e altamente comprometido com a qualidade do trabalho.",
        highlight: "Superou minhas expectativas",
        color: "#00f597"
    },
    {
        name: "Thiago Valentim Martins",
        role: "Senior Software Engineer",
        company: "Node | Typescript | NestJS | Back-end",
        linkedIn: "https://www.linkedin.com/in/thiago-valentim-martins-3a0b22121/",
        content: "Kayo é um profissional criativo, diligente, e colaborativo. Trabalhei diretamente com ele em diversas ocasiões e posso afirmar o valor que ele dá aos detalhes e à abertura à opiniões. Indico para todos que queiram se surpreender positivamente com suas entregas.",
        highlight: "Entregas surpreendentes",
        color: "#64c6fc"
    },
    {
        name: "Alexander Martins La Espina",
        role: "Empreendedor em Série",
        company: "Fundador Licitei & TuriVerde",
        linkedIn: "https://www.linkedin.com/in/laespina/",
        content: "Venho aqui deixar o meu agradecimento ao Kayo, estava a procura de um desenvolvedor para fazer um trabalho freelance para a minha empresa, acontece que eu achei um profissional que é fora de curva. Estou muito feliz com o resultado do projeto em si, e já fechamos outros trabalhos. Super recomendo!",
        highlight: "Profissional fora de curva",
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

            {/* Highlight */}
            <div className="inline-block px-3 py-1 rounded-full bg-lumus-green/10 border border-lumus-green/30 mb-6">
                <span className="text-lumus-green text-xs font-bold">{testimonial.highlight}</span>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
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
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                </div>
                <a
                    href={testimonial.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 transition-all hover:scale-105"
                    title="Ver perfil no LinkedIn"
                >
                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                </a>
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

