import { proxyFetch, imageProxyUrl } from './access';

// All calls go through our own /api/md proxy, which forwards to
// https://api.mangadex.org and adds the access-key check.

export async function searchManga(title, limit = 24) {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  params.set('limit', String(limit));
  params.append('includes[]', 'cover_art');
  params.append('contentRating[]', 'safe');
  params.append('contentRating[]', 'suggestive');
  if (!title) {
    params.set('order[followedCount]', 'desc');
  }

  const res = await proxyFetch(`/api/md/manga?${params.toString()}`);
  if (!res.ok) throw new Error(`search failed: ${res.status}`);
  const json = await res.json();
  return json.data || [];
}

export async function getManga(id) {
  const params = new URLSearchParams();
  params.append('includes[]', 'cover_art');
  params.append('includes[]', 'author');
  params.append('includes[]', 'artist');

  const res = await proxyFetch(`/api/md/manga/${id}?${params.toString()}`);
  if (!res.ok) throw new Error(`manga fetch failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function getChapters(mangaId, language = 'en') {
  const params = new URLSearchParams();
  params.append('translatedLanguage[]', language);
  params.set('order[chapter]', 'asc');
  params.set('limit', '100');
  params.append('includes[]', 'scanlation_group');

  const res = await proxyFetch(
    `/api/md/manga/${mangaId}/feed?${params.toString()}`
  );
  if (!res.ok) throw new Error(`feed fetch failed: ${res.status}`);
  const json = await res.json();
  const chapters = json.data || [];
  // Chapters with an externalUrl point to a publisher site, not
  // MangaDex-hosted pages — /at-home/server returns nothing for these,
  // so they'd open to a blank reader. Exclude them.
  return chapters.filter((ch) => !ch.attributes?.externalUrl);
}

export async function getAtHomeServer(chapterId) {
  const res = await proxyFetch(`/api/md/at-home/server/${chapterId}`);
  if (!res.ok) throw new Error(`at-home fetch failed: ${res.status}`);
  return res.json();
}

// Builds a list of proxied image URLs for a chapter's pages.
export function buildPageUrls(atHome, useDataSaver = false) {
  const { baseUrl, chapter } = atHome;
  const files = useDataSaver ? chapter.dataSaver : chapter.data;
  const quality = useDataSaver ? 'data-saver' : 'data';
  return files.map((fileName) =>
    imageProxyUrl(`${baseUrl}/${quality}/${chapter.hash}/${fileName}`)
  );
}

// Helper to find a manga's cover_art relationship and build its proxied URL.
export function coverUrl(manga, size = 256) {
  const cover = manga.relationships?.find((r) => r.type === 'cover_art');
  const fileName = cover?.attributes?.fileName;
  if (!fileName) return null;
  return imageProxyUrl(
    `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.${size}.jpg`
  );
}

export function mangaTitle(manga) {
  const titles = manga.attributes?.title || {};
  return titles.en || Object.values(titles)[0] || 'Untitled';
}
