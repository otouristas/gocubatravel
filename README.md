# gocuba.travel

Next.js App Router site migrated from [skydream.gr](https://www.skydream.gr). Same slugs, Greek source copy plus English, GO CUBA brand.

- **Header / footer** match the live Skydream menus, legal links, phone, email, Skype, socials, certifications, ΜΗΤΕ number, cookie notice, and sister-brand line.
- **Hotel template** — intro, facilities, rooms, restaurants, address, gallery, enquiry.
- **`/tours`** — cubatours-style product pages (`/el/tours/[slug]`), original WP slugs still resolve.
- **Hidden / draft (yellow)** URLs keep the same slug and send `noindex`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (redirects to `/el`).

## Deploy to Cloudflare Workers

The primary deployment target is Cloudflare Workers through vinext and the Cloudflare CLI.
`cloudflare.config.ts` defines the Worker and `vite.config.ts` connects the Next.js App Router
to Cloudflare's Workers runtime. The project intentionally uses no Cloudflare storage bindings:
all current pages are generated from the bundled content records.

Use Node.js 22.18 or newer.

```bash
npm install
npm run dev:workers
```

Open the local URL printed by Vite. Validate the production-shaped Cloudflare bundle without
uploading it:

```bash
npm run build:workers
```

After authenticating with Cloudflare (`cf auth login`), deploy with:

```bash
npm run deploy:workers
```

The Worker name is `gocuba-travel`. The deployment does not configure a custom domain; attach
`gocuba.travel` to the Worker in Cloudflare after confirming the account and zone are the intended
ones.

## Deploy to Netlify (legacy)

The site builds with zero configuration on Netlify: `netlify.toml` sets the build command, the
publish directory, and Node 22. Netlify installs and updates the Next.js runtime itself, so no
adapter is pinned in `package.json`.

1. In Netlify, choose **Add new project → Import an existing project** and pick
   [otouristas/gocubatravel](https://github.com/otouristas/gocubatravel).
2. Keep the detected settings (`npm run build`, publish `.next`) and deploy.
3. Point the `gocuba.travel` domain at the project under **Domain management**.

No environment variables are required — all content ships in `src/content/records.ts`, and remote
images are served from `skydream.gr` (allow-listed in `next.config.ts`). That dependency on the
old domain, and how to end it, is documented in [`docs/image-hosting.md`](docs/image-hosting.md).

To deploy from the command line instead:

```bash
npx netlify-cli deploy --build --prod
```
