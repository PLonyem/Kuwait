'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {
  Award,
  Check,
  CircleCheck,
  ClipboardCheck,
  FileText,
  FolderOpen,
  MessageCircle,
  type LucideIcon
} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';

type WalkthroughStep = {
  number: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
  duration: string;
  fullDetails: string[];
  clientTasks: string[];
  handledTasks: string[];
  priceTag: {type: 'free' | 'included'; label: string};
};

type CommitmentBlockData = {
  headline: string;
  subheadline: string;
  pricesLabel: string;
  prices: Array<{tier: string; amount: string}>;
  paymentPlanTitle: string;
  paymentPlan: Array<{step: string; timing: string}>;
  methodsLabel: string;
  methods: string;
  ctaButton: string;
  ctaMessage: string;
  note: string;
};

type WalkthroughSectionProps = {
  variant?: 'homepage' | 'full';
  locale: string;
};

const stepIcons: Record<string, LucideIcon> = {
  Award,
  ClipboardCheck,
  FileText,
  FolderOpen,
  MessageCircle
};

export default function WalkthroughSection({variant = 'homepage', locale}: WalkthroughSectionProps) {
  const t = useTranslations('walkthrough');
  const commitmentT = useTranslations('commitmentBlock');
  const reduceMotion = useReducedMotion();
  const steps = t.raw('steps') as WalkthroughStep[];
  const commitmentBlock: CommitmentBlockData = {
    headline: commitmentT('headline'),
    subheadline: commitmentT('subheadline'),
    pricesLabel: commitmentT('pricesLabel'),
    prices: commitmentT.raw('prices') as CommitmentBlockData['prices'],
    paymentPlanTitle: commitmentT('paymentPlanTitle'),
    paymentPlan: commitmentT.raw('paymentPlan') as CommitmentBlockData['paymentPlan'],
    methodsLabel: commitmentT('methodsLabel'),
    methods: commitmentT('methods'),
    ctaButton: commitmentT('ctaButton'),
    ctaMessage: commitmentT('ctaMessage'),
    note: commitmentT('note')
  };
  const isFull = variant === 'full';
  const commitmentHref = createWhatsAppUrl(commitmentBlock.ctaMessage);

  return (
    <section
      className={`relative isolate w-full overflow-hidden bg-lightBg px-6 py-16 lg:py-24 ${isFull ? 'rounded-[2rem]' : ''}`}
      aria-labelledby={`walkthrough-title-${variant}`}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(232,213,183,0.55),transparent_34%),radial-gradient(circle_at_10%_70%,rgba(27,94,32,0.07),transparent_28%)]"
      />
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.5}}
        >
          <h2 id={`walkthrough-title-${variant}`} className="text-3xl font-bold text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mb-16 mt-4 max-w-2xl text-lg text-gray-600">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-8 start-[31px] top-8 border-s-2 border-dashed border-gray-300 md:start-1/2"
          />
          <ol className="relative space-y-8 md:space-y-10">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.icon] ?? MessageCircle;
              const contentAtStart = index % 2 === 1;
              const contentPosition = contentAtStart ? 'md:col-start-1' : 'md:col-start-3';
              const numberPosition = contentAtStart ? 'md:col-start-3' : 'md:col-start-1';

              return (
                <motion.li
                  key={step.number}
                  className="group relative grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-x-4 md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] md:gap-x-7"
                  initial={reduceMotion ? false : {opacity: 0, y: 24}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.22}}
                  transition={{duration: 0.48, delay: reduceMotion ? 0 : index * 0.07}}
                >
                  <span className={`hidden size-16 place-items-center self-center rounded-full bg-primary text-xl font-bold text-white shadow-lg shadow-primary/15 md:grid ${numberPosition}`}>
                    {step.number}
                  </span>

                  <div className="relative z-10 col-start-1 row-start-1 grid size-16 place-items-center md:col-start-2 md:size-[72px]">
                    <span className="absolute inset-2 rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg" />
                    <Icon aria-hidden="true" className="relative size-7 text-primary" strokeWidth={2.2} />
                    <span className="absolute -end-1 -top-1 grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-white md:hidden">
                      {step.number}
                    </span>
                  </div>

                  <article className={`col-start-2 row-start-1 rounded-xl bg-white p-5 shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:p-6 md:col-auto ${contentPosition}`}>
                    {isFull && (
                      <div aria-hidden="true" className="mb-5 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-accent/35 to-primary/10">
                        <span className="grid size-20 place-items-center rounded-full border border-white/80 bg-white/80 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                          <Icon className="size-10 text-primary" strokeWidth={1.8} />
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-primary sm:text-xl">{step.title}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                    <p className="mt-2 text-sm italic leading-6 text-gray-500">{step.detail}</p>
                    <span className="mt-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                      {step.duration}
                    </span>
                    <div>
                      <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${getPriceTagClass(step.priceTag.type)}`}>
                        {step.priceTag.label}
                      </span>
                    </div>

                    {isFull && (
                      <div className="mt-6 border-t border-gray-100 pt-5">
                        <div className="space-y-3 text-sm leading-6 text-gray-600">
                          {step.fullDetails.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <TaskList title={t('clientLabel')} items={step.clientTasks} muted />
                          <TaskList title={t('handledLabel')} items={step.handledTasks} />
                        </div>
                      </div>
                    )}
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <CommitmentBlock data={commitmentBlock} href={commitmentHref} reduceMotion={reduceMotion} variant={variant} />
      </div>
    </section>
  );
}

function TaskList({title, items, muted = false}: {title: string; items: string[]; muted?: boolean}) {
  return (
    <div className={`rounded-xl p-4 ${muted ? 'bg-gray-50' : 'bg-primary/5'}`}>
      <h4 className="mb-3 text-sm font-bold text-primary">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-5 text-gray-600">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommitmentBlock({
  data,
  href,
  reduceMotion,
  variant
}: {
  data: CommitmentBlockData;
  href: string;
  reduceMotion: boolean | null;
  variant: WalkthroughSectionProps['variant'];
}) {
  return (
    <motion.aside
      className="relative mx-auto mt-16 w-full max-w-3xl rounded-2xl border-2 border-accent bg-gradient-to-br from-primary to-primary/90 p-8 text-white shadow-2xl lg:p-12"
      initial={reduceMotion ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={{duration: 0.48}}
      aria-labelledby={`commitment-headline-${variant}`}
    >
      <h3 id={`commitment-headline-${variant}`} className="mb-4 text-center text-3xl font-bold text-white lg:text-4xl">
        {data.headline}
      </h3>
      <p className="mb-8 text-center text-lg font-medium text-white/90 lg:text-xl">{data.subheadline}</p>

      <div className="my-6 border-t border-white/20" />

      <div className="mb-6 rounded-xl bg-white/10 p-6">
        <p className="mb-3 text-sm font-bold text-white/80">{data.pricesLabel}</p>
        <dl>
          {data.prices.map((price) => (
            <div key={price.tier} className="flex justify-between gap-4 border-b border-white/10 py-2 last:border-0">
              <dt className="text-base text-white">{price.tier}</dt>
              <dd className="shrink-0 text-base font-bold text-accent">{price.amount}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mb-6 rounded-xl bg-white/10 p-6">
        <p className="mb-3 text-sm font-bold text-white/80">{data.paymentPlanTitle}</p>
        <ul>
          {data.paymentPlan.map((item) => (
            <li key={item.step} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span className="inline-flex items-center gap-2 text-base text-white">
                <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-cta" />
                {item.step}
              </span>
              <span className="text-sm italic text-white/80">{item.timing}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-white/80">{data.methodsLabel}</p>
        <p className="text-base text-white">{data.methods}</p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={data.ctaButton}
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-cta px-8 py-5 text-center text-lg font-bold text-white shadow-lg outline-none transition hover:scale-[1.02] hover:shadow-xl focus-visible:ring-4 focus-visible:ring-white/40"
      >
        <MessageCircle aria-hidden="true" className="size-5 shrink-0" />
        {data.ctaButton}
      </a>
      <p className="mt-6 text-center text-sm italic text-white/70">{data.note}</p>
    </motion.aside>
  );
}

function getPriceTagClass(type: string) {
  if (type === 'free') return 'border border-green-200 bg-green-50 text-green-700';
  if (type === 'included') return 'border border-primary/20 bg-primary/10 text-primary';
  return 'border border-gray-200 bg-gray-50 text-gray-700';
}
