import {notFound} from 'next/navigation';

import {isLocale, type Locale} from '@/i18n';

export type LocalePageProps = {
  params: Promise<{locale: string}>;
};

export async function getPageLocale(params: LocalePageProps['params']): Promise<Locale> {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}
