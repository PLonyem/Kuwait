'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {CalendarDays, Shield, Star, TrendingUp, Users, type LucideIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

type Stat = {value: string; label: string; sub: string};

const statIcons: LucideIcon[] = [Star, Users, CalendarDays, TrendingUp];

export default function TrustSignals() {
  const t = useTranslations('trustSignals');
  const reduceMotion = useReducedMotion();
  const stats = t.raw('stats') as Stat[];

  return (
    <section className="w-full bg-white px-6 py-16 lg:py-24" aria-labelledby="trust-signals-title">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2 id="trust-signals-title" className="text-3xl font-bold text-primary md:text-4xl">{t('title')}</h2>
          <p className="mx-auto mb-16 mt-4 max-w-2xl text-lg text-gray-600">{t('subtitle')}</p>
        </header>

        <motion.ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.2}} variants={{hidden: {}, visible: {transition: {staggerChildren: reduceMotion ? 0 : 0.05}}}}>
          {stats.map((stat, index) => {const Icon = statIcons[index]; return (
            <motion.li key={stat.label} className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm sm:p-6" variants={{hidden: reduceMotion ? {opacity: 1} : {opacity: 0, y: 14}, visible: {opacity: 1, y: 0}}} transition={{duration: 0.3}}>
              <Icon aria-hidden="true" className="mx-auto mb-3 size-7 text-primary opacity-60" />
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-gray-700">{stat.label}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.sub}</p>
            </motion.li>
          );})}
        </motion.ul>

        <div className="mx-auto mt-12 h-px max-w-3xl bg-primary/10" aria-hidden="true" />
        <section className="mt-12 rounded-xl bg-primary p-8 text-center text-white" aria-labelledby="guarantee-title">
          <Shield aria-hidden="true" className="mx-auto size-12 text-accent" />
          <h3 id="guarantee-title" className="mt-4 text-2xl font-bold">{t('guaranteeTitle')}</h3>
          <p className="mx-auto mt-2 max-w-3xl text-lg text-white/90">{t('guaranteeText')}</p>
        </section>
      </div>
    </section>
  );
}
