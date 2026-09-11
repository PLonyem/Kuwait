'use client';

import {motion, useReducedMotion} from 'framer-motion';

type WhatsAppCTAProps = {
  href: string;
  label: string;
  ariaLabel: string;
  className?: string;
};

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor" className="size-6 shrink-0">
      <path d="M16.04 3A12.85 12.85 0 0 0 5.16 22.7L3.34 29l6.45-1.69A12.83 12.83 0 1 0 16.04 3Zm0 23.5a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.83 1 1.02-3.73-.25-.39A10.65 10.65 0 1 1 16.04 26.5Zm5.84-7.97c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.62 9.62 0 0 1-1.78-2.21c-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function WhatsAppCTA({href, label, ariaLabel, className = ''}: WhatsAppCTAProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. ${ariaLabel}`}
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-cta px-7 py-3.5 font-bold text-gray-900 shadow-[0_8px_24px_rgba(37,211,102,0.24)] outline-none transition-shadow duration-200 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-primary/25 focus-visible:ring-offset-4 ${className}`}
      whileHover={reduceMotion ? undefined : {scale: 1.04}}
      whileFocus={reduceMotion ? undefined : {scale: 1.04}}
      whileTap={reduceMotion ? undefined : {scale: 0.98}}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </motion.a>
  );
}
