import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { signSession } from '@/lib/session'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.redirect(new URL('/portal?error=invalid', request.url))
    }

    const registration = await prisma.registration.findUnique({
        where: { authCode: code },
    })

    if (!registration) {
        return NextResponse.redirect(new URL('/portal?error=invalid', request.url))
    }

    if (registration.status !== 'PAID') {
        return NextResponse.redirect(new URL('/portal?error=unpaid', request.url))
    }

    const token = await signSession(registration.email)
    const response = NextResponse.redirect(new URL('/portal/dashboard', request.url))
    response.cookies.set('portal_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
    })
    return response
}
