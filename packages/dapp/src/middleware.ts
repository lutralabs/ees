import { type NextRequest, NextResponse } from 'next/server';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function middleware(request: NextRequest) {
  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Check path
  if (request.nextUrl.pathname === '/') {
    // Read cookies
    const intro = request.cookies.get('intro');

    if (!intro) {
      const redirectResponse = NextResponse.redirect(
        new URL('/?intro=true', request.url)
      );
      redirectResponse.cookies.set('intro', 'true', { path: '/' });
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
