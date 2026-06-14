import { HIGGSFIELD } from './assets';

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  /** local video used as hover preview */
  video: string;
  /** CSS filter applied so reused clips read as distinct pieces */
  grade: string;
  tags: string[];
};

/*
 * Work — 3 showcase projects. With the free-plan budget we generated 2 master
 * clips (hero gold + about ink); the cards reuse them with distinct color grades
 * so each preview reads as its own piece. Drop dedicated clips into
 * /public/videos and repoint `video` to upgrade.
 */
export const projects: Project[] = [
  {
    index: '01',
    title: 'Aurum Reserve',
    category: 'Branding · 3D',
    year: '2026',
    video: HIGGSFIELD.hero.local,
    grade: 'saturate(1.1) contrast(1.05)',
    tags: ['Identity', 'Packaging', 'Motion'],
  },
  {
    index: '02',
    title: 'Nocturne',
    category: 'Motion · Digital',
    year: '2025',
    video: HIGGSFIELD.about.local,
    grade: 'invert(1) hue-rotate(8deg) contrast(1.15) brightness(1.05)',
    tags: ['Film', 'Web', 'Art Direction'],
  },
  {
    index: '03',
    title: 'Helios Protocol',
    category: 'AI · Digital',
    year: '2026',
    video: HIGGSFIELD.hero.local,
    grade: 'hue-rotate(-25deg) saturate(1.4) contrast(1.1)',
    tags: ['Generative', 'Product', '3D'],
  },
];

export type Service = {
  num: string;
  title: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    num: '01',
    title: 'Branding',
    description:
      'Identity systems engineered for permanence. Strategy, naming, art direction and the rigorous detail that makes a brand feel inevitable.',
    items: ['Strategy', 'Identity', 'Naming', 'Guidelines'],
  },
  {
    num: '02',
    title: 'Motion',
    description:
      'Frame-perfect storytelling. Title sequences, brand films and kinetic systems graded for the dark, the cinematic, the unforgettable.',
    items: ['Brand Films', 'Title Design', '2D / 3D', 'Sound'],
  },
  {
    num: '03',
    title: 'Digital',
    description:
      'Award-grade web experiences. WebGL, smooth scroll and interaction design built to perform as beautifully as they look.',
    items: ['Web Design', 'WebGL', 'Development', 'Interaction'],
  },
  {
    num: '04',
    title: '3D',
    description:
      'Photoreal and impossible in equal measure. Product visualisation, CGI environments and real-time worlds rendered without compromise.',
    items: ['Product CGI', 'Environments', 'Real-time', 'Look Dev'],
  },
  {
    num: '05',
    title: 'AI',
    description:
      'Generative pipelines as a creative instrument. We direct models the way a DOP directs light — toward a singular, intentional result.',
    items: ['R&D', 'Pipelines', 'Generative', 'Direction'],
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 120, suffix: '+', label: 'Projects shipped' },
  { value: 8, suffix: '', label: 'Years in the dark' },
  { value: 40, suffix: '', label: 'Global clients' },
];

export const marqueeItems = ['Branding', 'Motion', 'Digital', '3D', 'AI'];

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];
