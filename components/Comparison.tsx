'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Check, X} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function Comparison() {
  const t = useTranslations('comparison');
  const reduceMotion = useReducedMotion();
  const oldWayItems = t.raw('oldWay.items') as string[];
  const ourWayItems = t.raw('ourWay.items') as string[];

  return (
    <section className="w-full bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('title')}
        </motion.h2>

        <div className="relative grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            aria-hidden="true"
            className="absolute inset-y-5 left-1/2 hidden w-px -translate-x-1/2 bg-gray-300 md:block"
          />

          <motion.article
            className="relative rounded-xl bg-white p-6 shadow-sm"
            initial={reduceMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.5}}
          >
            <h3 className="mb-6 text-xl font-bold text-gray-700">{t('oldWay.title')}</h3>
            <ul className="space-y-4">
              {oldWayItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
                    <X aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-primary/10"
            initial={reduceMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.5, delay: reduceMotion ? 0 : 0.1}}
          >
            <h3 className="mb-6 text-xl font-bold text-primary">{t('ourWay.title')}</h3>
            <ul className="space-y-4">
              {ourWayItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-medium text-primary">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
