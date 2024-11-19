import { NextResponse } from 'next/server';
import { auth } from './server/auth';

export async function middleware(request: Request) {
    const session = await auth();
    const currentUrl = request.url;

    if (session) {
        if (currentUrl.includes('/login') || currentUrl.includes('/sign-up')) {
            return NextResponse.redirect(new URL('/', currentUrl));
        }
    } else {
        if (currentUrl.includes('/') && !currentUrl.includes('/login') && !currentUrl.includes('/sign-up')) {
            return NextResponse.redirect(new URL('/login', currentUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api/auth|icons|favicon).*)'],
};
