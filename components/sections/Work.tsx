'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(-1);
  const activeRef = useRef(-1);

  // Floating cursor-following preview (desktop / fine pointer only).
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    const box = floatRef.current;
    if (!box) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      box.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll reveals per row.
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-work-row]').forEach((row) => {
        const title = row.querySelector('[data-work-title]');
        const meta = row.querySelector('[data-work-meta]');
        const line = row.querySelector('[data-work-line]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
        tl.from(line, { scaleX: 0, duration: 1, ease: 'expo.out' })
          .from(
            title,
            { yPercent: 110, duration: 1, ease: 'expo.out' },
            '-=0.8'
          )
          .from(
            meta,
            { y: 24, opacity: 0, duration: 0.8, ease: 'expo.out' },
            '-=0.7'
          );
      });

      // heading reveal
      gsap.from('[data-work-head]', {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-work-head]', start: 'top 90%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const setHover = (i: number) => {
    activeRef.current = i;
    setActive(i);
    const box = floatRef.current;
    if (box) {
      gsap.to(box, {
        scale: i >= 0 ? 1 : 0.6,
        autoAlpha: i >= 0 ? 1 : 0,
        duration: 0.5,
        ease: 'expo.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-void px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div className="overflow-hidden">
            <h2
              data-work-head
              className="font-serif text-6xl font-light leading-none tracking-tightest text-bone md:text-8xl"
            >
              Selected Work
            </h2>
          </div>
          <p className="max-w-xs text-sm text-bone-dim">
            <span className="text-gold">(03)</span> A glimpse into recent
            collaborations across branding, motion and the impossible.
          </p>
        </div>

        {/* Project rows */}
        <ul>
          {projects.map((p, i) => (
            <li key={p.index}>
              <a
                href="#contact"
                data-work-row
                data-cursor-hover
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                className="group relative block"
              >
                <div
                  data-work-line
                  className="h-px w-full origin-left bg-bone/15"
                />
                <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-10">
                  <div className="flex items-baseline gap-5 overflow-hidden md:gap-8">
                    <span className="font-sans text-sm text-gold">{p.index}</span>
                    <h3
                      data-work-title
                      className="font-serif text-[13vw] font-light leading-[0.95] tracking-tightest text-bone transition-colors duration-500 group-hover:text-gold md:text-[6.5vw]"
                    >
                      {p.title}
                    </h3>
                  </div>
                  <div
                    data-work-meta
                    className="flex items-center gap-6 pl-10 md:pl-0"
                  >
                    <span className="hidden text-xs uppercase tracking-[0.2em] text-bone-dim md:block">
                      {p.category}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-bone-dim">
                      {p.year}
                    </span>
                    <span className="text-bone transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-gold">
                      &#8599;
                    </span>
                  </div>
                </div>

                {/* Inline preview for touch / no-hover devices */}
                <div className="mb-8 overflow-hidden rounded-lg md:hidden">
                  <video
                    className="aspect-video w-full object-cover"
                    style={{ filter: p.grade }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={p.video} type="video/mp4" />
                  </video>
                </div>
              </a>
            </li>
          ))}
          <div data-work-line className="h-px w-full origin-left bg-bone/15" />
        </ul>
      </div>

      {/* Floating cursor-following video preview (desktop) */}
      <div
        ref={floatRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden aspect-video w-[clamp(280px,28vw,460px)] overflow-hidden rounded-lg opacity-0 shadow-2xl shadow-black/60 md:block"
        aria-hidden="true"
      >
        {projects.map((p, i) => (
          <video
            key={p.index}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{ filter: p.grade, opacity: active === i ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={p.video} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 ring-1 ring-inset ring-bone/15" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> View project
        </div>
      </div>
    </section>
  );
}
