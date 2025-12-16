"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Por que Lumus", href: "#about" },
    { name: "Serviços", href: "#services" },
    { name: "Portfolio", href: "#showcase" },
    { name: "Tecnologia", href: "#tech" },
    { name: "Contato", href: "#contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    scrolled
                        ? "bg-[#050505]/80 backdrop-blur-md border-white/10 py-4 shadow-lg shadow-purple-900/10"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/logoLumus.svg"
                            alt="Lumus Agency"
                            width={40}
                            height={40}
                            className="h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                        />
                        <span className="text-xl font-bold tracking-tight text-white">
                            lumus<span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">.agency</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-6 py-2 rounded-full border border-white/20 hover:border-lumus-blue/50 text-white text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(0,198,255,0.3)] hover:bg-white/5 active:scale-95"
                        >
                            Iniciar Projeto
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween" }}
                        className="fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center gap-8"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-lumus-blue transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
