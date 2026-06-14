'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic custom cursor: an inner dot that tracks the pointer 1:1 and a larger
 * ring that trails with easing and swells over interactive elements. Disabled on
 * touch / coarse pointers, where the native behaviour is preferable.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let ringScale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor-hover]'
      ) as HTMLElement | null;
      if (target) {
        targetScale = 2.4;
        ring.classList.add('is-active');
        const text = target.getAttribute('data-cursor-label');
        label.textContent = text ?? '';
        label.style.opacity = text ? '1' : '0';
      } else {
        targetScale = 1;
        ring.classList.remove('is-active');
        label.style.opacity = '0';
      }
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      ringScale += (targetScale - ringScale) * 0.12;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-0 mix-blend-difference"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] flex h-10 w-10 items-center justify-center rounded-full border border-bone/40 opacity-0 transition-colors duration-300"
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="select-none text-[5px] font-medium uppercase tracking-[0.2em] text-bone opacity-0 transition-opacity"
        />
      </div>
    </>
  );
}
