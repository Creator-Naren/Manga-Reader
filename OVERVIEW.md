# Manga Reader Repository Overview

## What this is
A privacy-focused web app that reads manga from MangaDex through a secure proxy layer, offering a distraction-free reading experience with server-side access control and image proxying to respect hotlinking restrictions.

### Stack
- **Language(s):** JavaScript
- **Framework / runtime:** Next.js 14 (App Router)
- **Notable libraries:** React 18, Tailwind CSS, PostCSS, Autoprefixer

## How it's organized

```
/ (root)
├─ app/                    Next.js App Router structure
│  └─ api/
│     └─ image/           Image proxy endpoint to stream MangaDex images
├─ components/            Client-side React components
│  └─ AccessGate.js       Access control UI (password gate)
├─ lib/                   Utility modules
│  ├─ access.js           Token management, proxyFetch wrapper, imageProxyUrl helper
│  └─ mangadex.js         MangaDex API client (search, chapters, metadata)
├─ middleware.js          Next.js middleware for access token validation
├─ package.json           Dependencies (Next.js, React, Tailwind)
├─ tailwind.config.js     Tailwind CSS config with custom color scheme
├─ next.config.mjs        Next.js config
└─ README.md              User documentation
```

**How it fits together:** On startup, the user enters an access key through the `AccessGate` component, which stores the token in localStorage. Subsequent requests use `proxyFetch` to attach the token as an `x-access-key` header. The middleware validates this header against the `ACCESS_TOKEN` environment variable. When fetching manga data, `lib/mangadex.js` calls the MangaDex API through `/api/md/*` endpoints; when loading images, the app routes URLs through `/api/image`, which validates the host against an allowlist and streams responses with caching headers to bypass hotlinking restrictions.

## How to run it

```bash
# Clone & install
git clone https://github.com/Creator-Naren/Manga-Reader.git
cd Manga-Reader
npm install

# Development
npm run dev
# Open http://localhost:3000

# Production build
npm run build
npm start

# Linting
npm run lint
```

Set the `ACCESS_TOKEN` environment variable before deployment to protect your instance.

## Try asking

- How does the MangaDex API integration work and what endpoints does the app use?
- What custom CSS classes are defined for the manga reader UI (the "panel", "ink", "paper", "accent" styles)?
- How are images cached and what are the performance implications of proxying through `/api/image`?
