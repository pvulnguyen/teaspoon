import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    if (auth.userId && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/cookbook', req.url));
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/recipes/new'],
};
