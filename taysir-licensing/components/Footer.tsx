import {Clock3, Instagram, Mail, MapPin, MessageCircle, Phone, Route} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {Link} from '@/navigation';

const quickLinks = [
  {key: 'services', href: '/services'},
  {key: 'requirements', href: '/requirements'},
  {key: 'pricing', href: '/pricing'},
  {key: 'process', href: '/process'},
  {key: 'faq', href: '/#faq'},
  {key: 'contact', href: '/contact'}
] as const;

export default function Footer() {
  const t = useTranslations();
  const whatsappHref = `https://wa.me/${t('contact.whatsappDial')}?text=${encodeURIComponent(
    t('whatsapp.prefilledMessage')
  )}`;

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:py-16">
        <section aria-labelledby="footer-company-heading">
          <Link
            href="/"
            id="footer-company-heading"
            className="inline-flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white text-primary">
              <Route aria-hidden="true" className="size-5" />
            </span>
            <span className="font-english text-base font-bold tracking-[0.08em]">
              {t('brand.name')}
            </span>
          </Link>
          <p className="mt-5 max-w-xs leading-7 text-white/80">
            {t('footer.tagline')}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full bg-white/10 outline-none transition-colors hover:bg-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={t('footer.instagramAriaLabel')}
            >
              <Instagram aria-hidden="true" className="size-5" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 place-items-center rounded-full bg-white/10 outline-none transition-colors hover:bg-cta focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={t('footer.whatsappAriaLabel')}
            >
              <MessageCircle aria-hidden="true" className="size-5" />
            </a>
          </div>
        </section>

        <section aria-labelledby="footer-links-heading">
          <h2 id="footer-links-heading" className="text-lg font-bold">
            {t('footer.quickLinks')}
          </h2>
          <ul className="mt-5 space-y-3">
            {quickLinks.map(({key, href}) => (
              <li key={key}>
                <Link
                  href={href}
                  className="rounded-sm text-white/80 outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  {t(`navigation.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-contact-heading">
          <h2 id="footer-contact-heading" className="text-lg font-bold">
            {t('footer.contactHeading')}
          </h2>
          <ul className="mt-5 space-y-4 text-white/80">
            <li>
              <a
                href={`tel:${t('contact.phoneDial')}`}
                className="flex items-start gap-3 rounded-sm outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <Phone aria-hidden="true" className="mt-1 size-4 shrink-0" />
                <span dir="ltr">{t('contact.phone')}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-sm outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <MessageCircle aria-hidden="true" className="mt-1 size-4 shrink-0" />
                <span dir="ltr">{t('contact.whatsapp')}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${t('contact.email')}`}
                className="flex items-start gap-3 rounded-sm outline-none transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <Mail aria-hidden="true" className="mt-1 size-4 shrink-0" />
                <span dir="ltr" className="break-all">{t('contact.email')}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{t('contact.address')}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="footer-hours-heading">
          <h2 id="footer-hours-heading" className="text-lg font-bold">
            {t('footer.workingHours')}
          </h2>
          <div className="mt-5 flex items-start gap-3 text-white/80">
            <Clock3 aria-hidden="true" className="mt-1 size-4 shrink-0" />
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-white">{t('footer.saturdayThursday')}</dt>
                <dd className="mt-1">{t('footer.weekdayHours')}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">{t('footer.friday')}</dt>
                <dd className="mt-1">{t('footer.closed')}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
