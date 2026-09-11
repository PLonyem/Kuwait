'use client';

import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import {ChevronDown, Minus, Plus} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useState} from 'react';

type FAQItem = {
  q: string;
  a: string;
};

export default function FAQ() {
  const t = useTranslations('faq');
  const reduceMotion = useReducedMotion();
  const items = t.raw('items') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full scroll-mt-20 bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('title')}
        </motion.h2>

        <div>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.q} className="mb-3 overflow-hidden rounded-lg bg-white shadow-sm">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-4 p-5 text-start text-lg font-semibold text-gray-800 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="flex shrink-0 items-center gap-1 text-primary">
                      {isOpen ? (
                        <Minus aria-hidden="true" className="size-5" />
                      ) : (
                        <Plus aria-hidden="true" className="size-5" />
                      )}
                      <motion.span
                        className="inline-flex"
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: reduceMotion ? 0 : 0.25}}
                      >
                        <ChevronDown aria-hidden="true" className="size-4" />
                      </motion.span>
                    </span>
                    <span className="flex-1">{item.q}</span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? {opacity: 1} : {height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                      transition={{duration: reduceMotion ? 0 : 0.28, ease: 'easeInOut'}}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-7 text-gray-600">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
