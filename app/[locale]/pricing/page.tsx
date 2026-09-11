import type {Metadata} from 'next';
import {Banknote, Building2, Check, CreditCard} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Tier = {name: string; price: string; timeline: string; features: string[]};
type AddOn = {service: string; citizens: string; expatriates: string; timeline: string};

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'pricing', '/pricing');
}

function Plans({title, tiers, labels, whatsappHref}: {title: string; tiers: Tier[]; labels: {popular: string; cta: string; aria: string}; whatsappHref: string}) {
  return (
    <section>
      <h2 className="mb-8 text-center text-2xl font-bold text-primary">{title}</h2>
      <div className="grid gap-8 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <article key={tier.name} className={`relative flex flex-col rounded-2xl bg-white p-6 shadow-md ${index === 1 ? 'border-2 border-primary lg:scale-[1.03]' : 'border border-gray-100'}`}>
            {index === 1 && <span className="absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{labels.popular}</span>}
            <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
            <p className="mt-4 text-3xl font-bold text-primary">{tier.price}</p>
            <p className="mt-2 text-sm text-gray-500">{tier.timeline}</p>
            <div className="my-6 h-px bg-gray-200" />
            <ul className="mb-7 flex-1 space-y-3">
              {tier.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-gray-700"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" /><span>{feature}</span></li>)}
            </ul>
            <WhatsAppCTA href={whatsappHref} label={labels.cta} ariaLabel={`${labels.aria}: ${tier.name}`} className="w-full" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function PricingPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const citizenTiers = t.raw('pricing.citizenTiers') as Tier[];
  const expatTiers = t.raw('pricing.expatTiers') as Tier[];
  const addOns = t.raw('pricingPage.addOns') as AddOn[];
  const governmentFees = t.raw('pricingPage.governmentFees') as string[];
  const paymentMethods = t.raw('pricingPage.paymentMethods') as string[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));
  const labels = {popular: t('pricing.mostPopular'), cta: t('pricing.cta'), aria: t('whatsapp.ariaLabel')};
  const paymentIcons = [CreditCard, Building2, Banknote];

  return (
    <div className="bg-lightBg px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <PageHeader title={t('pricingPage.title')} subtitle={t('pricingPage.subtitle')} />
        <Plans title={t('pricing.citizens')} tiers={citizenTiers} labels={labels} whatsappHref={whatsappHref} />
        <div className="mt-20"><Plans title={t('pricing.expatriates')} tiers={expatTiers} labels={labels} whatsappHref={whatsappHref} /></div>

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
          <div className="rounded-2xl bg-accent/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-primary">{t('pricingPage.governmentTitle')}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">{governmentFees.map((fee) => <li key={fee} className="flex items-start gap-2 text-gray-700"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" /><span>{fee}</span></li>)}</ul>
            <p className="mt-6 text-sm font-semibold text-gray-600">{t('pricingPage.governmentNote')}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <h2 className="text-2xl font-bold text-primary">{t('pricingPage.paymentTitle')}</h2>
            <ul className="mt-6 space-y-4">{paymentMethods.map((method, index) => {const Icon = paymentIcons[index]; return <li key={method} className="flex items-center gap-3 text-lg text-gray-700"><Icon aria-hidden="true" className="size-6 text-primary" /><span>{method}</span></li>;})}</ul>
          </div>
        </section>

        <div className="mt-16 text-center"><p className="mb-6 text-xl font-bold text-primary">{t('pricingPage.finalCta')}</p><WhatsAppCTA href={whatsappHref} label={t('pricing.cta')} ariaLabel={t('whatsapp.ariaLabel')} /></div>
      </div>
    </div>
  );
}
