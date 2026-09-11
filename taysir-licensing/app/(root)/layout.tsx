import type {Metadata} from 'next';
import {Cairo, Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import '../globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Taysir Licensing',
  description: 'Kuwait driving license concierge service'
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
