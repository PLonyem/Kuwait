import type {Metadata} from 'next';
import {Cairo, Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
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
  const accessibility = await getTranslations({locale, namespace: 'accessibility'});
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
          <a
            href="#main-content"
            className="fixed start-3 top-3 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 font-bold text-white shadow-lg outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-secondary"
          >
            {accessibility('skipToContent')}
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
