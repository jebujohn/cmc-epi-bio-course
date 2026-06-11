import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendMagicLinkEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const body = await request.json().catch(() => null)
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : null

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const registration = await prisma.registration.findUnique({
        where: { email },
    })

    // Only send a link for paid/confirmed participants
    if (registration?.authCode && registration.status === 'PAID') {
        await sendMagicLinkEmail({
            toEmail: registration.email,
            name: registration.name,
            authCode: registration.authCode,
        })
    }

    // Always return success — don't reveal whether an email is registered
    return NextResponse.json({ ok: true })
}
