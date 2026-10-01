# VALYNEX

Arabic-first B2B medical and laboratory website for Egypt. Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. Uses the owner-supplied original logo and ImageGen-created illustrative laboratory photography, optimized as WebP. No Higgsfield. Images do not represent verified company facilities, staff, inventory, or product models. See ASSETS.md for provenance and generation prompts. Transitions respect reduced motion.

## Run

Node.js 20.9 or later. Install with `npm ci` once the lockfile is present (otherwise `npm install`), then `npm run dev`. Validate with `npm run typecheck` and `npm run build`.

## Vercel

Import this repository in Vercel, select Next.js, and use the repository root. The standard build command is `npm run build`. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production domain, then deploy. The Vercel production domain is used automatically if that setting is absent; localhost is only the local fallback. Redeploy after changing the domain, then verify canonical URLs, robots.txt, and sitemap.xml.

## Content and quote flow

Routes: `/`, `/about`, `/products`, `/contact`. Category content lives in `lib/site.ts`; these are solution categories, not verified inventory. No invented certifications, customer logos, quantified outcomes, pricing, address, or email. Confirm actual offering scope with the business owner before launch.

WhatsApp: +20 103 777 9413. Category quote links prefill context. The contact form validates required fields and builds a message locally, then shows a link to WhatsApp. The visitor reviews and sends the message themselves. No backend, storage, analytics, or outgoing messages from the website. Do not collect patient information.

SEO: unique Arabic page titles/descriptions, canonical URLs, Organization JSON-LD, sitemap, robots, social metadata, and custom favicon. Accessibility: RTL semantic markup, keyboard focus, skip link, labeled fields, mobile menu state, reduced-motion support, and decorative artwork hidden from assistive technology.

## Launch checklist

- Confirm catalog categories and company copy.
- Configure the final production domain.
- Verify the receiving WhatsApp number on an actual mobile device.
- Review all pages at phone and desktop widths.
- Connect GitHub to Vercel so changes deploy from GitHub.
