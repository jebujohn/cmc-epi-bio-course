import { SignJWT, jwtVerify } from 'jose'

const getSecret = () => new TextEncoder().encode(process.env.SESSION_SECRET!)

export async function signSession(email: string): Promise<string> {
    return new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(getSecret())
}

export async function verifySession(token: string | undefined): Promise<{ email: string } | null> {
    if (!token) return null
    try {
        const { payload } = await jwtVerify(token, getSecret())
        return { email: payload.email as string }
    } catch {
        return null
    }
}
