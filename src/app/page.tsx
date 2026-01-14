import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Tech } from "@/components/sections/Tech";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-lumus-blue selection:text-black">
      <Navbar />
      <Hero />
      <Journey />
      <About />
      <Services />
      {/* <Showcase /> */}
      <Tech />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

