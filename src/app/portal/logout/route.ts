import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const response = NextResponse.redirect(new URL('/portal', request.url))
    response.cookies.delete('portal_session')
    return response
}
