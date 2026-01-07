import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { FullscreenCanvas } from "@/components/effects/FullscreenCanvas";
import SplashCursor from "@/components/effects/SplashCursor";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMUS.AGENCY | Creative Tech & AI",
  description: "Infraestrutura digital para empresas em escala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${montserrat.variable} antialiased`}>
        {/* Splash Cursor effect */}
        <SplashCursor />

        {/* Fullscreen Three.js canvas */}
        <FullscreenCanvas />

        {/* Content over canvas */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
