"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const techs = [
    { name: "Next.js", color: "text-white", border: "group-hover:border-white/50", shadow: "group-hover:shadow-white/20" },
    { name: "TypeScript", color: "text-blue-400", border: "group-hover:border-blue-400/50", shadow: "group-hover:shadow-blue-400/20" },
    { name: "Three.js", color: "text-gray-300", border: "group-hover:border-gray-300/50", shadow: "group-hover:shadow-gray-300/20" },
    { name: "Supabase", color: "text-emerald-400", border: "group-hover:border-emerald-400/50", shadow: "group-hover:shadow-emerald-400/20" },
    { name: "n8n", color: "text-orange-500", border: "group-hover:border-orange-500/50", shadow: "group-hover:shadow-orange-500/20" },
    { name: "Node.js", color: "text-green-500", border: "group-hover:border-green-500/50", shadow: "group-hover:shadow-green-500/20" },
    { name: "Vue", color: "text-emerald-500", border: "group-hover:border-emerald-500/50", shadow: "group-hover:shadow-emerald-500/20" },
];

export function Tech() {
    return (
        <section id="tech" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">Tech Stack</span> Enterprise
                </h2>
                <p className="text-gray-400 text-center text-sm mb-12">Infraestrutura de nível mundial para performance e escala</p>

                <div className="flex flex-wrap justify-center gap-6">
                    {techs.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ filter: "blur(10px)", opacity: 0, scale: 0.8 }}
                            whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative px-8 py-4 bg-[#111] rounded-xl border border-white/5 transition-all duration-300",
                                tech.border,
                                "hover:-translate-y-1 hover:shadow-lg",
                                tech.shadow
                            )}
                        >
                            <span className={cn("font-bold text-lg", tech.color)}>{tech.name}</span>
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity bg-current", tech.color)} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
