import { NextResponse } from 'next/server';
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/recipes(.*)'],
  afterAuth(auth, req) {
    if (auth.userId && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/cookbook', req.url));
    }
    if (!auth.userId && req.nextUrl.pathname === '/recipes/new') {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
