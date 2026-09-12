'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import {createWhatsAppUrl} from '@/lib/contact';

import LicenseCategoryCard, {type LicenseCategory} from './LicenseCategoryCard';
import WhatsAppCTA from './WhatsAppCTA';

type Residency = 'citizen' | 'expat';

export default function LicenseCategoriesGrid() {
  const t = useTranslations('licenseCategories');
  const locale = useLocale() as 'ar' | 'en';
  const [selectedResidency, setSelectedResidency] = useState<Residency>('citizen');
  const categories = t.raw('categories') as LicenseCategory[];
  const helpUrl = createWhatsAppUrl(t('helpMessage'));
  const residencyOptions: Array<{value: Residency; label: string}> = [
    {value: 'citizen', label: t('toggleCitizen')},
    {value: 'expat', label: t('toggleExpat')}
  ];

  return (
    <section className="w-full bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-3xl text-center text-lg leading-8 text-gray-600">
          {t('subtitle')}
        </p>

        <div
          className="mb-12 flex justify-center gap-2"
          role="group"
          aria-label={t('title')}
        >
          {residencyOptions.map(({value, label}) => {
            const isActive = selectedResidency === value;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedResidency(value)}
                className={`rounded-full border px-6 py-2 font-semibold outline-none transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <LicenseCategoryCard
              key={category.id}
              category={category}
              locale={locale}
              selectedResidency={selectedResidency}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="text-lg font-semibold text-primary">{t('helpText')}</p>
          <WhatsAppCTA
            href={helpUrl}
            label={t('helpButton')}
            ariaLabel={t('helpText')}
          />
        </div>
      </div>
    </section>
  );
}
