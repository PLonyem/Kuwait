import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {defineRouting} from 'next-intl/routing';

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always'
});

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;

  if (!requestedLocale || !isLocale(requestedLocale)) {
    notFound();
  }

  return {
    locale: requestedLocale,
    messages: (await import(`./messages/${requestedLocale}.json`)).default
  };
});
