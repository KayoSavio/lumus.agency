"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
    Palette, Globe, Bot, Gamepad2, Pencil, User, Smartphone, Video,
    ChevronRight, ChevronLeft, Check, Loader2, MessageCircle
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// -- Config --
const SERVICES = [
    { id: "branding", title: "Branding", icon: Palette, color: "text-lumus-purple" },
    { id: "web", title: "Web Dev", icon: Globe, color: "text-lumus-blue" },
    { id: "ai", title: "AI Automation", icon: Bot, color: "text-lumus-green" },
    { id: "game", title: "Game Design", icon: Gamepad2, color: "text-orange-400" },
    { id: "illustration", title: "Ilustração", icon: Pencil, color: "text-pink-400" },
    { id: "character", title: "Personagens", icon: User, color: "text-amber-400" },
    { id: "uiux", title: "UI/UX Design", icon: Smartphone, color: "text-cyan-400" },
    { id: "motion", title: "Motion/Video", icon: Video, color: "text-red-400" },
];

const BUDGET_OPTIONS = [
    { id: "under1k", label: "Até R$ 1.000" },
    { id: "1k-3k", label: "R$ 1.000 - R$ 3.000" },
    { id: "3k-5k", label: "R$ 3.000 - R$ 5.000" },
    { id: "5k-10k", label: "R$ 5.000 - R$ 10.000" },
    { id: "over10k", label: "Acima de R$ 10.000" },
    { id: "discuss", label: "Prefiro discutir" },
];

const TIMELINE_OPTIONS = [
    { id: "urgent", label: "Urgente (menos de 1 semana)" },
    { id: "short", label: "Curto prazo (1-2 semanas)" },
    { id: "medium", label: "Médio prazo (2-4 semanas)" },
    { id: "flexible", label: "Flexível (1-2 meses)" },
    { id: "discuss", label: "A discutir" },
];

const SERVICE_QUESTIONS: Record<string, { id: string; label: string; placeholder: string; type?: "text" | "textarea" }[]> = {
    branding: [
        { id: "audience", label: "Qual é o seu público-alvo?", placeholder: "Ex: Jovens 18-30 anos interessados em tecnologia..." },
        { id: "values", label: "Quais valores a marca deve transmitir?", placeholder: "Ex: Inovação, confiança, modernidade..." },
        { id: "references", label: "Tem alguma referência visual?", placeholder: "Ex: Estilo Apple, cores vibrantes, minimalismo..." },
    ],
    web: [
        { id: "type", label: "Que tipo de site/app precisa?", placeholder: "Ex: Landing page, e-commerce, dashboard..." },
        { id: "features", label: "Funcionalidades principais?", placeholder: "Ex: Login, pagamentos, chatbot, blog..." },
        { id: "references", label: "Sites de referência?", placeholder: "Ex: stripe.com, linear.app..." },
    ],
    ai: [
        { id: "process", label: "Qual processo quer automatizar?", placeholder: "Ex: Atendimento ao cliente, geração de conteúdo..." },
        { id: "tools", label: "Usa quais ferramentas hoje?", placeholder: "Ex: WhatsApp, Notion, Google Sheets..." },
        { id: "volume", label: "Qual o volume esperado?", placeholder: "Ex: 100 mensagens/dia, 500 leads/mês..." },
    ],
    game: [
        { id: "genre", label: "Qual gênero/tipo de jogo?", placeholder: "Ex: Puzzle, RPG, casual, educativo..." },
        { id: "platform", label: "Para qual plataforma?", placeholder: "Ex: Mobile, PC, Web, Console..." },
        { id: "mechanics", label: "Mecânicas principais?", placeholder: "Ex: Match-3, gerenciamento, narrativo..." },
    ],
    illustration: [
        { id: "style", label: "Qual estilo prefere?", placeholder: "Ex: Anime, realista, cartoon, flat..." },
        { id: "quantity", label: "Quantas ilustrações?", placeholder: "Ex: 5 ilustrações, série de 10..." },
        { id: "usage", label: "Onde será usado?", placeholder: "Ex: Redes sociais, livro, jogo, marketing..." },
    ],
    character: [
        { id: "universe", label: "Qual o universo do personagem?", placeholder: "Ex: Fantasia medieval, sci-fi, cotidiano..." },
        { id: "personality", label: "Personalidade e características?", placeholder: "Ex: Herói corajoso, mascote fofo..." },
        { id: "style", label: "Estilo visual preferido?", placeholder: "Ex: 3D, pixel art, cartoon, semi-realista..." },
    ],
    uiux: [
        { id: "type", label: "Tipo de produto?", placeholder: "Ex: App mobile, dashboard web, SaaS..." },
        { id: "audience", label: "Quem são os usuários?", placeholder: "Ex: Profissionais de RH, jovens, idosos..." },
        { id: "references", label: "Apps de referência?", placeholder: "Ex: Spotify, Nubank, Notion..." },
    ],
    motion: [
        { id: "type", label: "Tipo de conteúdo?", placeholder: "Ex: Intro de canal, ad para redes, animação..." },
        { id: "duration", label: "Duração estimada?", placeholder: "Ex: 15 segundos, 1 minuto, série..." },
        { id: "style", label: "Estilo/referência?", placeholder: "Ex: Motion graphics, 3D, kinetic text..." },
    ],
};

const WHATSAPP_NUMBER = "5524999051196";

// -- Component --
export function ProjectBriefWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: "",
        projectName: "",
        description: "",
        budget: "",
        timeline: "",
        serviceAnswers: {} as Record<string, string>,
        name: "",
        whatsapp: "",
        email: "",
        company: "",
        howFound: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handlers
    const selectService = (id: string) => {
        setFormData(prev => ({ ...prev, service: id }));
        setStep(2);
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleServiceAnswer = (id: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            serviceAnswers: { ...prev.serviceAnswers, [id]: value }
        }));
    };

    const getServiceTitle = () => {
        return SERVICES.find(s => s.id === formData.service)?.title || "";
    };

    const getBudgetLabel = () => {
        return BUDGET_OPTIONS.find(b => b.id === formData.budget)?.label || formData.budget;
    };

    const getTimelineLabel = () => {
        return TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label || formData.timeline;
    };

    const generateWhatsAppMessage = () => {
        const serviceQuestions = SERVICE_QUESTIONS[formData.service] || [];

        let message = `🚀 *Nova Solicitação via LUMUS.AGENCY*\n\n`;
        message += `*Serviço:* ${getServiceTitle()}\n\n`;
        message += `━━━━━━━━━━━━━━━━━━\n`;
        message += `📋 *SOBRE O PROJETO*\n`;
        message += `━━━━━━━━━━━━━━━━━━\n\n`;
        message += `*Nome do Projeto:* ${formData.projectName || "Não informado"}\n`;
        message += `*Descrição:* ${formData.description || "Não informado"}\n`;
        message += `*Orçamento:* ${getBudgetLabel()}\n`;
        message += `*Prazo:* ${getTimelineLabel()}\n\n`;

        // Perguntas específicas do serviço
        if (serviceQuestions.length > 0) {
            message += `━━━━━━━━━━━━━━━━━━\n`;
            message += `💡 *DETALHES DO SERVIÇO*\n`;
            message += `━━━━━━━━━━━━━━━━━━\n\n`;
            serviceQuestions.forEach(q => {
                const answer = formData.serviceAnswers[q.id] || "Não informado";
                message += `*${q.label}*\n${answer}\n\n`;
            });
        }

        message += `━━━━━━━━━━━━━━━━━━\n`;
        message += `👤 *CONTATO*\n`;
        message += `━━━━━━━━━━━━━━━━━━\n\n`;
        message += `*Nome:* ${formData.name}\n`;
        message += `*WhatsApp:* ${formData.whatsapp}\n`;
        if (formData.email) message += `*Email:* ${formData.email}\n`;
        if (formData.company) message += `*Empresa:* ${formData.company}\n`;
        if (formData.howFound) message += `*Como conheceu:* ${formData.howFound}\n`;

        return encodeURIComponent(message);
    };

    const submitForm = async () => {
        setIsSubmitting(true);

        // Save to Supabase if configured
        try {
            if (supabase) {
                const payload = {
                    name: formData.name,
                    email: formData.email || null,
                    whatsapp: formData.whatsapp,
                    company: formData.company || null,
                    service_type: formData.service,
                    project_name: formData.projectName,
                    project_description: formData.description,
                    budget: formData.budget,
                    timeline: formData.timeline,
                    project_details: formData.serviceAnswers,
                    how_found: formData.howFound || null,
                };
                await supabase.from('leads').insert([payload]);
            }
        } catch (err) {
            console.error("Error saving to Supabase:", err);
            // Continue even if Supabase fails
        }

        // Redirect to WhatsApp
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        setIsSubmitting(false);
        window.open(whatsappUrl, "_blank");
    };

    const canProceedStep2 = formData.projectName && formData.description && formData.budget && formData.timeline;
    const canProceedStep3 = formData.name && formData.whatsapp;

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[400px]">
            {/* Progress Steps */}
            <div className="mb-12 flex justify-center items-center gap-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors",
                            step >= s
                                ? "bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple text-black border-none"
                                : "bg-transparent text-gray-600 border-gray-700"
                        )}>
                            {s}
                        </div>
                        {s < 3 && <div className={cn("w-12 h-[1px]", step > s ? "bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple" : "bg-gray-800")} />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* STEP 1: Service Selection */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Qual serviço você precisa?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {SERVICES.map((srv) => (
                                <GlassCard
                                    key={srv.id}
                                    onClick={() => selectService(srv.id)}
                                    className="cursor-pointer flex items-center justify-center hover:bg-white/5  group min-h-[120px]"
                                    active={formData.service === srv.id}
                                >
                                    <div className="flex justify-center flex-col items-center justify-center">
                                        <srv.icon className={cn("w-8 h-8 group-hover:scale-110 transition-transform duration-300", srv.color)} />

                                        <span className="font-bold text-white text-sm">{srv.title}</span>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: Project Details */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            Sobre o projeto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">{getServiceTitle()}</span>
                        </h3>

                        {/* Universal Questions */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Nome do Projeto/Negócio *</label>
                                <input
                                    type="text"
                                    value={formData.projectName}
                                    onChange={(e) => handleChange("projectName", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder="Nome do seu projeto ou empresa"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Orçamento Estimado *</label>
                                <select
                                    value={formData.budget}
                                    onChange={(e) => handleChange("budget", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-gray-900">Selecione...</option>
                                    {BUDGET_OPTIONS.map(opt => (
                                        <option key={opt.id} value={opt.id} className="bg-gray-900">{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Descreva brevemente o que precisa *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all min-h-[100px] resize-none"
                                placeholder="Conte um pouco sobre o projeto e seus objetivos..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Prazo Desejado *</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {TIMELINE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleChange("timeline", opt.id)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm transition-all border",
                                            formData.timeline === opt.id
                                                ? "bg-lumus-blue/20 border-lumus-blue text-white"
                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Service-specific questions */}
                        {SERVICE_QUESTIONS[formData.service]?.map((q) => (
                            <div key={q.id} className="space-y-2">
                                <label className="text-sm text-gray-400">{q.label}</label>
                                <input
                                    type="text"
                                    value={formData.serviceAnswers[q.id] || ""}
                                    onChange={(e) => handleServiceAnswer(q.id, e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder={q.placeholder}
                                />
                            </div>
                        ))}

                        <div className="flex justify-between pt-4">
                            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Voltar
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!canProceedStep2}
                                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-lumus-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Próximo <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: Contact Info */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">Quase lá! Como podemos te contatar?</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Seu Nome *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder="Nome completo"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">WhatsApp *</label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email (opcional)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder="seu@email.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Empresa/Negócio (opcional)</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => handleChange("company", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder="Nome da sua empresa"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Como nos conheceu? (opcional)</label>
                            <input
                                type="text"
                                value={formData.howFound}
                                onChange={(e) => handleChange("howFound", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                placeholder="Ex: Instagram, Google, indicação..."
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                <ChevronLeft className="w-4 h-4" /> Voltar
                            </button>
                            <button
                                onClick={submitForm}
                                disabled={isSubmitting || !canProceedStep3}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <MessageCircle className="w-5 h-5" />
                                        Enviar via WhatsApp
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
