'use client';

import { type ReactNode } from 'react';
import Magnetic from './Magnetic';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
  className?: string;
};

/**
 * Pill button with a magnetic hover and a sweeping fill. Renders as <a> when an
 * href is given, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
}: Props) {
  const base =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-500';
  const styles =
    variant === 'solid'
      ? 'bg-gold text-void'
      : 'border border-bone/25 text-bone hover:border-gold';

  const sweep =
    variant === 'outline' ? (
      <span className="absolute inset-0 z-0 translate-y-full bg-gold transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
    ) : (
      <span className="absolute inset-0 z-0 translate-y-full bg-bone transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
    );

  const content = (
    <>
      {sweep}
      <span
        className={
          variant === 'outline'
            ? 'relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-void'
            : 'relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-void'
        }
      >
        {children}
      </span>
    </>
  );

  return (
    <Magnetic strength={0.5} className="inline-block">
      {href ? (
        <a href={href} className={`${base} ${styles} ${className}`}>
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={`${base} ${styles} ${className}`}
        >
          {content}
        </button>
      )}
    </Magnetic>
  );
}
