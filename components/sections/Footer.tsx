'use client';

import { useApp } from '@/components/providers/AppProvider';

export default function Footer() {
  const { lenis } = useApp();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-void px-6 pb-10 pt-4 md:px-10">
      {/* Oversized wordmark */}
      <div className="border-t border-bone/10 pt-8">
        <h2 className="select-none text-center font-serif text-[24vw] font-light leading-[0.8] tracking-tightest text-stroke">
          VOID
        </h2>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-bone-dim md:flex-row">
        <span>&copy; {new Date().getFullYear()} VOID Studio. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          Crafted in the dark
        </span>
        <button
          type="button"
          onClick={toTop}
          data-cursor-hover
          className="group flex items-center gap-2 uppercase tracking-[0.16em] text-bone transition-colors hover:text-gold"
        >
          Back to top
          <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            &#8593;
          </span>
        </button>
      </div>
    </footer>
  );
}
