# Panel — personal MangaDex reader (v1)

A minimal, ad-free manga reader. Browse and search MangaDex, read chapters
page-by-page. Built to be deployed once and used from your phone and laptop.

## What's in this version (v1) and what's not

This is deliberately scoped to the **proxy + reader** layer only:

- ✅ Search and browse (filtered to safe/suggestive content ratings)
- ✅ Manga detail page with English chapter list
- ✅ Page-by-page reader with keyboard navigation
- ✅ Backend proxy for both API calls and images (required by MangaDex's
  CORS/hotlink policy — see the `app/api/md` and `app/api/image` routes)
- ✅ Shared-secret gate so a public deployment isn't an open relay for
  random visitors

**Not included yet** (intentionally — adding both at once makes debugging
much harder):

- ❌ Reading progress / bookmarks. For now, your browser's history and
  MangaDex's own "continue reading" via the manga page is your bookmark.
  If you want cross-device sync, the next step is a Supabase table for
  `progress (manga_id, chapter_id, page, updated_at)` plus two API routes
  — happy to build that as a follow-up once this base is working.
- ❌ PWA manifest (add-to-home-screen). Trivial to add once you've
  confirmed the core reader works on your phone's browser.

## How the proxy works (why it's needed)

MangaDex's API does **not** send CORS headers to third-party origins, and
explicitly prohibits hotlinking their image domains. So:

- `app/api/md/[...path]/route.js` — forwards any GET request to
  `api.mangadex.org/<path>`, server-side (no CORS issue, since it's
  server-to-server).
- `app/api/image/route.js` — takes `?url=<mangadex image url>`, checks the
  hostname is `uploads.mangadex.org` or `*.mangadex.network`, and streams
  the image back. This covers both cover images and chapter pages.

The frontend never talks to `*.mangadex.org` directly — only to your own
`/api/*` routes.

## Setup

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and set ACCESS_TOKEN to a long random string
npm run dev
```

Open http://localhost:3000. On first load you'll be asked for the access
key — enter the same string you put in `ACCESS_TOKEN`.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. Import it on vercel.com.
3. In Project Settings → Environment Variables, add `ACCESS_TOKEN` with
   the same value as your `.env.local`.
4. Deploy. Open the URL on your phone, enter the access key once — it's
   stored in that browser's localStorage.

## Notes on the design

- Dark theme with high-contrast panel borders, deliberately referencing
  manga panel gutters and screentone (the halftone dots in the header).
- "Anton" for display type (bold, poster-like — manga cover energy),
  "Inter" for body text, "JetBrains Mono" for chapter numbers and
  metadata.
- Content rating is filtered to `safe` + `suggestive` by default in
  `lib/mangadex.js` — change this in `searchManga()` if you want
  `erotica`/`pornographic` included.

## Compliance reminder

MangaDex's Acceptable Usage Policy requires crediting scanlation groups
and prohibits ads/paid services on apps using their API. The footer
already credits MangaDex and scanlation groups (shown per-chapter on the
manga page); keep both of those as-is if you extend this.
