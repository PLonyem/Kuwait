import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';

import {defaultLocale, routing} from './i18n';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
  runtime: 'nodejs'
};
