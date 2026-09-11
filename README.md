# Taysir Licensing

Arabic-first, bilingual website for a Kuwait driving-license concierge service. The application uses locale-prefixed routes (`/ar` and `/en`), RTL/LTR layouts, translated content, WhatsApp conversion flows, and localized SEO metadata.

## Tech stack

- Next.js 15 App Router and React 18
- TypeScript
- Tailwind CSS
- next-intl
- Framer Motion
- Lucide React

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and replace the placeholder contact values.

3. Start development:

   ```bash
   npm run dev
   ```

The root URL redirects to `/ar`. English content is available at `/en`.

## Validation and production build

```bash
npm run type-check
npm run build
npm run start
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number in international format without `+` or spaces |
| `NEXT_PUBLIC_PHONE_NUMBER` | Display and click-to-call phone number |
| `NEXT_PUBLIC_EMAIL` | Public contact email address |

The placeholder fallbacks are safe for development but must be replaced before launch.

## Content and pricing updates

All public copy is stored in `messages/ar.json` and `messages/en.json`. Keep the same key structure in both files. Homepage and pricing-page plans live under the `pricing` namespace; additional services and government fees live under `pricingPage`.

The downloadable requirements checklists are in `public/documents`. Regenerate both localized PDFs whenever the requirements change.

## Project structure

- `app/` - localized routes, layouts, metadata routes, loading, and error states
- `components/` - shared navigation, homepage sections, and interactive controls
- `lib/` - locale, contact-link, and SEO helpers
- `messages/` - Arabic and English content
- `public/` - social image, icons, and downloadable documents
- `vercel.json` - redirect, security headers, and Dubai function region

## Vercel deployment

Import the GitHub repository into Vercel with the repository root as the project root. Use the Next.js preset, add the three public environment variables, and deploy. `vercel.json` selects the Dubai (`dxb1`) function region and redirects `/` to `/ar`.

Before production launch, replace the placeholder phone and WhatsApp values, verify the custom domain used by metadata, and run a Lighthouse audit against the deployed URL.
