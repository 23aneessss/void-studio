/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#080808',
          900: '#080808',
          800: '#0e0e0e',
          700: '#141414',
          600: '#1c1c1c',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C97A',
          dark: '#9C7F31',
        },
        bone: {
          DEFAULT: '#F5F5F0',
          dim: '#A8A8A2',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        '11xl': ['13rem', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        grain: 'grain-shift 0.6s steps(2) infinite',
      },
    },
  },
  plugins: [],
};
