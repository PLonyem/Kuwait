import type {Metadata} from 'next';
import {Cairo, Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import {isLocale, locales} from '@/i18n';

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

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const localeFont = locale === 'ar' ? 'font-arabic' : 'font-english';

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body className={localeFont}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
