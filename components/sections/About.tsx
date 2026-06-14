'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/lib/data';
import { HIGGSFIELD } from '@/lib/assets';
import RevealText from '@/components/ui/RevealText';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Count-up stats when the block scrolls in.
      gsap.utils.toArray<HTMLElement>('[data-stat]').forEach((el) => {
        const end = Number(el.dataset.stat);
        const target = el.querySelector('[data-stat-num]')!;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: end,
              duration: 2,
              ease: 'power3.out',
              onUpdate: () => {
                target.textContent = String(Math.round(obj.v));
              },
            });
          },
        });
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      // Parallax + clip reveal of the ambient video.
      gsap.fromTo(
        videoWrapRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: videoWrapRef.current, start: 'top 85%', once: true },
        }
      );
      gsap.to('[data-about-video]', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-void px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — copy + counters */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow mb-8 text-gold">(About the studio)</p>
            <RevealText
              as="h2"
              className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-bone md:text-6xl"
            >
              We are a collective of designers, directors and engineers operating
              in the space between art and technology.
            </RevealText>
            <p className="mt-8 max-w-md text-bone-dim">
              Born in the dark, VOID Studio crafts identities and experiences with
              obsessive detail. We partner with a small number of ambitious brands
              each year — and treat every project as if it were our last.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-bone/10 pt-12">
            {stats.map((s) => (
              <div key={s.label} data-stat={s.value} className="flex flex-col">
                <div className="flex items-baseline font-serif text-5xl font-light text-bone md:text-7xl">
                  <span data-stat-num>0</span>
                  <span className="text-gold">{s.suffix}</span>
                </div>
                <span className="mt-3 text-xs uppercase tracking-[0.16em] text-bone-dim">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Higgsfield ambient video */}
        <div
          ref={videoWrapRef}
          className="relative h-[60vh] overflow-hidden rounded-lg lg:h-auto"
        >
          <video
            data-about-video
            className="absolute inset-0 h-[120%] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={HIGGSFIELD.about.local} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/20" />
          <div className="absolute bottom-6 left-6 max-w-[60%]">
            <p className="font-serif text-2xl italic text-bone">
              &ldquo;Light is just the absence of void.&rdquo;
            </p>
          </div>
          <div className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-bone-dim">
            Est. 2018
          </div>
        </div>
      </div>
    </section>
  );
}
