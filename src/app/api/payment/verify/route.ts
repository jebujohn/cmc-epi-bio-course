import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { identifier } = await req.json();

        if (!identifier) {
            return NextResponse.json({ error: "Registration ID or email is required" }, { status: 400 });
        }

        const registration = await prisma.registration.findFirst({
            where: {
                OR: [
                    { id: identifier },
                    { email: identifier },
                    { authCode: identifier }
                ]
            }
        });

        if (!registration) {
            return NextResponse.json({ error: "No registration found with this ID or email." }, { status: 404 });
        }

        if (registration.status === "APPROVED") {
            return NextResponse.json({ allowed: true });
        } else if (registration.status === "PAID") {
            return NextResponse.json({ error: "Payment has already been recorded for this registration." }, { status: 400 });
        } else if (registration.status === "REJECTED") {
            return NextResponse.json({ error: "This registration application has been rejected." }, { status: 400 });
        } else {
            return NextResponse.json({ error: "Your registration is pending review. You can proceed to payment only after being approved by the administration." }, { status: 403 });
        }
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
