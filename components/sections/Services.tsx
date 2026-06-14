'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/lib/data';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Horizontal pinned scroll on tablet/desktop.
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current!;
        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top top',
            end: () => '+=' + getDistance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        // gentle parallax on each panel's inner content
        gsap.utils.toArray<HTMLElement>('[data-svc-panel]').forEach((panel) => {
          const inner = panel.querySelector('[data-svc-inner]');
          gsap.fromTo(
            inner,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-void-800">
      {/* Sticky header overlay */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 w-full px-6 pt-10 md:px-10 md:pt-12">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-gold">What we do</p>
          <p className="eyebrow text-bone-dim">Services / 05</p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex min-h-[100svh] w-full flex-col md:w-max md:flex-row md:items-center"
      >
        {/* Intro panel */}
        <div className="flex w-full shrink-0 items-center px-6 py-24 md:h-[100svh] md:w-[60vw] md:px-16 md:py-0 lg:w-[42vw]">
          <h2 className="font-serif text-6xl font-light leading-[0.95] tracking-tightest text-bone md:text-8xl">
            Capabilities
            <span className="text-gold">.</span>
          </h2>
        </div>

        {services.map((s) => (
          <article
            key={s.num}
            data-svc-panel
            className="flex w-full shrink-0 items-center border-t border-bone/10 px-6 py-20 md:h-[100svh] md:w-[55vw] md:border-l md:border-t-0 md:px-16 md:py-0 lg:w-[40vw]"
          >
            <div data-svc-inner className="w-full">
              <span className="font-sans text-sm text-gold">{s.num} / 05</span>
              <h3 className="mt-6 font-serif text-7xl font-light leading-none tracking-tightest text-bone md:text-[7vw]">
                {s.title}
              </h3>
              <p className="mt-8 max-w-md text-base leading-relaxed text-bone-dim">
                {s.description}
              </p>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-bone"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 z-20 hidden h-px w-full bg-bone/10 md:block">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gold"
        />
      </div>
    </section>
  );
}
