'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AppState = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  lenis: Lenis | null;
};

const AppContext = createContext<AppState>({
  loaded: false,
  setLoaded: () => {},
  lenis: null,
});

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      // Respect the user's preference: no momentum scrolling.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Until the loader finishes, hold the page still at the top.
    lenis.stop();
    window.scrollTo(0, 0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Release the scroll lock once the loader has completed.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (loaded) {
      lenis.start();
      // Layout has shifted as the loader unmounts — recalc triggers.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      lenis.stop();
    }
  }, [loaded]);

  return (
    <AppContext.Provider value={{ loaded, setLoaded, lenis: lenisRef.current }}>
      {children}
    </AppContext.Provider>
  );
}
