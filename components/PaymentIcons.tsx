'use client';

import type {SVGProps} from 'react';

type PaymentIconProps = Omit<SVGProps<SVGSVGElement>, 'height' | 'width'> & {
  size?: number;
};

export function ApplePayIcon({size = 24, ...props}: PaymentIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.2 8.2c-.6-.8-1.6-1.3-2.5-1.3-1.3 0-2.5.8-3.2 2-.7 1.3-.7 3.4.1 5 .7 1.3 1.5 2.7 2.7 2.7 1 0 1.4-.6 2.6-.6 1.1 0 1.5.6 2.5.6 1.3 0 2.1-1.2 2.7-2.3-.8-.4-1.7-1.4-1.7-2.8 0-1.2.7-2.3 1.8-2.9-.7-1-1.9-1.6-3.1-1.7-.9-.1-1.7.5-2.2.5-.6 0-1.4-.5-2.3-.5M10.2 3.8c.5-.6.8-1.4.7-2.2-.7 0-1.6.5-2.1 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.6-.4 2.1-1Z"
      />
      <text x="13.5" y="14.8" fill="currentColor" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif">
        Pay
      </text>
    </svg>
  );
}

export function GooglePayIcon({size = 24, ...props}: PaymentIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="img"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.3 11.1H6.2v2.3h2.9c-.4 1.5-1.6 2.4-2.9 2.4a3.8 3.8 0 1 1 0-7.6c.8 0 1.6.3 2.2.9l1.7-1.7A6.2 6.2 0 1 0 6.2 18c3.6 0 6-2.5 6-6 0-.3 0-.6-.1-.9h-.8Z"
      />
      <text x="13" y="14.8" fill="currentColor" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif">
        Pay
      </text>
    </svg>
  );
}

export function KnetIcon({size = 24, ...props}: PaymentIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="img"
      {...props}
    >
      <rect x="1.5" y="6" width="21" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <text x="12" y="14.2" fill="currentColor" fontSize="5.6" fontWeight="700" fontFamily="Arial, sans-serif" textAnchor="middle">
        KNET
      </text>
    </svg>
  );
}
