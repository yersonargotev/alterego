import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/blog',
  '/blog/(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // If it's a public route, allow access without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For all other routes, let Clerk handle authentication
  // This will automatically redirect to sign-in for unauthenticated users
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|api|trpc).*)',
  ],
};
