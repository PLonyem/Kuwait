'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {Check, CheckCircle2, ChevronDown, XCircle} from 'lucide-react';
import {useId, useState} from 'react';
import {useTranslations} from 'next-intl';

import WhatsAppCTA from '@/components/WhatsAppCTA';

export type PricingTier = {
  name: string;
  price: string;
  timeline: string;
  features: string[];
};

type Fee = {item: string; amount: string};

type PricingCardProps = {
  tier: PricingTier;
  tierKey: 'essential' | 'concierge' | 'vip';
  isPopular: boolean;
  popularLabel: string;
  ctaLabel: string;
  whatsappHref: string;
  whatsappAriaLabel: string;
};

export default function PricingCard({
  tier,
  tierKey,
  isPopular,
  popularLabel,
  ctaLabel,
  whatsappHref,
  whatsappAriaLabel
}: PricingCardProps) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const included = t.raw(`pricingTransparency.tierIncluded.${tierKey}`) as string[];
  const notIncluded = t.raw('pricingTransparency.notIncluded') as string[];
  const governmentFees = t.raw('pricingTransparency.governmentFees') as Fee[];
  const panelId = useId();

  return (
    <article className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-md ${isPopular ? 'border-2 border-primary lg:scale-[1.03]' : 'border border-gray-100'}`}>
      {isPopular && <span className="absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{popularLabel}</span>}
      <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
      <p className="mt-4 text-3xl font-bold text-primary">{tier.price}</p>
      <p className="mt-2 text-sm text-gray-500">{tier.timeline}</p>

      <button
        type="button"
        className="mt-4 inline-flex min-h-11 items-center gap-1 self-start rounded-sm text-sm font-semibold text-primary underline underline-offset-4 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? t('pricingTransparency.collapseButton') : t('pricingTransparency.expandButton')}
        <ChevronDown aria-hidden="true" className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            className="overflow-hidden"
            initial={reduceMotion ? {opacity: 1} : {height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
            transition={{duration: reduceMotion ? 0 : 0.3}}
          >
            <div className="my-4 border-t border-gray-200 pt-4">
              <DetailList title={t('pricingTransparency.whatsIncluded')} items={included} tone="included" />
              <DetailList title={t('pricingTransparency.whatsNotIncluded')} items={notIncluded} tone="excluded" />
              <p className="mt-3 text-xs italic leading-5 text-gray-500">{t('pricingTransparency.governmentFeesNote')}</p>
              <h4 className="mb-2 mt-5 text-sm font-bold text-gray-700">{t('pricingTransparency.governmentFeesTitle')}</h4>
              <dl className="divide-y divide-gray-100 rounded-lg bg-lightBg px-3">
                {governmentFees.map((fee) => (
                  <div key={fee.item} className="flex justify-between gap-4 py-2 text-sm">
                    <dt className="text-gray-600">{fee.item}</dt>
                    <dd className="shrink-0 font-semibold text-gray-800">{fee.amount}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="my-6 h-px bg-gray-200" aria-hidden="true" />
      <ul className="mb-7 flex-1 space-y-3">
        {tier.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-gray-700"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.5} /><span>{feature}</span></li>)}
      </ul>
      <WhatsAppCTA href={whatsappHref} label={ctaLabel} ariaLabel={`${whatsappAriaLabel}: ${tier.name}`} className="w-full" />
    </article>
  );
}

function DetailList({title, items, tone}: {title: string; items: string[]; tone: 'included' | 'excluded'}) {
  const Icon = tone === 'included' ? CheckCircle2 : XCircle;
  return (
    <div className={tone === 'excluded' ? 'mt-5' : ''}>
      <h4 className={`mb-2 text-sm font-bold ${tone === 'included' ? 'text-primary' : 'text-red-700'}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-5 text-gray-600"><Icon aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${tone === 'included' ? 'text-primary' : 'text-gray-400'}`} /><span>{item}</span></li>)}
      </ul>
    </div>
  );
}
