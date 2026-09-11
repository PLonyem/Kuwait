import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';

import PageHeader from '@/components/PageHeader';
import RequirementsTabs from '@/components/RequirementsTabs';
import {getPageLocale, type LocalePageProps} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(await getPageLocale(params), 'requirements', '/requirements');
}

export default async function RequirementsPage({params}: LocalePageProps) {
  const locale = await getPageLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'requirementsPage'});

  return (
    <div className="bg-lightBg px-6 pb-20 pt-24 lg:pb-28">
      <div className="mx-auto max-w-4xl">
        <PageHeader title={t('title')} subtitle={t('subtitle')} />
        <RequirementsTabs />
      </div>
    </div>
  );
}
