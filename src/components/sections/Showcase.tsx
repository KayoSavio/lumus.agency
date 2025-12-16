"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "Neon Bank App",
        category: "Fintech",
        image: "/uploaded_image_0_1765433980729.png", // Using explicit user images if suitable, otherwise placeholders
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "AI Analytics",
        category: "Dashboard",
        image: "/uploaded_image_1_1765433980729.png",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Luxe Fashion",
        category: "E-Commerce",
        color: "from-amber-500 to-orange-600",
    },
    {
        title: "Crypto Exchange",
        category: "Web3",
        color: "from-emerald-500 to-green-600",
    },
];

export function Showcase() {
    return (
        <section id="showcase" className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lumus-purple/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                    Showcase <span className="text-gray-600">x</span> Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">

                                {/* Mockup Content (Abstract or Image) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                                {/* 3D Phone/Screen Mockup placeholder */}
                                <div className="absolute inset-x-12 bottom-0 h-[80%] bg-[#111] rounded-t-3xl border-t-8 border-x-8 border-[#222] shadow-2xl transform translate-y-20 transition-transform duration-700 group-hover:translate-y-10 group-hover:scale-105">
                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-[#050505] rounded-t-2xl overflow-hidden relative">
                                        {/* Placeholder UI */}
                                        <div className="absolute top-8 left-8 right-8 h-4 bg-white/10 rounded-full" />
                                        <div className="absolute top-20 left-8 right-32 h-32 bg-white/5 rounded-xl border border-white/5" />
                                        <div className="absolute top-20 right-8 w-20 h-32 bg-white/5 rounded-xl border border-white/5" />
                                        <div className="absolute top-60 left-8 right-8 h-64 bg-white/5 rounded-xl border border-white/5" />

                                        {/* Overlay Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 mix-blend-overlay`} />
                                    </div>
                                </div>

                                {/* Text Overlay */}
                                <div className="absolute top-8 left-8 z-20">
                                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                                    <p className="text-lumus-blue text-sm uppercase tracking-wider font-semibold">{project.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
