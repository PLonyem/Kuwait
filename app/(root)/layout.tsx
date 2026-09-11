import type {Metadata} from 'next';
import {Cairo, Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'optional'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://taysir.com'),
  title: 'Taysir Licensing',
  description: 'Kuwait driving license concierge service',
  alternates: {
    canonical: 'https://taysir.com/ar',
    languages: {
      ar: 'https://taysir.com/ar',
      en: 'https://taysir.com/en',
      'x-default': 'https://taysir.com/ar'
    }
  },
  icons: {icon: '/favicon.ico', apple: '/apple-touch-icon.png'}
};

export default function RootRedirectLayout({
  children
}: Readonly<{children: ReactNode}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body className="font-arabic">{children}</body>
    </html>
  );
}
