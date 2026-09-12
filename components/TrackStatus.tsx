'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {Check, Circle, MessageCircle, Search} from 'lucide-react';
import {FormEvent, useState} from 'react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';
import {getClientStatus} from '@/lib/getClientStatus';

type ClientRecord = {name: string; tier: string; residency: string; status: string; lastUpdated: string; timeline: Array<{status: string; date: string}>};

const statusOrder = ['documentsReceived', 'documentsVerified', 'fileOpened', 'theoryScheduled', 'theoryPassed', 'roadScheduled', 'roadPassed', 'licenseIssued', 'licenseDelivered'] as const;

export default function TrackStatus({locale}: {locale: string}) {
  const t = useTranslations('trackStatus');
  const reduceMotion = useReducedMotion();
  const [civilId, setCivilId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClientRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const whatsappHref = createWhatsAppUrl(t('whatsappMessage'));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!civilId.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const client = await getClientStatus(civilId);
      if (client) setResult(client); else setError(t('notFound'));
    } catch {
      setError(t('notFound'));
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = result ? statusOrder.indexOf(result.status as typeof statusOrder[number]) : -1;
  const dates = new Map(result?.timeline.map((item) => [item.status, item.date]));
  const formatDate = (date: string) => new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(new Date(`${date}T00:00:00Z`));

  return (
    <section className="bg-lightBg px-6 py-16 lg:py-24" aria-labelledby="track-status-title">
      <div className="mx-auto max-w-3xl">
        <header className="text-center"><h1 id="track-status-title" className="text-3xl font-bold text-primary md:text-4xl">{t('title')}</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{t('subtitle')}</p></header>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl" aria-busy={loading}>
          <label htmlFor="civil-id" className="sr-only">{t('inputLabel')}</label>
          <input id="civil-id" value={civilId} onChange={(event) => setCivilId(event.target.value)} required minLength={8} maxLength={12} pattern="[0-9Xx]{8,12}" autoComplete="off" inputMode="numeric" placeholder={t('inputPlaceholder')} className="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25" />
          <button type="submit" disabled={loading} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white outline-none transition hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-primary/25 disabled:cursor-wait disabled:opacity-70 sm:w-auto"><Search aria-hidden="true" className="size-5" />{loading ? t('loading') : t('submitButton')}</button>
        </form>

        <AnimatePresence mode="wait">
          {result && <motion.article key="result" className="mt-8 rounded-xl bg-white p-6 shadow-md sm:p-8" initial={reduceMotion ? false : {opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: reduceMotion ? 0 : 0.25}} aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-lg font-bold text-primary">{result.name}</p><p className="mt-1 text-sm text-gray-500">{t(`tiers.${result.tier}`)}</p></div><div><p className="text-xs font-semibold text-gray-500">{t('statusLabel')}</p><span className="mt-2 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">{t(`statuses.${result.status}`)}</span></div></div>
            <p className="mt-4 text-sm text-gray-500">{t('lastUpdatedLabel')}: <time dateTime={result.lastUpdated}>{formatDate(result.lastUpdated)}</time></p>
            <h2 className="mb-3 mt-7 text-sm font-bold text-gray-700">{t('timelineLabel')}</h2>
            <ol className="relative space-y-1 before:absolute before:bottom-4 before:start-[15px] before:top-4 before:w-px before:bg-gray-200">
              {statusOrder.map((status, index) => {const isCurrent = index === currentIndex; const isComplete = index < currentIndex; const date = dates.get(status); return <li key={status} className="relative flex min-h-11 items-center gap-3 py-2"><span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ${isComplete ? 'bg-green-600 text-white' : isCurrent ? 'bg-primary text-white ring-4 ring-primary/15' : 'border-2 border-gray-300 bg-white text-gray-300'}`}>{isComplete ? <Check aria-hidden="true" className="size-4" /> : <Circle aria-hidden="true" className={`size-2 ${isCurrent ? 'fill-current' : ''}`} />}</span><span className={`text-sm ${index <= currentIndex ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>{t(`statuses.${status}`)}</span>{date && <time dateTime={date} className="ms-auto text-xs text-gray-500">{formatDate(date)}</time>}</li>;})}
            </ol>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-cta px-6 py-2 font-bold text-white outline-none focus-visible:ring-4 focus-visible:ring-cta/30"><MessageCircle aria-hidden="true" className="size-5" />{t('ctaText')}</a>
          </motion.article>}
          {error && <motion.div key="error" className="mt-8 rounded-xl border-2 border-red-200 bg-red-50 p-6" initial={reduceMotion ? false : {opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} role="alert"><p className="text-red-700">{error}</p><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-2 font-bold text-white outline-none focus-visible:ring-4 focus-visible:ring-primary/25"><MessageCircle aria-hidden="true" className="size-5" />{t('contactButton')}</a></motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
