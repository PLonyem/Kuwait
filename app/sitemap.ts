import type {MetadataRoute} from 'next';

import {locales} from '@/i18n';
import {siteUrl} from '@/lib/seo';

const paths = ['', '/licenses', '/services', '/requirements', '/pricing', '/process', '/track', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority: path === '' ? 1 : path === '/licenses' ? 0.9 : path === '/track' ? 0.7 : 0.8,
    alternates: {
      languages: {
        ar: `${siteUrl}/ar${path}`,
        en: `${siteUrl}/en${path}`,
        'x-default': `${siteUrl}/ar${path}`
      }
    }
  })));
}
