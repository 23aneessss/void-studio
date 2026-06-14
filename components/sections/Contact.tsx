'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const idleTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle idle wobble of the turbulence frequency.
      idleTween.current = gsap.to(turbRef.current, {
        attr: { baseFrequency: '0.006 0.012' },
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Reveal the headline lines.
      gsap.from('[data-contact-line] > span', {
        yPercent: 115,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });

      gsap.from('[data-contact-foot]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-contact-foot]', start: 'top 92%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const distort = (on: boolean) => {
    gsap.to(dispRef.current, {
      attr: { scale: on ? 34 : 0 },
      duration: on ? 0.5 : 0.9,
      ease: on ? 'power2.out' : 'elastic.out(1, 0.4)',
    });
    gsap.to(turbRef.current, {
      attr: { baseFrequency: on ? '0.02 0.035' : '0.006 0.01' },
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void px-6 py-20 md:px-10 md:py-24"
    >
      {/* hidden SVG filter */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="contact-distort">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.006 0.01"
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="flex items-start justify-between">
        <p className="eyebrow text-gold">(Contact)</p>
        <p className="hidden max-w-[14rem] text-right text-sm text-bone-dim md:block">
          Currently accepting a limited number of projects for 2026.
        </p>
      </div>

      {/* Distortion headline */}
      <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
        <a
          href="mailto:hello@void.studio"
          data-cursor-hover
          data-cursor-label="Email"
          onMouseEnter={() => distort(true)}
          onMouseLeave={() => distort(false)}
          className="block"
        >
          <h2
            className="font-serif font-light leading-[0.85] tracking-tightest text-bone"
            style={{ filter: 'url(#contact-distort)' }}
          >
            <span data-contact-line className="block overflow-hidden">
              <span className="inline-block text-[16vw] md:text-[13vw]">
                Let&rsquo;s create
              </span>
            </span>
            <span data-contact-line className="block overflow-hidden">
              <span className="inline-block text-[16vw] italic text-gold md:text-[13vw]">
                the impossible
              </span>
            </span>
          </h2>
        </a>

        <div className="mt-12">
          <Magnetic strength={0.5}>
            <a
              href="mailto:hello@void.studio"
              data-cursor-hover
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-bone/25 px-9 py-4 text-sm font-medium uppercase tracking-[0.18em] text-bone"
            >
              <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-void">
                hello@void.studio
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Footer row */}
      <div
        data-contact-foot
        className="flex flex-col gap-6 border-t border-bone/10 pt-8 md:flex-row md:items-end md:justify-between"
      >
        <div className="flex flex-col gap-1">
          <span className="eyebrow text-bone-dim">Studio</span>
          <span className="text-bone">Berlin — New York — Tokyo</span>
        </div>
        <div className="flex gap-8">
          {['Instagram', 'Behance', 'LinkedIn', 'X'].map((s) => (
            <a
              key={s}
              href="#"
              data-cursor-hover
              className="group relative text-sm uppercase tracking-[0.16em] text-bone-dim transition-colors hover:text-bone"
            >
              {s}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out-expo group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
