import { NextResponse } from 'next/server';

// Protects /api/* routes with a shared secret so this proxy can't be
// used by random visitors who stumble on the deployed URL.
// Set ACCESS_TOKEN in your environment. If it's not set, the check is
// skipped (useful for local dev), but you should always set it once deployed.
export function middleware(request) {
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const required = process.env.ACCESS_TOKEN;
  if (!required) return NextResponse.next();

  const provided =
    request.headers.get('x-access-key') ||
    request.nextUrl.searchParams.get('access_key');
  if (provided !== required) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/md/:path*', '/api/image/:path*'],
};
