import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('portal_session')?.value
    if (token) {
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.SESSION_SECRET!))
            return
        } catch {
            // invalid token — fall through to redirect
        }
    }
    return NextResponse.redirect(new URL('/portal?error=auth', request.url))
}

export const config = {
    matcher: '/portal/dashboard/:path*',
}
