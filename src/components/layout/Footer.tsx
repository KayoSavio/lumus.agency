import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 relative overflow-hidden">
            {/* Glow behind */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lumus-blue/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div>
                        <Link href="/" className="flex items-center gap-2 group mb-4">
                            <Image
                                src="/logoLumus.svg"
                                alt="Lumus Agency"
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="text-xl font-bold tracking-tight text-white">
                                LUMUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-lumus-green via-lumus-blue to-lumus-purple">.AGENCY</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm">Construindo o futuro digital hoje.</p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 text-sm text-gray-500">
                    <p>© 2024 Lumus Agency. Todos os direitos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
