'use client';

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** split granularity for the reveal */
  split?: 'words' | 'chars';
  /** delay between units */
  stagger?: number;
  delay?: number;
  /** play when scrolled into view (default) or immediately */
  trigger?: 'scroll' | 'immediate';
};

/**
 * Line-masked text reveal. Splits the text into lines + words (or chars) and
 * slides each unit up from behind a clipped line, driven by ScrollTrigger.
 */
export default function RevealText({
  children,
  as = 'div',
  className = '',
  split = 'words',
  stagger = 0.08,
  delay = 0,
  trigger = 'scroll',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let split_: SplitType | null = null;
    let st: ScrollTrigger | null = null;
    let killed = false;

    const run = () => {
      if (killed || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      split_ = new SplitType(ref.current, {
        types: split === 'chars' ? 'lines,words,chars' : 'lines,words',
        tagName: 'span',
      });

      // mask each line so units slide up from behind it
      (split_.lines ?? []).forEach((line) => {
        (line as HTMLElement).style.overflow = 'hidden';
        (line as HTMLElement).style.display = 'block';
      });

      const units =
        split === 'chars' ? split_.chars : split_.words;
      if (!units || !units.length) return;

      gsap.set(units, { yPercent: 115 });

      const tl = gsap.to(units, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger,
        delay,
        paused: trigger === 'scroll',
      });

      if (trigger === 'scroll') {
        st = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 85%',
          once: true,
          onEnter: () => tl.play(),
        });
      }
    };

    // wait for webfonts so line breaks are measured correctly
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      killed = true;
      st?.kill();
      split_?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createElement(as, { ref, className }, children);
}
