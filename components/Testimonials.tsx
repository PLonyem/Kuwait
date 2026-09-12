'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Check, CheckCircle2, MessageCircle, Star} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl, googleBusinessUrl} from '@/lib/contact';

type Testimonial = {quote: string; name: string; role: string; tier: string; challenge: string; outcome: string; rating: number; date: string; initials: string};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const reduceMotion = useReducedMotion();
  const testimonials = t.raw('items') as Testimonial[];
  const whatsappHref = createWhatsAppUrl(t('whatsappMessage'));

  return (
    <section className="w-full bg-white px-6 py-16 lg:py-24" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-6xl">
        <header className="text-center"><h2 id="testimonials-title" className="text-3xl font-bold text-primary md:text-4xl">{t('title')}</h2><p className="mx-auto mb-16 mt-4 max-w-2xl text-lg text-gray-600">{t('subtitle')}</p></header>
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.article key={item.name} className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-md" initial={reduceMotion ? false : {opacity: 0, y: 18}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.2}} transition={{duration: 0.3, delay: reduceMotion ? 0 : index * 0.05}}>
              <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex gap-1 text-secondary" aria-label={`${item.rating}/5`}>{Array.from({length: item.rating}).map((_, starIndex) => <Star key={starIndex} aria-hidden="true" className="size-4 fill-current" />)}</div><span className="inline-flex items-center gap-1 text-xs font-bold text-green-700"><Check aria-hidden="true" className="size-3.5" />{t('verifiedBadge')}</span></div>
              <span className="mt-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{item.challenge}</span>
              <blockquote className="mt-4 flex-1 leading-7 text-gray-700"><p>“{item.quote}”</p></blockquote>
              <span className="mt-4 inline-flex items-center gap-1 self-start rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"><CheckCircle2 aria-hidden="true" className="size-4" />{item.outcome}</span>
              <footer className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{item.initials}</span><div className="min-w-0"><p className="font-bold text-primary">{item.name}</p><p className="text-sm text-gray-500">{item.role}</p><p className="text-xs font-semibold text-primary">{item.tier}</p></div><time className="ms-auto self-end whitespace-nowrap text-xs text-gray-400">{item.date}</time></footer>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href={googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary px-6 py-2 font-semibold text-primary outline-none transition-colors hover:bg-primary hover:text-white focus-visible:ring-4 focus-visible:ring-primary/20">{t('seeAllReviews')}</a><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cta px-6 py-2 font-bold text-white outline-none focus-visible:ring-4 focus-visible:ring-cta/30"><MessageCircle aria-hidden="true" className="size-5" />{t('contactCta')}</a></div>
      </div>
    </section>
  );
}
