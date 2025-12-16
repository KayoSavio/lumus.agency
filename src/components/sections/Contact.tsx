"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { ProjectBriefWizard } from "@/components/features/ProjectBriefWizard";

export function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lumus-blue/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lumus-blue to-lumus-purple" />

                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Vamos construir o futuro.</h2>
                        <p className="text-gray-400">Conte-nos sobre seu projeto. Nós cuidamos do resto.</p>
                    </div>

                    <ProjectBriefWizard />
                </div>
            </div>
        </section>
    );
}
