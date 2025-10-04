import { NextResponse } from 'next/server';
import * as jose from 'jose';
import { getJwtToken } from './helpers/backend/getJwtToken';
import { TOKEN } from './assets/constants';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = getJwtToken();

  // Paths that don't require authentication
  const exemptPaths = ['/about', '/reset-password'];

  if (exemptPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to signup if no token and not on login or signup page
  if (!token && !(pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to home if token exists and on login or signup page
  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);
      if (payload) {
        return NextResponse.next();
      }
    } catch (err) {
      const res = NextResponse.next();
      res.cookies.set(TOKEN, '', { maxAge: -1 });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
