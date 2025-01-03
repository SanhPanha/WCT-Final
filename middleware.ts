import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JwtPayload, decode } from 'jsonwebtoken';

// Configuration for protected routes
export const config = {
  matcher: ['/myshop', '/add', '/edit', '/delete'], // Match protected routes
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decode and validate token (Firebase JWT)
    const decodedToken = decode(token) as JwtPayload | null;

    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Invalid token');
    }

    const expiration = decodedToken.exp ? decodedToken.exp * 1000 : 0; // Convert to milliseconds
    if (Date.now() >= expiration) {
      throw new Error('Token expired');
    }

    // Token is valid, proceed to the requested route
    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
