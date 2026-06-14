import type { Metadata, Viewport } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import './globals.css';

/*
 * Brand fonts are Editorial New (serif) + Neue Montreal (sans), which are
 * commercial (PangramPangram). We substitute closely-matched open fonts here so
 * the project is deploy-ready out of the box:
 *   - Fraunces      → Editorial New  (high-contrast editorial serif)
 *   - Space Grotesk → Neue Montreal  (neo-grotesque sans)
 * To use the real fonts, drop the .woff2 files in /public/fonts and swap these
 * for next/font/local — the CSS variables (--font-serif / --font-sans) stay the same.
 */
const serif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://void.studio'),
  title: 'VOID Studio — We Craft The Impossible',
  description:
    'VOID Studio is a dark luxury creative agency crafting branding, motion, digital, 3D and AI-driven experiences for visionary brands.',
  keywords: [
    'creative agency',
    'branding',
    'motion design',
    '3D',
    'digital',
    'AI',
    'luxury',
  ],
  authors: [{ name: 'VOID Studio' }],
  openGraph: {
    title: 'VOID Studio — We Craft The Impossible',
    description:
      'A dark luxury creative agency. Branding · Motion · Digital · 3D · AI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOID Studio — We Craft The Impossible',
    description: 'A dark luxury creative agency. Branding · Motion · Digital · 3D · AI.',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-void text-bone font-sans antialiased">{children}</body>
    </html>
  );
}
