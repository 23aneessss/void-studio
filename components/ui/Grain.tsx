'use client';

/**
 * Full-screen animated film-grain. An inline fractal-noise SVG is tiled and
 * jittered via the `animate-grain` keyframes for an analog, cinematic texture.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export default function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.06] mix-blend-overlay"
      aria-hidden="true"
    >
      <div
        className="animate-grain absolute -inset-[50%] h-[200%] w-[200%]"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
