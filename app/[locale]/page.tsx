import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import Comparison from '@/components/Comparison';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Hero from '@/components/Hero';
import LicenseCategoriesGrid from '@/components/LicenseCategoriesGrid';
import PricingTable from '@/components/PricingTable';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import TrustSignals from '@/components/TrustSignals';
import WhatWeHandle from '@/components/WhatWeHandle';
import {emailAddress, phoneNumber} from '@/lib/contact';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata, siteUrl} from '@/lib/seo';

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'home');
}

export default async function HomePage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale});
  const faqItems = t.raw('faq.items') as Array<{q: string; a: string}>;
  const services = t.raw('services.items') as Array<{title: string; description: string}>;
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Taysir Licensing',
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/images/og-image.jpg`,
    telephone: phoneNumber,
    email: emailAddress,
    address: {'@type': 'PostalAddress', addressLocality: t('contact.addressValue'), addressCountry: 'KW'},
    openingHours: 'Sa-Th 09:00-18:00',
    aggregateRating: {'@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127'}
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({'@type': 'Question', name: item.q, acceptedAnswer: {'@type': 'Answer', text: item.a}}))
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': services.map((service) => ({'@type': 'Service', name: service.title, description: service.description, provider: {'@type': 'LocalBusiness', name: 'Taysir Licensing'}, areaServed: {'@type': 'Country', name: 'Kuwait'}}))
  };

  return (
    <>
      {[localBusinessSchema, faqSchema, serviceSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}} />
      ))}
      <Hero />
      <LicenseCategoriesGrid />
      <Comparison />
      <WhatWeHandle />
      <ProcessTimeline />
      <TrustSignals />
      <PricingTable />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
