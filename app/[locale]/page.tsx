import Comparison from '@/components/Comparison';
import Hero from '@/components/Hero';
import PricingTable from '@/components/PricingTable';
import ProcessTimeline from '@/components/ProcessTimeline';
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
    </>
  );
}
