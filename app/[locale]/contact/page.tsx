import type {Metadata} from 'next';
import {Clock, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import ContactForm from '@/components/ContactForm';
import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl, emailAddress, phoneNumber} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'contact', '/contact');
}

export default async function ContactPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));
  const info = [
    {label: t('contact.phone'), value: phoneNumber, href: `tel:${phoneNumber}`, icon: Phone, ltr: true},
    {label: t('contact.email'), value: emailAddress, href: `mailto:${emailAddress}`, icon: Mail, ltr: true},
    {label: t('contact.address'), value: t('contact.addressValue'), icon: MapPin, ltr: false},
    {label: t('contact.hours'), value: t('contact.hoursValue'), icon: Clock, ltr: false}
  ];

  return (
    <div className="bg-lightBg px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-5xl">
        <PageHeader title={t('contactPage.title')} subtitle={t('contactPage.subtitle')} />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <section className="rounded-2xl bg-primary p-6 text-white shadow-md sm:p-8">
              <MessageCircle aria-hidden="true" className="size-9" />
              <p className="mt-4 text-sm font-semibold text-white/75">{t('contactPage.fastest')}</p>
              <div className="mt-4"><WhatsAppCTA href={whatsappHref} label={t('contactPage.whatsappButton')} ariaLabel={t('whatsapp.ariaLabel')} className="bg-white text-primary" /></div>
              <a href={`tel:${phoneNumber}`} className="mt-5 inline-block rounded-sm font-semibold outline-none hover:underline focus-visible:ring-2 focus-visible:ring-secondary" dir="ltr">{phoneNumber}</a>
            </section>
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map(({label, value, href, icon: Icon, ltr}) => {
                const content = <><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Icon aria-hidden="true" className="size-5" /></span><span><strong className="block text-primary">{label}</strong><span className="mt-1 block break-words text-sm text-gray-600" dir={ltr ? 'ltr' : undefined}>{value}</span></span></>;
                return href ? <a key={label} href={href} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary">{content}</a> : <div key={label} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">{content}</div>;
              })}
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-md">
          <iframe
            title={t('contactPage.mapTitle')}
            src="https://www.google.com/maps?q=Kuwait%20City%2C%20Kuwait&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
