import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WalkthroughSection from '@/components/WalkthroughSection';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Timeline = {tier: string; citizens: string; expatriates: string};

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'process', '/process');
}

export default async function ProcessPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const timelines = t.raw('processPage.timelines') as Timeline[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <div className="bg-white px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-5xl">
        <PageHeader title={t('processPage.title')} subtitle={t('processPage.subtitle')} />
        <WalkthroughSection variant="full" locale={locale} />

        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-primary">{t('processPage.timelineTitle')}</h2>
          <div className="overflow-x-auto rounded-2xl shadow-md">
            <table className="w-full min-w-[560px] bg-white">
              <thead className="bg-primary text-white"><tr><th className="px-5 py-4 text-start">{t('processPage.table.tier')}</th><th className="px-5 py-4 text-start">{t('processPage.table.citizens')}</th><th className="px-5 py-4 text-start">{t('processPage.table.expatriates')}</th></tr></thead>
              <tbody>{timelines.map((row, index) => <tr key={row.tier} className={index % 2 ? 'bg-lightBg' : 'bg-white'}><th scope="row" className="px-5 py-4 text-start font-semibold text-gray-800">{row.tier}</th><td className="px-5 py-4 text-gray-700">{row.citizens}</td><td className="px-5 py-4 text-gray-700">{row.expatriates}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <div className="mt-14 text-center"><p className="mb-6 text-xl font-bold text-primary">{t('processPage.finalCta')}</p><WhatsAppCTA href={whatsappHref} label={t('whatsapp.label')} ariaLabel={t('whatsapp.ariaLabel')} /></div>
      </div>
    </div>
  );
}
