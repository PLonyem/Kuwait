import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import TrackStatus from '@/components/TrackStatus';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'track', '/track');
}

export default async function TrackPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  return <div className="pt-16 lg:pt-20"><TrackStatus locale={locale} /></div>;
}
