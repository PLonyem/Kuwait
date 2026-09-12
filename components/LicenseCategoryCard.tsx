'use client';

import {Bike, Bus, Car, Clock, MessageCircle, Tractor, Truck, type LucideIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';

export type LicenseCategory = {
  id: string;
  icon: 'Car' | 'Truck' | 'Bus' | 'Bike' | 'Tractor';
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  citizenPrice: string;
  expatPrice: string;
  timeline: string;
  whatsappMessage: string;
};

type LicenseCategoryCardProps = {
  category: LicenseCategory;
  locale: 'ar' | 'en';
  selectedResidency?: 'citizen' | 'expat';
};

const categoryIcons: Record<LicenseCategory['icon'], LucideIcon> = {
  Car,
  Truck,
  Bus,
  Bike,
  Tractor
};

export default function LicenseCategoryCard({
  category,
  locale,
  selectedResidency = 'citizen'
}: LicenseCategoryCardProps) {
  const t = useTranslations('licenseCategories');
  const Icon = categoryIcons[category.icon] ?? Car;
  const residencyText =
    selectedResidency === 'citizen' ? t('toggleCitizen') : t('toggleExpat');
  const message = `${category.whatsappMessage}. ${residencyText}.`;
  const whatsappUrl = createWhatsAppUrl(message);
  const whatsappAriaLabel =
    locale === 'ar'
      ? `أرسل رسالة واتساب لـ ${category.nameAr}`
      : `Send a WhatsApp message for ${category.nameEn}`;

  const prices = [
    {
      residency: 'citizen' as const,
      label: t('citizenLabel'),
      value: category.citizenPrice
    },
    {
      residency: 'expat' as const,
      label: t('expatLabel'),
      value: category.expatPrice
    }
  ];

  return (
    <article
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="flex h-full flex-col rounded-xl border border-transparent bg-white p-6 shadow-md transition-all duration-300 hover:border-primary hover:shadow-lg"
    >
      <Icon aria-hidden="true" className="size-12 text-primary" strokeWidth={1.7} />

      <h3 lang="ar" dir="rtl" className="mt-4 text-xl font-bold text-primary">
        {category.nameAr}
      </h3>
      <p lang="en" dir="ltr" className="mt-1 text-start text-sm text-gray-500">
        {category.nameEn}
      </p>

      <div aria-hidden="true" className="my-4 border-t border-gray-200" />

      <p className="min-h-[4.5rem] text-sm leading-6 text-gray-600">
        {locale === 'ar' ? category.descriptionAr : category.descriptionEn}
      </p>

      <div aria-hidden="true" className="my-4 border-t border-gray-200" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {t('priceLabel')}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {prices.map(({residency, label, value}) => {
            const isSelected = residency === selectedResidency;

            return (
              <div
                key={residency}
                className={`rounded-lg p-2 ${isSelected ? 'bg-lightBg' : ''}`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 font-bold text-primary">{value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 text-sm text-gray-600">
        <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          <span className="font-semibold">{t('timelineLabel')}:</span>{' '}
          <span>{category.timeline}</span>
        </p>
      </div>

      <div className="flex-grow" />

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsappAriaLabel}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-5 py-3 font-bold text-gray-900 shadow-sm outline-none transition duration-200 hover:scale-[1.02] hover:shadow-md focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
      >
        <MessageCircle aria-hidden="true" className="size-5 shrink-0" />
        <span>{t('whatsappButton')}</span>
      </a>
    </article>
  );
}
