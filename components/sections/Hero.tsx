'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '@/components/providers/AppProvider';
import { HIGGSFIELD } from '@/lib/assets';

// WebGL hero is client-only (needs WebGL context) — skip SSR.
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
});

const HEADLINE = [
  ['WE', 'CRAFT'],
  ['THE', 'IMPOSSIBLE'],
];

export default function Hero() {
  const { loaded } = useApp();
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  // Intro timeline — fires once the loader has lifted.
  useEffect(() => {
    if (!loaded || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('[data-hero-eyebrow]', { yPercent: 120, opacity: 0, duration: 1 })
        .from(
          '[data-hero-word]',
          { yPercent: 115, duration: 1.2, stagger: 0.12 },
          '-=0.7'
        )
        .from(
          '[data-hero-sub]',
          { y: 30, opacity: 0, duration: 1 },
          '-=0.8'
        )
        .from(
          '[data-hero-cta]',
          { y: 30, opacity: 0, duration: 1 },
          '-=0.85'
        )
        .from(
          '[data-hero-scroll]',
          { opacity: 0, duration: 1 },
          '-=0.5'
        );
    }, rootRef);
    return () => ctx.revert();
  }, [loaded]);

  // Parallax + fade of the media layer as the hero scrolls away.
  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 22,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to('[data-hero-content]', {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Media stack: WebGL distortion base + Higgsfield video texture */}
      <div ref={mediaRef} className="absolute inset-0 h-full w-full">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
          poster={HIGGSFIELD.poster.local}
        >
          <source src={HIGGSFIELD.hero.local} type="video/mp4" />
        </video>
      </div>

      {/* Legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,8,8,0.7)_100%)]" />

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center px-6 text-center"
      >
        <div className="overflow-hidden">
          <p data-hero-eyebrow className="eyebrow text-gold">
            VOID Studio — Creative Agency
          </p>
        </div>

        <h1 className="mt-6 font-serif font-light leading-[0.86] tracking-tightest text-bone">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <span className="inline-block">
                {line.map((word, wi) => (
                  <span key={wi} className="inline-block overflow-hidden">
                    <span
                      data-hero-word
                      className="inline-block text-[15vw] leading-[0.86] md:text-[11vw] lg:text-[10rem]"
                    >
                      {word}
                      {wi < line.length - 1 ? ' ' : ''}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-xl text-balance text-base text-bone-dim md:text-lg"
        >
          A dark luxury studio engineering branding, motion, digital, 3D and AI
          experiences for brands that refuse the ordinary.
        </p>

        <div data-hero-cta className="mt-10 flex items-center gap-6">
          <a
            href="#work"
            data-cursor-hover
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-void"
          >
            <span className="absolute inset-0 translate-y-full bg-bone transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
            <span className="relative z-10">View the work</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow text-bone-dim">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-bone/20">
          <span className="absolute left-0 top-0 h-1/2 w-full animate-[scrollLine_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
    </section>
  );
}
