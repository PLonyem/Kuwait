'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Award, BadgeCheck, Building2, CalendarDays, Check, MessageCircle, Shield, Star, TrendingUp, Users, type LucideIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl, googleBusinessUrl} from '@/lib/contact';

type Stat = {value: string; label: string; sub: string};
type Review = {text: string; name: string; initials: string; rating: number};
type Team = {initials: string; name: string; role: string; bio: string};

const statIcons: LucideIcon[] = [Star, Users, CalendarDays, TrendingUp];
const partnerIcons: LucideIcon[] = [BadgeCheck, Shield, Award, Building2];

export default function TrustSignals() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const stats = t.raw('trustSignals.stats') as Stat[];
  const reviews = t.raw('trustSignals.reviews') as Review[];
  const team = t.raw('trustSignals.team') as Team[];
  const partners = t.raw('trustSignals.partners') as string[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <section className="w-full bg-white px-6 py-16 lg:py-24" aria-labelledby="trust-signals-title">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2 id="trust-signals-title" className="text-3xl font-bold text-primary md:text-4xl">{t('trustSignals.title')}</h2>
          <p className="mx-auto mb-16 mt-4 max-w-2xl text-lg text-gray-600">{t('trustSignals.subtitle')}</p>
        </header>

        <motion.ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.2}} variants={{hidden: {}, visible: {transition: {staggerChildren: reduceMotion ? 0 : 0.05}}}}>
          {stats.map((stat, index) => { const Icon = statIcons[index]; return (
            <motion.li key={stat.label} className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm sm:p-6" variants={{hidden: reduceMotion ? {opacity: 1} : {opacity: 0, y: 14}, visible: {opacity: 1, y: 0}}} transition={{duration: 0.3}}>
              <Icon aria-hidden="true" className="mx-auto mb-3 size-7 text-primary opacity-60" />
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-gray-700">{stat.label}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.sub}</p>
            </motion.li>
          );})}
        </motion.ul>

        <section className="mt-16" aria-labelledby="reviews-title">
          <h3 id="reviews-title" className="mb-6 text-2xl font-bold text-primary">{t('trustSignals.reviewsTitle')}</h3>
          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <GoogleMark label={t('trustSignals.googleLabel')} />
                <div className="mt-4 flex gap-1 text-secondary" aria-label={`${review.rating}/5`}>
                  {Array.from({length: review.rating}).map((_, index) => <Star key={index} aria-hidden="true" className="size-4 fill-current" />)}
                </div>
                <p className="mt-4 line-clamp-3 flex-1 leading-7 text-gray-700">{review.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{review.initials}</span>
                  <div><p className="font-bold text-primary">{review.name}</p><span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-green-700"><Check aria-hidden="true" className="size-3.5" />{t('trustSignals.reviewBadge')}</span></div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-7 text-center"><a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary px-6 py-2 font-semibold text-primary outline-none transition-colors hover:bg-primary hover:text-white focus-visible:ring-4 focus-visible:ring-primary/20">{t('trustSignals.seeAllReviews')}</a></div>
        </section>

        <section className="mt-16" aria-labelledby="team-title">
          <h3 id="team-title" className="text-2xl font-bold text-primary">{t('trustSignals.teamTitle')}</h3>
          <p className="mb-8 mt-2 text-gray-600">{t('trustSignals.teamSubtitle')}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member) => <article key={member.role} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"><span className="mx-auto grid size-24 place-items-center rounded-full bg-primary text-2xl font-bold text-white">{member.initials}</span><h4 className="mt-4 text-lg font-bold text-primary">{member.name}</h4><p className="mt-1 text-sm text-gray-500">{member.role}</p><p className="mt-2 text-sm leading-6 text-gray-600">{member.bio}</p></article>)}
          </div>
          <p className="mt-4 text-sm italic text-gray-500">{t('trustSignals.teamNotice')}</p>
        </section>

        <section className="mt-16" aria-labelledby="partners-title">
          <h3 id="partners-title" className="text-2xl font-bold text-primary">{t('trustSignals.partnersTitle')}</h3>
          <p className="mb-6 mt-2 text-gray-600">{t('trustSignals.partnersSubtitle')}</p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{partners.map((partner, index) => {const Icon = partnerIcons[index]; return <div key={partner} className="rounded-lg bg-gray-100 p-4 text-center"><Icon aria-hidden="true" className="mx-auto size-8 text-primary" /><p className="mt-2 text-sm font-medium text-gray-700">{partner}</p></div>;})}</div>
          <p className="mt-4 text-sm italic text-gray-500">{t('trustSignals.partnersNotice')}</p>
        </section>

        <section className="mt-12 rounded-xl bg-primary p-8 text-center text-white" aria-labelledby="guarantee-title">
          <Shield aria-hidden="true" className="mx-auto size-12 text-accent" />
          <h3 id="guarantee-title" className="mt-4 text-2xl font-bold">{t('trustSignals.guaranteeTitle')}</h3>
          <p className="mx-auto mt-2 max-w-3xl text-lg text-white/90">{t('trustSignals.guaranteeText')}</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-cta px-6 py-2 font-bold text-white outline-none focus-visible:ring-4 focus-visible:ring-white/40"><MessageCircle aria-hidden="true" className="size-5" />{t('trustSignals.contactCta')}</a>
        </section>
      </div>
    </section>
  );
}

function GoogleMark({label}: {label: string}) {
  return <svg aria-label={label} role="img" viewBox="0 0 18 18" className="size-6"><path fill="#4285F4" d="M17.64 9.21c0-.64-.06-1.25-.16-1.85H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.71-1.57 2.69-3.89 2.69-6.61Z" /><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18Z" /><path fill="#FBBC05" d="M3.96 10.71A5.42 5.42 0 0 1 3.68 9c0-.59.1-1.16.28-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.82.95 4.04l3.01-2.33Z" /><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A8.65 8.65 0 0 0 9 0 9 9 0 0 0 .95 4.96l3.01 2.33C4.67 5.16 6.66 3.58 9 3.58Z" /></svg>;
}
