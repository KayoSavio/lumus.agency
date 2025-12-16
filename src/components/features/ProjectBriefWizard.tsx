"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import {
    Palette, Globe, Bot, Layers, ChevronRight, Check, Loader2
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// -- Config --
const SERVICES = [
    { id: "branding", title: "Branding", icon: Palette, color: "text-lumus-purple" },
    { id: "web", title: "Web Dev", icon: Globe, color: "text-lumus-blue" },
    { id: "ai", title: "AI Automation", icon: Bot, color: "text-lumus-green" },
    { id: "other", title: "Outros", icon: Layers, color: "text-white" },
];

const QUESTIONS: Record<string, { id: string; label: string; placeholder: string }[]> = {
    branding: [
        { id: "audience", label: "Quem é seu público-alvo?", placeholder: "Ex: Startups de tecnologia, público jovem..." },
        { id: "values", label: "Quais os valores da marca?", placeholder: "Ex: Inovação, Confiança, Minimalismo..." },
    ],
    web: [
        { id: "features", label: "Quais funcionalidades principais?", placeholder: "Ex: Login, Dashboard, Pagamentos..." },
        { id: "benchmark", label: "Sites de referência?", placeholder: "Ex: Apple.com, Linear.app..." },
    ],
    ai: [
        { id: "process", label: "Qual processo deseja automatizar?", placeholder: "Ex: Atendimento ao cliente, Geração de leads..." },
        { id: "volume", label: "Qual o volume esperado?", placeholder: "Ex: 1000 conversas/mês..." },
    ],
    other: [
        { id: "description", label: "Descreva seu projeto", placeholder: "Conte-nos mais..." },
    ]
};

// -- Component --
export function ProjectBriefWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: "",
        answers: {} as Record<string, string>,
        name: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Handlers
    const selectService = (id: string) => {
        setFormData(prev => ({ ...prev, service: id }));
        setStep(2);
    };

    const handleAnswerChange = (id: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            answers: { ...prev.answers, [id]: value }
        }));
    };

    const submitForm = async () => {
        setIsSubmitting(true);

        // Construct payload
        const payload = {
            name: formData.name,
            email: formData.email,
            service_type: formData.service,
            project_details: formData.answers,
        };

        try {
            if (supabase) {
                const { error } = await supabase.from('leads').insert([payload]);
                if (error) throw error;
            } else {
                // Mock if no keys provided
                console.log("Supabase keys missing, logging payload:", payload);
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting:", err);
            alert("Ocorreu um erro ao enviar. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render Steps
    if (submitted) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Mensagem Recebida!</h3>
                <p className="text-gray-400">Em breve nossa equipe entrará em contato.</p>
                <button
                    onClick={() => { setSubmitted(false); setStep(1); setFormData({ service: "", answers: {}, name: "", email: "" }); }}
                    className="mt-8 text-lumus-blue hover:text-white transition-colors"
                >
                    Enviar outro projeto
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[400px]">
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
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {SERVICES.map((srv) => (
                            <GlassCard
                                key={srv.id}
                                onClick={() => selectService(srv.id)}
                                className="cursor-pointer hover:bg-white/5 flex flex-col items-center justify-center gap-4 py-8 group"
                                active={formData.service === srv.id}
                            >
                                <srv.icon className={cn("w-10 h-10 group-hover:scale-110 transition-transform duration-300", srv.color)} />
                                <span className="font-bold text-white">{srv.title}</span>
                            </GlassCard>
                        ))}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">
                            Conte mais sobre o projeto de <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple capitalize">{SERVICES.find(s => s.id === formData.service)?.title}</span>
                        </h3>

                        {QUESTIONS[formData.service]?.map((q) => (
                            <div key={q.id} className="space-y-2">
                                <label className="text-sm text-gray-400">{q.label}</label>
                                <input
                                    type="text"
                                    value={formData.answers[q.id] || ""}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                    placeholder={q.placeholder}
                                />
                            </div>
                        ))}

                        <div className="flex justify-between pt-4">
                            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white">Voltar</button>
                            <button
                                onClick={() => setStep(3)}
                                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-lumus-blue transition-colors"
                            >
                                Próximo <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">Para onde devemos enviar a proposta?</h3>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Seu Nome</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                placeholder="Nome completo"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Seu Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lumus-blue/50 focus:bg-white/10 transition-all"
                                placeholder="seu@email.com"
                            />
                        </div>

                        <div className="flex justify-between pt-4">
                            <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white">Voltar</button>
                            <button
                                onClick={submitForm}
                                disabled={isSubmitting || !formData.name || !formData.email}
                                className="flex items-center gap-2 bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple text-black px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Finalizar & Enviar"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
