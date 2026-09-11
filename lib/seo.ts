import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import type {Locale} from '@/i18n';

export const siteUrl = 'https://taysir.com';

export async function createPageMetadata(
  locale: Locale,
  page: 'home' | 'services' | 'requirements' | 'pricing' | 'process' | 'about' | 'contact',
  pathname = ''
): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: `metadata.${page}`});
  const title = t('title');
  const description = t('description');
  const localizedPath = `/${locale}${pathname}`;
  const alternatePath = pathname || '';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${localizedPath}`,
      languages: {
        ar: `${siteUrl}/ar${alternatePath}`,
        en: `${siteUrl}/en${alternatePath}`,
        'x-default': `${siteUrl}/ar${alternatePath}`
      }
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}${localizedPath}`,
      siteName: 'Taysir Licensing',
      locale: locale === 'ar' ? 'ar_KW' : 'en_KW',
      alternateLocale: locale === 'ar' ? ['en_KW'] : ['ar_KW'],
      title,
      description,
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Taysir Licensing'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/og-image.jpg`]
    }
  };
}
