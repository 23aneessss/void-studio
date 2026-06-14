'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useApp } from '@/components/providers/AppProvider';

export default function Loader() {
  const { setLoaded } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline();

      // Intro of the wordmark
      tl.from(wordRef.current, {
        yPercent: 120,
        duration: 1,
        ease: 'expo.out',
      });

      // Progress 0 → 100
      tl.to(
        counter,
        {
          v: 100,
          duration: 2.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            const val = Math.round(counter.v);
            if (numRef.current) numRef.current.textContent = String(val);
            if (barRef.current)
              gsap.set(barRef.current, { scaleX: counter.v / 100 });
          },
        },
        '-=0.4'
      );

      // Exit — lift the wordmark, then wipe the panel up
      tl.to(wordRef.current, {
        yPercent: -120,
        duration: 0.8,
        ease: 'expo.inOut',
      });
      tl.to(
        [numRef.current?.parentElement, barRef.current?.parentElement],
        { autoAlpha: 0, duration: 0.4, ease: 'power2.out' },
        '<'
      );
      tl.to(
        rootRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {
            setHidden(true);
            setLoaded(true);
          },
        },
        '-=0.2'
      );
    }, rootRef);

    return () => ctx.revert();
  }, [setLoaded]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <div ref={wordRef} className="flex items-baseline gap-3">
          <span className="font-serif text-[18vw] leading-none tracking-tightest text-bone md:text-[12vw]">
            VOID
          </span>
        </div>
      </div>

      <div className="eyebrow absolute left-6 top-6 text-bone-dim md:left-10 md:top-10">
        Entering the void
      </div>

      <div className="absolute bottom-6 right-6 font-sans text-sm text-bone-dim md:bottom-10 md:right-10">
        <span ref={numRef} className="tabular-nums text-bone">
          0
        </span>
        <span className="text-gold">%</span>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-bone/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gold"
        />
      </div>
    </div>
  );
}
