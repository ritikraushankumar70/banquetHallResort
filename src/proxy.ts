import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Only protect the /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Allow access to the login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the secure cookie
    const authCookie = request.cookies.get('royalvana_admin_session');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Redirect unauthenticated users to the login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure middleware to only run on specific paths for performance
export const config = {
  matcher: '/admin/:path*',
};
