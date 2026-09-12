'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {useTranslations} from 'next-intl';

import PricingCard, {type PricingTier} from '@/components/PricingCard';
import {createWhatsAppUrl} from '@/lib/contact';

const tierKeys = ['essential', 'concierge', 'vip'] as const;

export function PricingGroup({title, tiers}: {title: string; tiers: PricingTier[]}) {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <section>
      <h2 className="mb-8 text-center text-2xl font-bold text-primary">{title}</h2>
      <div className="grid items-stretch gap-8 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div key={tier.name} className="h-full" initial={reduceMotion ? false : {opacity: 0, y: 18}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.15}} transition={{duration: 0.3, delay: reduceMotion ? 0 : index * 0.06}}>
            <PricingCard tier={tier} tierKey={tierKeys[index]} isPopular={index === 1} popularLabel={t('pricing.mostPopular')} ctaLabel={t('pricing.cta')} whatsappHref={whatsappHref} whatsappAriaLabel={t('whatsapp.ariaLabel')} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function PricingTable() {
  const t = useTranslations();
  const citizenTiers = t.raw('pricing.citizenTiers') as PricingTier[];
  const expatTiers = t.raw('pricing.expatTiers') as PricingTier[];

  return (
    <section className="w-full bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl">{t('pricing.title')}</h2>
        <PricingGroup title={t('pricing.citizens')} tiers={citizenTiers} />
        <div className="mt-16"><PricingGroup title={t('pricing.expatriates')} tiers={expatTiers} /></div>
        <p className="mt-8 text-center text-sm text-gray-500">{t('pricingTransparency.globalNote')}</p>
      </div>
    </section>
  );
}
