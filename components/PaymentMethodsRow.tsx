'use client';

import {useTranslations} from 'next-intl';

import {ApplePayIcon, GooglePayIcon, KnetIcon} from '@/components/PaymentIcons';

type PaymentMethodsRowProps = {
  variant?: 'compact' | 'default' | 'expanded';
  showLabel?: boolean;
  className?: string;
};

export default function PaymentMethodsRow({
  variant = 'default',
  showLabel = true,
  className = ''
}: PaymentMethodsRowProps) {
  const t = useTranslations('paymentMethods');
  const isCompact = variant === 'compact';
  const size = isCompact ? 20 : variant === 'expanded' ? 28 : 24;
  const note = variant === 'expanded' ? t('fullDetailsNote') : t('detailsNote');

  return (
    <div className={`text-start ${className}`} role="group" aria-label={t('label')}>
      {showLabel && !isCompact && (
        <p data-payment-label className="mb-2 text-xs text-gray-500">
          {t('label')}
        </p>
      )}
      <div data-payment-icons className="flex items-center gap-3 text-gray-400">
        <KnetIcon
          size={size}
          aria-label={t('knet')}
          data-payment-icon
          className="shrink-0 transition-colors duration-200 hover:text-primary"
        />
        <ApplePayIcon
          size={size}
          aria-label={t('applePay')}
          data-payment-icon
          className="shrink-0 transition-colors duration-200 hover:text-primary"
        />
        <GooglePayIcon
          size={size}
          aria-label={t('googlePay')}
          data-payment-icon
          className="shrink-0 transition-colors duration-200 hover:text-primary"
        />
      </div>
      {!isCompact && (
        <p data-payment-note className="mt-2 text-xs italic text-gray-400">
          {note}
        </p>
      )}
    </div>
  );
}
