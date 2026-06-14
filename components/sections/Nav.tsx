'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { useApp } from '@/components/providers/AppProvider';
import Magnetic from '@/components/ui/Magnetic';

export default function Nav() {
  const { loaded } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
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

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-7 flex-col justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-px w-full bg-bone transition-transform duration-300 ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-full bg-bone transition-transform duration-300 ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void px-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-6xl font-light tracking-tightest text-bone"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-12 text-sm uppercase tracking-[0.2em] text-gold"
            >
              hello@void.studio
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
