'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Clock, Mail, Phone} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="currentColor"
      className="size-7 shrink-0 text-cta"
    >
      <path d="M16.04 3A12.85 12.85 0 0 0 5.16 22.7L3.34 29l6.45-1.69A12.83 12.83 0 1 0 16.04 3Zm0 23.5a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.83 1 1.02-3.73-.25-.39A10.65 10.65 0 1 1 16.04 26.5Zm5.84-7.97c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.62 9.62 0 0 1-1.78-2.21c-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function FinalCTA() {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const whatsappHref = `https://wa.me/965XXXXXXXX?text=${encodeURIComponent(
    t('whatsapp.prefilledMessage')
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-primary px-6 py-20 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_52%)]"
      />
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={reduceMotion ? false : {opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.35}}
        transition={{duration: 0.6}}
      >
        <h2 className="mb-8 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          {t('finalCta.headline')}
        </h2>

        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp.ariaLabel')}
          className="inline-flex rounded-full bg-white px-10 py-5 text-lg font-bold text-primary shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
          whileHover={reduceMotion ? undefined : {scale: 1.05}}
          whileFocus={reduceMotion ? undefined : {scale: 1.05}}
          whileTap={reduceMotion ? undefined : {scale: 0.98}}
        >
          <span className="flex items-center gap-3" dir="ltr">
            <WhatsAppIcon />
            <span dir={locale === 'ar' ? 'rtl' : 'ltr'}>{t('finalCta.button')}</span>
          </span>
        </motion.a>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-7">
          <a
            href={`tel:${t('contact.phoneDial')}`}
            className="flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Phone aria-hidden="true" className="size-4" />
            <span dir="ltr">{t('contact.phoneValue')}</span>
          </a>
          <a
            href={`mailto:${t('contact.emailValue')}`}
            className="flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Mail aria-hidden="true" className="size-4" />
            <span dir="ltr">{t('contact.emailValue')}</span>
          </a>
          <p className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4" />
            <span>{t('contact.hoursValue')}</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
