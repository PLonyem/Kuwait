'use client';

import {Bike, Bus, Car, Clock, MessageCircle, Tractor, Truck, type LucideIcon} from 'lucide-react';
import {motion} from 'framer-motion';
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
  const whatsappAriaLabel = t('cardWhatsappAriaLabel', {
    category: locale === 'ar' ? category.nameAr : category.nameEn
  });

  const selectedPrice =
    selectedResidency === 'citizen' ? category.citizenPrice : category.expatPrice;

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

      <div className="my-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          {t('priceLabel')}
        </p>
        <div aria-live="polite" aria-atomic="true">
          <motion.p
            key={selectedResidency}
            className="text-xl font-bold text-primary md:text-2xl"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2}}
          >
            {selectedPrice}
          </motion.p>
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
