'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {
  CalendarDays,
  Languages,
  MapPin,
  MessageCircle,
  Star,
  Users,
  type LucideIcon
} from 'lucide-react';
import {useTranslations} from 'next-intl';

const signals: Array<{key: string; icon: LucideIcon}> = [
  {key: 'reviews', icon: Star},
  {key: 'clients', icon: Users},
  {key: 'experience', icon: CalendarDays},
  {key: 'office', icon: MapPin},
  {key: 'support', icon: Languages},
  {key: 'reply', icon: MessageCircle}
];

export default function TrustSignals() {
  const t = useTranslations('trust');
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full border-y border-primary/10 bg-white px-6 py-12 lg:py-16">
      <motion.ul
        className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.25}}
        variants={{
          hidden: {},
          visible: {transition: {staggerChildren: reduceMotion ? 0 : 0.055}}
        }}
      >
        {signals.map(({key, icon: Icon}) => (
          <motion.li
            key={key}
            className="flex flex-col items-center gap-3 text-center"
            variants={{
              hidden: reduceMotion ? {opacity: 1} : {opacity: 0, y: 12},
              visible: {opacity: 1, y: 0}
            }}
            transition={{duration: 0.4}}
          >
            {key === 'reviews' ? (
              <span className="flex h-8 items-center justify-center text-secondary" aria-hidden="true">
                {Array.from({length: 5}).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </span>
            ) : (
              <Icon aria-hidden="true" className="size-8 text-primary" strokeWidth={1.8} />
            )}
            <span className="text-sm font-medium leading-6 text-gray-700">{t(key)}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
