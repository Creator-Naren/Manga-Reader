# 🎌 Manga Reader

<p align="center">
  <img src="https://github.com/user-attachments/assets/b784960a-778b-4ec1-b0e2-a494fa4c03a9" alt="Mangareadr banner" width="720" />
</p>

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/Creator-Naren/Manga-Reader?style=social)](https://github.com/Creator-Naren/Manga-Reader)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)](#)

</div>

---

A sleek, lightweight, and distraction-free manga reader built with JavaScript — designed for fast, comfortable binge-reading on any device.

## ✨ Highlights

- Clean, minimal UI focused on the reading experience
- Smooth image transitions and keyboard navigation (← / →)
- Lightweight: vanilla JS-first approach, no heavy frameworks required
- Extensible: add new image sources or adapters easily

## 🚀 Quick Demo
Open `index.html` in your browser or run a simple static server to preview the app.

## 🛠️ Quick Start

```bash
# Clone & install
git clone https://github.com/Creator-Naren/Manga-Reader.git
cd Manga-Reader
npm install

# Run in development (if the project has a dev script)
npm start

# Or serve the folder directly
npx serve . # or: python -m http.server 8000
```

Then open http://localhost:3000 (or the port your server prints).

## 🎛️ Features

- Page-by-page reader with keyboard shortcuts and fullscreen toggle
- Continuous scroll mode and fit-to-width / zoom controls
- Support for local image folders or remote image lists
- Simple proxy support to avoid CORS/hotlinking issues

## 🧩 How to Extend

- Create a source adapter that returns an ordered array of image URLs.
- Customize look & feel by editing `styles/` or `styles.css`.
- Add bookmarking or sync via a small backend (e.g., Supabase or localStorage).

## 📁 Project Structure

```
/ (root)
├─ index.html        # Entry page
├─ src/              # JavaScript source
├─ styles/           # CSS styles
└─ assets/           # Images, icons, sample manga
```

## 🐛 Troubleshooting

- Images not loading: make sure paths are correct and any proxy endpoints can reach image hosts.
- Access issues: confirm tokens or local permissions if the app shows a locked view.

## 🤝 Contributing

Contributions welcome — open an issue or submit a PR.

1. Fork the repository
2. Create a feature branch (git checkout -b feature/your-thing)
3. Make changes and add tests if applicable
4. Open a pull request with a clear description

## 🧾 License

Add a LICENSE file (for example MIT) to make the project license explicit.

---

Built with ❤️ by [Creator-Naren](https://github.com/Creator-Naren) — enjoy reading!
