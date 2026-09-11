'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Check} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';

export default function WhatWeHandle() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const items = t.raw('whatWeHandle.items') as string[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <section className="w-full bg-white px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('whatWeHandle.title')}
        </motion.h2>

        <motion.ul
          className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.15}}
          variants={{
            hidden: {},
            visible: {transition: {staggerChildren: reduceMotion ? 0 : 0.045}}
          }}
        >
          {items.map((item) => (
            <motion.li
              key={item}
              className="flex items-start gap-3 py-3 text-lg text-gray-700"
              variants={{
                hidden: reduceMotion ? {opacity: 1} : {opacity: 0, y: 10},
                visible: {opacity: 1, y: 0}
              }}
              transition={{duration: 0.35}}
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-12 text-center">
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('whatWeHandle.cta')}
            className="inline-flex rounded-full border-2 border-cta px-7 py-3 font-bold text-primary outline-none transition-colors hover:bg-cta hover:text-gray-900 focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-4"
            whileHover={reduceMotion ? undefined : {scale: 1.04}}
            whileFocus={reduceMotion ? undefined : {scale: 1.04}}
            whileTap={reduceMotion ? undefined : {scale: 0.98}}
          >
            {t('whatWeHandle.cta')}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
