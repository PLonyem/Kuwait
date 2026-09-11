import Comparison from '@/components/Comparison';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import ProcessTimeline from '@/components/ProcessTimeline';
import Testimonials from '@/components/Testimonials';
import TrustSignals from '@/components/TrustSignals';
import WhatWeHandle from '@/components/WhatWeHandle';

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
