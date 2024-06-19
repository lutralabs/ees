import { type NextRequest, NextResponse } from 'next/server';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
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

    return response;
  }

  const response = NextResponse.next();

  if (request.nextUrl.searchParams.get('intro') === 'true') {
    response.headers.set('Set-Cookie', 'intro=true');
  }

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|icons).*)',
};
