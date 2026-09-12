'use client';

import {useEffect} from 'react';

function isPageReload() {
  const navigation = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navigation?.type === 'reload' || performance.navigation?.type === 1;
}

export default function ScrollRestoration() {
  useEffect(() => {
    if (!isPageReload()) return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    const timeout = window.setTimeout(() => {
      window.scrollTo(0, 0);

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    }, 150);

    return () => {
      window.clearTimeout(timeout);

      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
