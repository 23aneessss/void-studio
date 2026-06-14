'use client';

import { motion } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { useApp } from '@/components/providers/AppProvider';
import Magnetic from '@/components/ui/Magnetic';

export default function Nav() {
  const { loaded } = useApp();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={loaded ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Magnetic strength={0.4}>
          <a
            href="#top"
            className="font-serif text-2xl font-medium tracking-tight text-bone"
            data-cursor-hover
          >
            VOID<span className="align-super text-xs text-gold">®</span>
          </a>
        </Magnetic>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Magnetic strength={0.5}>
                <a
                  href={link.href}
                  data-cursor-hover
                  className="group relative text-sm uppercase tracking-[0.18em] text-bone"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-full" />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.4}>
          <a
            href="#contact"
            data-cursor-hover
            className="hidden text-sm uppercase tracking-[0.18em] text-bone md:inline-block"
          >
            Let&apos;s talk
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
