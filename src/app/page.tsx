import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Tech } from "@/components/sections/Tech";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-lumus-blue selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Showcase />
      <Tech />
      <Contact />
      <Footer />
    </main>
  );
}
