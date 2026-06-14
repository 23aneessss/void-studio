'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { marqueeItems } from '@/lib/data';

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-velocity skew: the strip leans into fast scrolling.
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const skewSetter = gsap.quickTo(trackRef.current, 'skewX', {
        duration: 0.5,
        ease: 'power3',
      });
      const xSetter = gsap.quickTo(sectionRef.current, 'x', {
        duration: 0.6,
        ease: 'power3',
      });
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity();
          skewSetter(gsap.utils.clamp(-12, 12, v / 220));
          xSetter(gsap.utils.clamp(-80, 80, -v / 60));
        },
      });
      return () => st.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const Strip = () => (
    <div className="flex shrink-0 items-center">
      {marqueeItems.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="px-8 font-serif text-[8vw] font-light uppercase leading-none tracking-tight text-bone md:text-[5.5vw]">
            {item}
          </span>
          <span className="text-[5vw] text-gold md:text-[3vw]">&middot;</span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-bone/10 bg-void py-10 md:py-14"
      aria-label="Disciplines"
    >
      <div ref={trackRef} className="flex w-max animate-marquee will-change-transform">
        <Strip />
        <Strip />
      </div>
    </section>
  );
}
