// Streams images from MangaDex's CDN / MangaDex@Home nodes through our
// own server. This is required because MangaDex explicitly disallows
// hotlinking their image domains from third-party origins.
const ALLOWED_HOSTS = [
  'uploads.mangadex.org',
  // MangaDex@Home nodes are arbitrary subdomains of mangadex.network
];

function isAllowedHost(hostname) {
  if (ALLOWED_HOSTS.includes(hostname)) return true;
  if (hostname.endsWith('.mangadex.network')) return true;
  return false;
}

export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return Response.json({ error: 'missing_url' }, { status: 400 });
  }

  let target;
  try {
    target = new URL(url);
  } catch {
    return Response.json({ error: 'invalid_url' }, { status: 400 });
  }

  if (target.protocol !== 'https:' || !isAllowedHost(target.hostname)) {
    return Response.json({ error: 'host_not_allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(target.toString());
    if (!upstream.ok || !upstream.body) {
      return Response.json(
        { error: 'upstream_error', status: upstream.status },
        { status: upstream.status }
      );
    }

    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) headers.set('Content-Type', contentType);
    // Images are content-addressed by MangaDex (hash in path), safe to cache.
    headers.set('Cache-Control', 'public, max-age=86400, immutable');

    return new Response(upstream.body, { status: 200, headers });
  } catch (err) {
    return Response.json(
      { error: 'fetch_failed', detail: String(err) },
      { status: 502 }
    );
  }
}
