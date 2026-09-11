'use client';

import {useTranslations} from 'next-intl';

export default function Loading() {
  const t = useTranslations('loading');
  return <div className="grid min-h-[55vh] place-items-center bg-white"><div role="status"><span className="block size-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" /><span className="sr-only">{t('label')}</span></div></div>;
}
