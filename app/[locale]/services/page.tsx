import type {Metadata} from 'next';
import {Car, Check, Clock3, FileText, GraduationCap, Stethoscope, WalletCards, type LucideIcon} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import {createWhatsAppUrl} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

type Service = {title: string; description: string; includes: string[]; price: string; timeline: string};
const icons: LucideIcon[] = [Car, FileText, GraduationCap, Stethoscope];

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'services', '/services');
}

export default async function ServicesPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const services = t.raw('services.items') as Service[];
  const whatsappHref = createWhatsAppUrl(t('whatsapp.prefilledMessage'));

  return (
    <div className="bg-lightBg px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-5xl">
        <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />
        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <article key={service.title} className="grid gap-7 rounded-2xl bg-white p-6 shadow-md sm:p-8 md:grid-cols-[auto_1fr]">
                <span className="grid size-16 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/15">
                  <Icon aria-hidden="true" className="size-8" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{service.title}</h2>
                  <p className="mt-4 leading-8 text-gray-600">{service.description}</p>
                  <h3 className="mt-6 font-bold text-gray-800">{t('services.includes')}</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-700">
                        <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid gap-3 rounded-xl bg-lightBg p-4 sm:grid-cols-2">
                    <p className="flex items-start gap-2"><WalletCards aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" /><span><strong>{t('services.priceLabel')}:</strong> {service.price}</span></p>
                    <p className="flex items-start gap-2"><Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" /><span><strong>{t('services.timelineLabel')}:</strong> {service.timeline}</span></p>
                  </div>
                  <div className="mt-6"><WhatsAppCTA href={whatsappHref} label={t('services.cta')} ariaLabel={`${t('services.cta')} — ${service.title}`} /></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
