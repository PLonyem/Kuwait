'use client';

import {CircleAlert} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect} from 'react';

import {Link} from '@/navigation';

export default function ErrorPage({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslations('errorPage');
  const locale = useLocale();

  useEffect(() => {console.error(error);}, [error]);

  return (
    <div className="grid min-h-[65vh] place-items-center bg-lightBg px-6 py-20 text-center">
      <div className="max-w-lg">
        <CircleAlert aria-hidden="true" className="mx-auto size-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('description')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="rounded-full bg-primary px-7 py-3 font-bold text-white outline-none transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-secondary/40">{t('retry')}</button>
          <Link href="/" locale={locale} className="rounded-full border-2 border-primary px-7 py-3 font-bold text-primary outline-none transition-colors hover:bg-primary hover:text-white focus-visible:ring-4 focus-visible:ring-primary/20">{t('home')}</Link>
        </div>
      </div>
    </div>
  );
}
