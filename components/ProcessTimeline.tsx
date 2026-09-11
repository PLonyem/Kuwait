'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {CheckCircle, FileText, MessageCircle, type LucideIcon} from 'lucide-react';
import {useTranslations} from 'next-intl';

type TimelineStep = {
  number: string;
  title: string;
  description: string;
};

const stepIcons: LucideIcon[] = [MessageCircle, FileText, CheckCircle];

export default function ProcessTimeline() {
  const t = useTranslations('howItWorks');
  const reduceMotion = useReducedMotion();
  const steps = t.raw('steps') as TimelineStep[];

  return (
    <section className="w-full bg-lightBg px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl lg:mb-16"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-[60px] start-[29px] top-[60px] w-0.5 bg-primary/20 md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] right-[16.6667%] top-[29px] hidden h-0.5 bg-primary/20 md:block"
          />

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => {
              const Icon = stepIcons[index];

              return (
                <motion.li
                  key={step.number}
                  className="flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
                  initial={reduceMotion ? false : {opacity: 0, y: 18}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.35}}
                  transition={{duration: 0.45, delay: reduceMotion ? 0 : index * 0.1}}
                >
                  <span className="relative z-10 grid size-[60px] shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-white shadow-[0_8px_24px_rgba(27,94,32,0.2)]">
                    {step.number}
                  </span>
                  <div className="pt-1 md:pt-6">
                    <div className="mb-2 flex items-center gap-2 md:justify-center">
                      <Icon aria-hidden="true" className="size-5 shrink-0 text-primary" />
                      <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                    </div>
                    <p className="leading-7 text-gray-600">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
