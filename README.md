# Velmont Estates

A React and TypeScript property website for Pathankot, Gurdaspur, and Amritsar, hosted on Netlify.

## Listings and administration

Public listings load from `/api/projects`. Netlify Database stores the shared portfolio; schema definitions live in `db/schema.ts`, and migrations live in `netlify/database/migrations`. Netlify applies migrations during deployment. Do not apply them manually.

The `/admin` page uses Netlify Identity. Every create, update, and delete request also checks the authenticated user's server-controlled `admin` role in the function. There is no public registration form and no automatic administrator assignment.

To activate the first administrator:

1. Open the project's Identity section in the Netlify dashboard and invite the intended administrator.
2. Follow the invitation link to set a password on the site.
3. In the Identity user details, assign the `admin` role and save.
4. Sign in again at `/admin` to refresh the role.

Set Identity registration to invite-only for an administrator-only user directory. An ordinary account cannot manage listings even if registration is open.

The original three portfolio examples are seeded as illustrative listings. Their stock photos and unconfirmed details are explicitly disclosed. Replace them with verified photos, prices, area, availability, and applicable RERA details before promoting them as actual inventory. Gallery images use HTTPS URLs, with up to eight additional images per listing. Prices are optional whole rupee amounts; listings without prices do not appear in budget-filtered results.

Old browser-only listings are not automatically published or uploaded. If a browser contains custom entries from the previous version, recreate the verified entries in the administrator page. The old `velmont_projects` browser value is left untouched.

## Enquiries

The contact form uses Netlify Forms with a static registration form in `public/__forms.html`, matching fields, and a honeypot. Property enquiries include the selected listing ID and title. Submissions are available in the project's Forms section after deployment. Configure email notifications in Forms → Submission notifications if email alerts are desired. The previous EmailJS dependency and configuration are no longer used.

The form reports server errors and retains the message for retry. Browser tests intercept submissions, so automated checks do not create real enquiries or send email.

## Search and metadata

Public filters are reflected in the URL and can be shared. The website includes descriptive route titles, canonical URLs, social metadata, a privacy notice, structured data for the business and verified properties, robots instructions, and a database-backed sitemap. Illustrative property pages and administration are marked `noindex`.

Route metadata is updated in the browser. Crawlers that do not execute JavaScript see the shared HTML metadata; full prerendering remains a separate enhancement. The sitemap uses the current production domain; update the domain in the metadata component, sitemap function, robots file, and HTML if a custom domain is introduced.

## Development and checks

Install dependencies with `npm ci`. Use `netlify dev --port 8889` to run the app with Netlify Functions and Identity support.

- `npm run typecheck` checks frontend and function types without emitting files.
- `npm run lint` checks source style and React hooks.
- `npm test` checks listing validation and unauthenticated API rejection.
- `npx playwright install chromium` installs the browser used by the interaction checks.
- `npm run test:browser` runs browser checks against an already running Netlify development server on port 8889.

Browser checks use mocked listing responses and form submissions. Database persistence and real invitation / email delivery require verification on a deployed site after automatic migrations and the first administrator setup.
