'use client';

const STORAGE_KEY = 'manga_access_token';

export function getStoredToken() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(STORAGE_KEY) || '';
}

export function setStoredToken(token) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, token);
}

export function clearStoredToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

// Wrapper around fetch that attaches the shared access key header.
// Use this for every call to /api/md/* and /api/image.
export async function proxyFetch(path, options = {}) {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set('x-access-key', token);
  return fetch(path, { ...options, headers });
}

export function imageProxyUrl(absoluteUrl) {
  const token = getStoredToken();
  const params = new URLSearchParams({ url: absoluteUrl });
  if (token) params.set('access_key', token);
  return `/api/image?${params.toString()}`;
}
