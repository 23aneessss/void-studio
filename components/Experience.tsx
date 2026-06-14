'use client';

import { AppProvider } from '@/components/providers/AppProvider';
import Loader from '@/components/ui/Loader';
import Cursor from '@/components/ui/Cursor';
import Grain from '@/components/ui/Grain';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Work from '@/components/sections/Work';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Experience() {
  return (
    <AppProvider>
      <Loader />
      <Cursor />
      <Grain />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
