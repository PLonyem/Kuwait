import type {Metadata} from 'next';
import {Award, BadgeCheck, Building2, Check, Languages, MessageCircle, SearchCheck, Shield, ShieldCheck, Star, type LucideIcon} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl, googleBusinessUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Stat = {value: string; label: string};
type Review = {text: string; name: string; initials: string; rating: number};
type TeamMember = {initials: string; name: string; role: string; bio: string};

const reasonIcons = [BadgeCheck, Languages, SearchCheck, ShieldCheck, MessageCircle];
const partnerIcons: LucideIcon[] = [BadgeCheck, Shield, Award, Building2];

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'about', '/about');
}

export default async function AboutPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const reasons = t.raw('aboutPage.reasons') as string[];
  const reviews = t.raw('aboutPage.reviews') as Review[];
  const team = t.raw('aboutPage.team') as TeamMember[];
  const partners = t.raw('aboutPage.partners') as string[];
  const stats = t.raw('aboutPage.stats') as Stat[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <div className="bg-white px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-6xl">
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

        <section className="mt-16" aria-labelledby="about-reviews-title">
          <h2 id="about-reviews-title" className="mb-6 text-2xl font-bold text-primary">{t('aboutPage.googleReviewsTitle')}</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => <article key={review.name} className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><GoogleMark label={t('aboutPage.googleLabel')} /><div className="mt-4 flex gap-1 text-secondary" aria-label={`${review.rating}/5`}>{Array.from({length: review.rating}).map((_, index) => <Star key={index} aria-hidden="true" className="size-4 fill-current" />)}</div><p className="mt-4 flex-1 leading-7 text-gray-700">{review.text}</p><div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{review.initials}</span><div><p className="font-bold text-primary">{review.name}</p><span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-green-700"><Check aria-hidden="true" className="size-3.5" />{t('aboutPage.reviewBadge')}</span></div></div></article>)}
          </div>
          <div className="mt-7 text-center"><a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary px-6 py-2 font-semibold text-primary outline-none transition-colors hover:bg-primary hover:text-white focus-visible:ring-4 focus-visible:ring-primary/20">{t('aboutPage.seeAllReviews')}</a></div>
        </section>

        <section className="mt-16" aria-labelledby="about-team-title">
          <h2 id="about-team-title" className="text-2xl font-bold text-primary">{t('aboutPage.teamTitle')}</h2><p className="mb-8 mt-2 text-gray-600">{t('aboutPage.teamSubtitle')}</p>
          <div className="grid gap-6 md:grid-cols-3">{team.map((member) => <article key={member.role} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"><span className="mx-auto grid size-24 place-items-center rounded-full bg-primary text-2xl font-bold text-white">{member.initials}</span><h3 className="mt-4 text-lg font-bold text-primary">{member.name}</h3><p className="mt-1 text-sm text-gray-500">{member.role}</p><p className="mt-2 text-sm leading-6 text-gray-600">{member.bio}</p></article>)}</div>
          <p className="mt-4 text-sm italic text-gray-500">{t('aboutPage.teamNotice')}</p>
        </section>

        <section className="mt-16" aria-labelledby="about-partners-title">
          <h2 id="about-partners-title" className="text-2xl font-bold text-primary">{t('aboutPage.partnersTitle')}</h2><p className="mb-6 mt-2 text-gray-600">{t('aboutPage.partnersSubtitle')}</p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{partners.map((partner, index) => {const Icon = partnerIcons[index]; return <div key={partner} className="rounded-lg bg-gray-100 p-4 text-center"><Icon aria-hidden="true" className="mx-auto size-8 text-primary" /><p className="mt-2 text-sm font-medium text-gray-700">{partner}</p></div>;})}</div>
          <p className="mt-4 text-sm italic text-gray-500">{t('aboutPage.partnersNotice')}</p>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-3" aria-label={t('aboutPage.whyTitle')}>
          {stats.map((stat) => <div key={stat.label} className="rounded-2xl bg-accent/35 p-6 text-center"><p className="text-4xl font-bold text-primary">{stat.value}</p><p className="mt-2 font-semibold text-gray-600">{stat.label}</p></div>)}
        </section>

        <div className="mt-14 text-center"><p className="mb-6 text-xl font-bold text-primary">{t('aboutPage.finalCta')}</p><WhatsAppCTA href={whatsappHref} label={t('whatsapp.label')} ariaLabel={t('whatsapp.ariaLabel')} /></div>
      </div>
    </div>
  );
}

function GoogleMark({label}: {label: string}) {
  return <svg aria-label={label} role="img" viewBox="0 0 18 18" className="size-6"><path fill="#4285F4" d="M17.64 9.21c0-.64-.06-1.25-.16-1.85H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.71-1.57 2.69-3.89 2.69-6.61Z" /><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18Z" /><path fill="#FBBC05" d="M3.96 10.71A5.42 5.42 0 0 1 3.68 9c0-.59.1-1.16.28-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.82.95 4.04l3.01-2.33Z" /><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A8.65 8.65 0 0 0 9 0 9 9 0 0 0 .95 4.96l3.01 2.33C4.67 5.16 6.66 3.58 9 3.58Z" /></svg>;
}
