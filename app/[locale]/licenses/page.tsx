import type {Metadata} from 'next';
import {Check} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import LicenseCategoriesGrid from '@/components/LicenseCategoriesGrid';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import type {LicenseCategory} from '@/components/LicenseCategoryCard';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Tier = {
  name: string;
  price: string;
  timeline: string;
  features: string[];
};

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const locale = await getPageLocale(params);
  const metadata = await createPageMetadata(locale, 'licenses', '/licenses');

  return {
    ...metadata,
    openGraph: {
      ...(metadata.openGraph ?? {}),
      locale: locale === 'ar' ? 'ar_KW' : 'en_US'
    }
  };
}

export default async function LicensesPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const categories = t.raw('licenseCategories.categories') as LicenseCategory[];
  const tiers = t.raw('pricing.citizenTiers') as Tier[];
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('licensesPage.schemaName'),
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.nameEn
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c')
        }}
      />

      <section className="bg-white px-6 pb-12 pt-24 lg:pb-16 lg:pt-28">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold text-primary md:text-5xl">
            {t('licensesPage.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            {t('licensesPage.subtitle')}
          </p>
        </div>
      </section>

      <LicenseCategoriesGrid />

      <section className="bg-white px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
            {t('licensesPage.tiersTitle')}
          </h2>

          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => {
              const isPopular = index === 1;
              const tierUrl = createWhatsAppUrl(
                `${t('whatsapp.prefilledMessage')}. ${tier.name}.`
              );

              return (
                <article
                  key={tier.name}
                  className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-md ${
                    isPopular
                      ? 'border-2 border-primary lg:scale-[1.03]'
                      : 'border border-gray-100'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                      {t('pricing.mostPopular')}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
                  <p className="mt-4 text-3xl font-bold text-primary">{tier.price}</p>
                  <p className="mt-2 text-sm text-gray-500">{tier.timeline}</p>
                  <div aria-hidden="true" className="my-6 border-t border-gray-200" />
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
                  <WhatsAppCTA
                    href={tierUrl}
                    label={t('pricing.cta')}
                    ariaLabel={`${t('whatsapp.ariaLabel')}: ${tier.name}`}
                    className="w-full"
                  />
                </article>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl bg-primary px-6 py-10 text-center sm:px-10">
            <p className="mb-6 text-xl font-bold text-white md:text-2xl">
              {t('licensesPage.finalCta')}
            </p>
            <WhatsAppCTA
              href={createWhatsAppUrl(t('licenseCategories.helpMessage'))}
              label={t('licenseCategories.helpButton')}
              ariaLabel={t('licenseCategories.helpText')}
            />
          </div>
        </div>
      </section>
    </>
  );
}
