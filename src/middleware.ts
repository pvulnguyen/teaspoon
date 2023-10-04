import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/discover', '/recipes/:id'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/api(.*)'],
};
