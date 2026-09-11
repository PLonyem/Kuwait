import type {Metadata} from 'next';
import {BadgeCheck, Languages, MessageCircle, SearchCheck, ShieldCheck} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Stat = {value: string; label: string};
const reasonIcons = [BadgeCheck, Languages, SearchCheck, ShieldCheck, MessageCircle];

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'about', '/about');
}

export default async function AboutPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const reasons = t.raw('aboutPage.reasons') as string[];
  const stats = t.raw('aboutPage.stats') as Stat[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <div className="bg-white px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <PageHeader title={t('aboutPage.title')} subtitle={t('aboutPage.subtitle')} />

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl bg-lightBg p-6 sm:p-8"><h2 className="text-2xl font-bold text-primary">{t('aboutPage.storyTitle')}</h2><p className="mt-4 leading-8 text-gray-700">{t('aboutPage.story')}</p></section>
          <section className="rounded-2xl bg-primary p-6 text-white sm:p-8"><h2 className="text-2xl font-bold">{t('aboutPage.missionTitle')}</h2><p className="mt-4 leading-8 text-white/85">{t('aboutPage.mission')}</p></section>
        </div>

        <section className="mt-14">
          <h2 className="mb-8 text-center text-3xl font-bold text-primary">{t('aboutPage.whyTitle')}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {const Icon = reasonIcons[index]; return <li key={reason} className="flex items-center gap-4 rounded-xl border border-primary/10 bg-white p-5 shadow-sm"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon aria-hidden="true" className="size-5" /></span><span className="font-semibold text-gray-700">{reason}</span></li>;})}
          </ul>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-3" aria-label={t('aboutPage.whyTitle')}>
          {stats.map((stat) => <div key={stat.label} className="rounded-2xl bg-accent/35 p-6 text-center"><p className="text-4xl font-bold text-primary">{stat.value}</p><p className="mt-2 font-semibold text-gray-600">{stat.label}</p></div>)}
        </section>

        <div className="mt-14 text-center"><p className="mb-6 text-xl font-bold text-primary">{t('aboutPage.finalCta')}</p><WhatsAppCTA href={whatsappHref} label={t('whatsapp.label')} ariaLabel={t('whatsapp.ariaLabel')} /></div>
      </div>
    </div>
  );
}
