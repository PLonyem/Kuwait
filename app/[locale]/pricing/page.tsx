import type {Metadata} from 'next';
import {Banknote, Building2, Check, CreditCard} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import type {PricingTier} from '@/components/PricingCard';
import {PricingGroup} from '@/components/PricingTable';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type AddOn = {service: string; citizens: string; expatriates: string; timeline: string};

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'pricing', '/pricing');
}

export default async function PricingPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const citizenTiers = t.raw('pricing.citizenTiers') as PricingTier[];
  const expatTiers = t.raw('pricing.expatTiers') as PricingTier[];
  const addOns = t.raw('pricingPage.addOns') as AddOn[];
  const governmentFees = t.raw('pricingPage.governmentFees') as string[];
  const paymentMethods = t.raw('pricingPage.paymentMethods') as string[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));
  const paymentIcons = [CreditCard, Building2, Banknote];

  return (
    <div className="bg-lightBg px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <PageHeader title={t('pricingPage.title')} subtitle={t('pricingPage.subtitle')} />
        <PricingGroup title={t('pricing.citizens')} tiers={citizenTiers} />
        <div className="mt-20"><PricingGroup title={t('pricing.expatriates')} tiers={expatTiers} /></div>
        <p className="mt-8 text-center text-sm text-gray-500">{t('pricingTransparency.globalNote')}</p>

        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-primary">{t('pricingPage.addOnsTitle')}</h2>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="w-full min-w-[680px] border-collapse text-start">
              <thead className="bg-primary text-white"><tr>{(['service', 'citizens', 'expatriates', 'timeline'] as const).map((key) => <th key={key} scope="col" className="px-5 py-4 text-start font-bold">{t(`pricingPage.table.${key}`)}</th>)}</tr></thead>
              <tbody>{addOns.map((row, index) => <tr key={row.service} className={index % 2 ? 'bg-lightBg/70' : 'bg-white'}><th scope="row" className="px-5 py-4 text-start font-semibold text-gray-800">{row.service}</th><td className="px-5 py-4 text-gray-700">{row.citizens}</td><td className="px-5 py-4 text-gray-700">{row.expatriates}</td><td className="px-5 py-4 text-gray-700">{row.timeline}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl bg-accent/30 p-6 sm:p-8"><h2 className="text-2xl font-bold text-primary">{t('pricingPage.governmentTitle')}</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{governmentFees.map((fee) => <li key={fee} className="flex items-start gap-2 text-gray-700"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" /><span>{fee}</span></li>)}</ul><p className="mt-6 text-sm font-semibold text-gray-600">{t('pricingPage.governmentNote')}</p></div>
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8"><h2 className="text-2xl font-bold text-primary">{t('pricingPage.paymentTitle')}</h2><ul className="mt-6 space-y-4">{paymentMethods.map((method, index) => {const Icon = paymentIcons[index]; return <li key={method} className="flex items-center gap-3 text-lg text-gray-700"><Icon aria-hidden="true" className="size-6 text-primary" /><span>{method}</span></li>;})}</ul></div>
        </section>

        <div className="mt-16 text-center"><p className="mb-6 text-xl font-bold text-primary">{t('pricingPage.finalCta')}</p><WhatsAppCTA href={whatsappHref} label={t('pricing.cta')} ariaLabel={t('whatsapp.ariaLabel')} /></div>
      </div>
    </div>
  );
}
