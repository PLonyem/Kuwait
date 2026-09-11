import type {Metadata} from 'next';
import {headers} from 'next/headers';
import {Cairo, Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import {defaultLocale, isLocale} from '@/i18n';

import './globals.css';

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

export default async function RootLayout({
  children
}: Readonly<{children: ReactNode}>) {
  const requestedLocale =
    (await headers()).get('x-next-intl-locale') ?? defaultLocale;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const localeFont = locale === 'ar' ? 'font-arabic' : 'font-english';

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body className={localeFont}>{children}</body>
    </html>
  );
}
