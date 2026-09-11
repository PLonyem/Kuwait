'use client';

import {FormEvent, useState} from 'react';
import {useTranslations} from 'next-intl';

import {createWhatsAppUrl} from '@/lib/contact';

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = t('form.whatsappMessage', {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      message: String(data.get('message') || '')
    });

    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <h2 className="text-2xl font-bold text-primary">{t('form.title')}</h2>
      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="mb-2 block font-semibold text-gray-700">{t('form.name')}</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-semibold text-gray-700">{t('form.phone')}</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="mb-2 block font-semibold text-gray-700">{t('form.message')}</span>
          <textarea
            required
            name="message"
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 font-bold text-white outline-none transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-secondary/50"
      >
        {t('form.submit')}
      </button>
      {sent && (
        <p role="status" className="mt-4 rounded-lg bg-cta/10 px-4 py-3 text-center font-medium text-primary">
          {t('form.success')}
        </p>
      )}
    </form>
  );
}
