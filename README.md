# ✨ Panel — A Minimalist MangaDex Reader

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**An ad-free, beautifully minimal manga reader.** Read from MangaDex on your phone, tablet, or laptop. Once deployed, it's yours to keep.

[Features](#-what-youre-getting) • [Setup](#-quick-start) • [Deploy](#-deploying-to-vercel) • [Design](#-design-philosophy)

</div>

---

## 🎨 What You're Getting

A deliberately **focused** v1 release—the essentials, nothing more:

- ✅ **Smart Search & Browse** — Filter by ratings (safe/suggestive content by default)
- ✅ **Manga Details** — Beautiful chapter lists in English with metadata
- ✅ **Page-by-Page Reader** — Keyboard navigation, optimized for mobile & desktop
- ✅ **Backend Proxy** — Handles MangaDex's CORS & hotlink restrictions transparently
- ✅ **Shared-Secret Auth** — Keep your deployment private with a single access token

### 🚀 Coming Soon (Planned)

- 📍 **Reading Progress & Bookmarks** — Track your spot across devices (Supabase integration ready)
- 📱 **PWA Support** — Add to home screen in one tap

---

## 🔧 Why a Proxy? (The Technical Bit)

MangaDex's API doesn't send CORS headers to browser requests and actively blocks hotlinked images. Panel solves this elegantly:

```
Your Browser
    ↓
Panel's API Routes (/api/md, /api/image)
    ↓
MangaDex API & Image CDN (server-to-server, no CORS issues)
```

- **`/api/md/[...path]`** — Forwards API calls to `api.mangadex.org` server-side
- **`/api/image`** — Streams validated images from `uploads.mangadex.org` or `*.mangadex.network`

The frontend never touches MangaDex directly. Pure elegance.

---

## 🏃 Quick Start

### Local Development

```bash
# Clone & install
git clone https://github.com/Creator-Naren/Manga-Reader.git
cd Manga-Reader
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local and set ACCESS_TOKEN to a strong random string
# Example: ACCESS_TOKEN=your_super_secret_key_here_12345

# Run the dev server
npm run dev
```

Open **http://localhost:3000** and enter your access token when prompted. It'll be saved in localStorage for next time.

---

## 🚀 Deploying to Vercel

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Import on Vercel
Go to [vercel.com](https://vercel.com) → **Add New Project** → Select this repo

### 3. Add Environment Variables
- **Project Settings** → **Environment Variables**
- Add `ACCESS_TOKEN` with the same value from your `.env.local`

### 4. Deploy & Done
Click **Deploy**. Open your live URL on mobile, enter the access key once—it's saved to that browser. Use the same key on any device.

---

## 🎭 Design Philosophy

Every detail reflects manga itself:

- **Dark theme with bold panel borders** — Visual nod to manga panel gutters and screentone halftones (check the header 👆)
- **Anton font (headers)** — Bold, poster-like energy. Peak manga cover aesthetic.
- **Inter (body text)** — Clean, readable, gets out of the way
- **JetBrains Mono (metadata)** — Technical, precise, chapters & details
- **Minimal UI** — No ads, no clutter, pure reading

---

## ⚖️ Respect the Source

**MangaDex's Acceptable Usage Policy requires:**

1. ✅ Credit scanlation groups (shown per-chapter)
2. ✅ Credit MangaDex (in footer)
3. ✅ No ads or paid services
4. ✅ No commercial use

Panel bakes these in. Keep them as-is if you modify the code.

---

## 📋 Roadmap

- [x] **v1 Core** — Search, browse, read, proxy
- [x] **Authentication** — Private access token
- [ ] **v1.1** — Reading progress & bookmarks (Supabase)
- [ ] **v1.2** — PWA manifest (install to home screen)
- [ ] **Future** — Offline sync, custom reading lists, social features

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 14.2.5 |
| **UI** | React 18.3.1 |
| **Styling** | Tailwind CSS 3.4.4 |
| **API** | Next.js Route Handlers |
| **Data Source** | MangaDex Public API |

---

## 🐛 Troubleshooting

### "Invalid access token" on localhost
Make sure your `ACCESS_TOKEN` in `.env.local` matches what you entered in the browser.

### Images not loading
Check that your proxy routes can reach `uploads.mangadex.org`. If deployed behind a restrictive firewall, you may need to adjust CORS headers.

### Search returns no results
Content rating is filtered to `safe` + `suggestive` by default in `lib/mangadex.js`. Adjust the `contentRating` filter if needed.

---

## 📄 License

[MIT License](LICENSE) — Use, modify, and distribute freely. See LICENSE for details.

---

<div align="center">

Built with ❤️ for manga lovers by [Creator-Naren](https://github.com/Creator-Naren)

Questions? Open an [issue](https://github.com/Creator-Naren/Manga-Reader/issues) or check the [MangaDex API docs](https://api.mangadex.org/docs/)

**Read, enjoy, respect the source.** 📖✨

</div>
