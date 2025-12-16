"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-lumus-blue/30 bg-lumus-blue/5 mb-6 backdrop-blur-sm">
                        <span className="text-lumus-blue text-xs font-semibold tracking-wider uppercase">Future Agency</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6">
                        LUMUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">.AGENCY</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-10">
                        Intelligence. Design. Future. <br />
                        <span className="text-white/60">Soluções modernas em tecnologia, branding e automação.</span>
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:bg-lumus-blue hover:text-white"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Iniciar Projeto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-lumus-blue blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-[40px] bg-gradient-to-b from-transparent via-white/50 to-transparent"
            />
        </section>
    );
}
