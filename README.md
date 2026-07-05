# Novoriq Blog

The public Novoriq website and reconciliation guide, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

## Routes

- `/` — Novoriq homepage
- `/blog` — guide index
- `/blog/reconcile-payment-exports-with-bank-deposits` — payment export reconciliation guide

## Editing content

The main article, its page metadata, FAQ content, and JSON-LD live in `app/blog/reconcile-payment-exports-with-bank-deposits/page.tsx`. Shared site details and the beta email link live in `lib/site.ts`. Reusable page sections are in `components/`.

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment if it is not `https://novoriqblog.netlify.app`.

## Preparing for Google indexing

1. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in the deployment environment.
2. Deploy the site.
3. Confirm these URLs work:
   - `/`
   - `/blog`
   - `/sitemap.xml`
   - `/robots.txt`
4. Add and verify the domain in Google Search Console.
5. Submit `https://your-domain.com/sitemap.xml` in the Sitemaps report.
6. Open URL Inspection for `/blog/reconcile-payment-exports-with-bank-deposits`.
7. Run the live URL test and request indexing.
8. Keep publishing useful pages and connecting them with relevant internal links each week.
