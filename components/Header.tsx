'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Menu, Phone, Route, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

import {Link, usePathname} from '@/navigation';

import LanguageToggle from './LanguageToggle';

const navigationItems = [
  {key: 'home', href: '/'},
  {key: 'services', href: '/services'},
  {key: 'requirements', href: '/requirements'},
  {key: 'pricing', href: '/pricing'},
  {key: 'process', href: '/process'},
  {key: 'about', href: '/about'},
  {key: 'contact', href: '/contact'}
] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusableElements = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-[60] h-16 bg-background transition-shadow duration-300 lg:h-20 ${
        isScrolled ? 'shadow-[0_8px_24px_rgba(27,94,32,0.10)]' : ''
      }`}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8">
        <Link
          href="/"
          locale={locale}
          className="group flex w-fit items-center gap-2 rounded-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
          aria-label={t('header.homeAriaLabel')}
        >
          <span className="grid size-10 place-items-center rounded-full bg-primary text-white transition-colors group-hover:bg-secondary lg:size-11">
            <Route aria-hidden="true" className="size-5 lg:size-6" />
          </span>
          <span className="whitespace-nowrap font-english text-sm font-bold tracking-[0.08em] sm:text-base">
            {t('brand.name')}
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-4 xl:gap-6 lg:flex"
          aria-label={t('header.primaryNavigation')}
        >
          {navigationItems.map(({key, href}) => (
            <Link
              key={key}
              href={href}
              locale={locale}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`relative whitespace-nowrap rounded-sm py-2 text-[0.9rem] font-semibold outline-none transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-secondary ${
                isActive(href)
                  ? 'text-primary after:scale-x-100'
                  : 'text-text after:hover:scale-x-100'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-4 lg:flex">
          <LanguageToggle />
          <a
            href={`tel:${t('contact.phoneDial')}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/20 px-3 py-2 text-sm font-semibold text-primary outline-none transition-colors hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            aria-label={t('header.callAriaLabel', {phone: t('contact.phoneValue')})}
          >
            <Phone aria-hidden="true" className="size-4" />
            <span dir="ltr">{t('contact.phoneValue')}</span>
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="justify-self-end rounded-md p-2 text-primary outline-none transition-colors hover:bg-lightBg focus-visible:ring-2 focus-visible:ring-secondary lg:hidden"
          aria-label={t('header.openMenu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <Menu aria-hidden="true" className="size-7" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={t('header.mobileNavigation')}
            className="fixed inset-0 z-[70] flex min-h-dvh flex-col bg-background px-6 py-5 lg:hidden"
            initial={{x: locale === 'ar' ? '100%' : '-100%'}}
            animate={{x: 0}}
            exit={{x: locale === 'ar' ? '100%' : '-100%'}}
            transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                locale={locale}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-primary"
              >
                <span className="grid size-10 place-items-center rounded-full bg-primary text-white">
                  <Route aria-hidden="true" className="size-5" />
                </span>
                <span className="font-english text-sm font-bold tracking-[0.08em]">
                  {t('brand.name')}
                </span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md p-2 text-primary outline-none transition-colors hover:bg-lightBg focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label={t('header.closeMenu')}
              >
                <X aria-hidden="true" className="size-7" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-1"
              aria-label={t('header.mobileNavigation')}
            >
              {navigationItems.map(({key, href}, index) => (
                <motion.div
                  key={key}
                  initial={{opacity: 0, y: 14}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.04 * index}}
                >
                  <Link
                    href={href}
                    locale={locale}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className={`block rounded-lg px-4 py-3 text-xl font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-secondary ${
                      isActive(href)
                        ? 'bg-primary/10 text-primary underline decoration-2 underline-offset-8'
                        : 'text-text hover:bg-lightBg hover:text-primary'
                    }`}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 pt-5">
              <LanguageToggle />
              <a
                href={`tel:${t('contact.phoneDial')}`}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                aria-label={t('header.callAriaLabel', {phone: t('contact.phoneValue')})}
              >
                <Phone aria-hidden="true" className="size-4" />
                <span dir="ltr">{t('contact.phoneValue')}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
