"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { ArrowRight } from "lucide-react";
import RotatingText from "@/components/animations/RotatingText";
import GradientText from "@/components/animations/GradientText";
import MagneticButton from "@/components/animations/MagneticButton";
import TextScramble from "@/components/animations/TextScramble";
import LightRays from "@/components/effects/LightRays";

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
                        <span className="text-lumus-blue text-xs font-semibold tracking-wider uppercase">
                            <TextScramble
                                text="Future Agency"
                                speed={40}
                                delay={500}
                                className="font-sans"
                            />
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6">
                        LUMUS<GradientText
                            colors={['#00f597', '#64c6fc', '#d865f3']}
                            animationSpeed={5}
                            className="font-bold"
                        >.AGENCY</GradientText>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-4">
                        <RotatingText
                            texts={["Intelligence", "Design", "Future", "Revenue", "Scale"]}
                            mainClassName="text-white font-medium"
                            rotationInterval={2500}
                            staggerDuration={0.02}
                            staggerFrom="first"
                            splitBy="characters"
                        />
                        <span className="text-gray-500 mx-2">·</span>
                        <RotatingText
                            texts={["Automação", "Inovação", "Crescimento", "Tecnologia", "Resultados"]}
                            mainClassName="font-medium text-lumus-blue"
                            rotationInterval={2500}
                            staggerDuration={0.02}
                            staggerFrom="last"
                            splitBy="characters"
                        />
                    </h2>

                    <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10">
                        Transformamos empresas em{" "}
                        <GradientText
                            colors={['#00f597', '#64c6fc', '#d865f3']}
                            animationSpeed={6}
                        >
                            máquinas de crescimento digital
                        </GradientText>
                    </p>

                    <MagneticButton
                        magnetStrength={0.4}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:bg-lumus-blue hover:text-white"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Iniciar Projeto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-lumus-blue blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                    </MagneticButton>
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

