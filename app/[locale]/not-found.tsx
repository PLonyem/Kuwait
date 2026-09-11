'use client';

import {FileQuestion} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';

import {Link} from '@/navigation';

export default function NotFound() {
  const t = useTranslations('notFoundPage');
  const locale = useLocale();

  return (
    <div className="grid min-h-[65vh] place-items-center bg-lightBg px-6 py-20 text-center">
      <div className="max-w-lg">
        <FileQuestion aria-hidden="true" className="mx-auto size-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('description')}</p>
        <Link href="/" locale={locale} className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-bold text-white outline-none transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-secondary/40">{t('home')}</Link>
      </div>
    </div>
  );
}
