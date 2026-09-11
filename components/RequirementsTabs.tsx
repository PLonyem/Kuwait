'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {CheckSquare, Download} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import {createWhatsAppUrl} from '@/lib/contact';

export default function RequirementsTabs() {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'citizens' | 'expatriates'>('citizens');
  const items = t.raw(`requirementsPage.${activeTab}.items`) as string[];
  const panelId = `requirements-${activeTab}`;

  return (
    <div>
      <div
        className="mx-auto mb-8 grid max-w-md grid-cols-2 gap-2 rounded-xl bg-white p-2 shadow-sm"
        role="tablist"
        aria-label={t('requirementsPage.tabsLabel')}
      >
        {(['citizens', 'expatriates'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`requirements-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg border px-4 py-3 font-bold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-secondary ${
              activeTab === tab
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
            }`}
          >
            {t(`requirementsPage.${tab}.title`)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          id={panelId}
          role="tabpanel"
          initial={reduceMotion ? false : {opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          exit={reduceMotion ? undefined : {opacity: 0, y: -8}}
          transition={{duration: reduceMotion ? 0 : 0.22}}
          className="rounded-xl bg-white p-6 shadow-sm sm:p-8"
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-gray-700">
                <CheckSquare aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={`/documents/requirements-${locale}.pdf`}
          download
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-bold text-primary outline-none transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          <Download aria-hidden="true" className="size-5" />
          <span>{t('requirementsPage.download')}</span>
        </a>
        <a
          href={createWhatsAppUrl(t('whatsapp.prefilledMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-cta px-6 py-3 font-bold text-gray-900 shadow-md outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-4 focus-visible:ring-primary/20"
        >
          {t('requirementsPage.cta')}
        </a>
      </div>
    </div>
  );
}
