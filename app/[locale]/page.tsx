import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import Comparison from '@/components/Comparison';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import TrustSignals from '@/components/TrustSignals';
import WhatWeHandle from '@/components/WhatWeHandle';

type HomePageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata.home'});
  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_KW' : 'en_KW',
      alternateLocale: locale === 'ar' ? ['en_KW'] : ['ar_KW'],
      title,
      description
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
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
