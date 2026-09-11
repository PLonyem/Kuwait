'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Check} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';

type PricingTier = {
  name: string;
  price: string;
  timeline: string;
  features: string[];
};

type PricingGroupProps = {
  title: string;
  tiers: PricingTier[];
  popularLabel: string;
  ctaLabel: string;
  whatsappHref: string;
  whatsappAriaLabel: string;
  reduceMotion: boolean | null;
};

function PricingGroup({
  title,
  tiers,
  popularLabel,
  ctaLabel,
  whatsappHref,
  whatsappAriaLabel,
  reduceMotion
}: PricingGroupProps) {
  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-semibold text-primary">{title}</h3>
      <div className="grid items-stretch gap-8 lg:grid-cols-3">
        {tiers.map((tier, index) => {
          const isPopular = index === 1;

          return (
            <motion.article
              key={tier.name}
              className={`relative flex h-full flex-col rounded-xl bg-white p-6 shadow-md ${
                isPopular ? 'border-2 border-primary lg:scale-[1.04]' : 'border border-gray-100'
              }`}
              initial={reduceMotion ? false : {opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, delay: reduceMotion ? 0 : index * 0.08}}
            >
              {isPopular && (
                <span className="absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  {popularLabel}
                </span>
              )}

              <h4 className="text-xl font-bold text-gray-800">{tier.name}</h4>
              <p className="mt-4 text-3xl font-bold text-primary">{tier.price}</p>
              <p className="mt-2 text-sm text-gray-500">{tier.timeline}</p>

              <div className="my-6 h-px bg-gray-200" aria-hidden="true" />

              <ul className="mb-7 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary"
                      strokeWidth={2.5}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ctaLabel} — ${tier.name}. ${whatsappAriaLabel}`}
                className={`block rounded-full px-5 py-3 text-center font-bold outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 ${
                  isPopular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
                whileHover={reduceMotion ? undefined : {scale: 1.03}}
                whileTap={reduceMotion ? undefined : {scale: 0.98}}
              >
                {ctaLabel}
              </motion.a>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export default function PricingTable() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const citizenTiers = t.raw('pricing.citizenTiers') as PricingTier[];
  const expatTiers = t.raw('pricing.expatTiers') as PricingTier[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));
  const sharedProps = {
    popularLabel: t('pricing.mostPopular'),
    ctaLabel: t('pricing.cta'),
    whatsappHref,
    whatsappAriaLabel: t('whatsapp.ariaLabel'),
    reduceMotion
  };

  return (
    <section className="w-full bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('pricing.title')}
        </motion.h2>

        <PricingGroup title={t('pricing.citizens')} tiers={citizenTiers} {...sharedProps} />

        <div className="mt-16">
          <PricingGroup
            title={t('pricing.expatriates')}
            tiers={expatTiers}
            {...sharedProps}
          />
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">{t('pricing.note')}</p>
      </div>
    </section>
  );
}
