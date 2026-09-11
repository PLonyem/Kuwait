import type {Metadata} from 'next';
import {Award, ClipboardCheck, FileText, FolderOpen, MessageCircle, type LucideIcon} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Step = {number: string; title: string; description: string; duration: string};
type Timeline = {tier: string; citizens: string; expatriates: string};
const icons: LucideIcon[] = [MessageCircle, FileText, FolderOpen, ClipboardCheck, Award];

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'process', '/process');
}

export default async function ProcessPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const steps = t.raw('processPage.steps') as Step[];
  const timelines = t.raw('processPage.timelines') as Timeline[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <div className="bg-white px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <PageHeader title={t('processPage.title')} subtitle={t('processPage.subtitle')} />
        <ol className="relative space-y-8 before:absolute before:bottom-8 before:start-[29px] before:top-8 before:w-0.5 before:bg-primary/20">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <li key={step.number} className="relative flex items-start gap-5">
                <span className="relative z-10 grid size-[60px] shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-white shadow-lg shadow-primary/15">{step.number}</span>
                <article className="flex-1 rounded-2xl bg-lightBg p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2"><Icon aria-hidden="true" className="size-5 text-primary" /><h2 className="text-xl font-bold text-primary sm:text-2xl">{step.title}</h2></div>
                    <span className="rounded-full bg-accent/60 px-3 py-1 text-sm font-bold text-primary">{step.duration}</span>
                  </div>
                  <p className="mt-3 leading-7 text-gray-600">{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>

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
