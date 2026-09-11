'use client';

import {useLocale, useTranslations} from 'next-intl';

import {Link, usePathname} from '@/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('language');

  return (
    <div
      className="flex items-center gap-2 whitespace-nowrap font-semibold"
      aria-label={t('switcherLabel')}
    >
      <Link
        href={pathname}
        locale="ar"
        aria-current={locale === 'ar' ? 'true' : undefined}
        className={`rounded-sm px-1 py-1 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-secondary ${
          locale === 'ar' ? 'text-primary' : 'text-text/65'
        }`}
        aria-label={t('arabicAriaLabel')}
      >
        {t('arabic')}
      </Link>
      <span className="text-text/30" aria-hidden="true">
        |
      </span>
      <Link
        href={pathname}
        locale="en"
        aria-current={locale === 'en' ? 'true' : undefined}
        className={`rounded-sm px-1 py-1 font-english outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-secondary ${
          locale === 'en' ? 'text-primary' : 'text-text/65'
        }`}
        aria-label={t('englishAriaLabel')}
      >
        {t('english')}
      </Link>
    </div>
  );
}
