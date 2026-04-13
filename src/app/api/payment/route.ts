import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPaymentReceiptEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { identifier } = body;

        if (!identifier) {
            return NextResponse.json({ error: "Missing registration identifier" }, { status: 400 });
        }

        // Try to find by email or ID
        const registration = await prisma.registration.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { id: identifier }
                ]
            }
        });

        if (!registration) {
            return NextResponse.json({ error: "No registration found for this identifier." }, { status: 404 });
        }

        // Only APPROVED participants can pay
        if (registration.status !== "APPROVED") {
            return NextResponse.json({
                error: registration.status === "PAID"
                    ? "Payment already recorded for this registration."
                    : "Your application has not been approved yet. Payment is only available for approved participants."
            }, { status: 403 });
        }

        // Generate a transaction ID
        const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;

        // Update status to PAID
        const updatedRegistration = await prisma.registration.update({
            where: { id: registration.id },
            data: { status: "PAID" }
        });

        // Send payment receipt email (non-blocking)
        sendPaymentReceiptEmail({
            toEmail: updatedRegistration.email,
            name: updatedRegistration.name,
            registrationId: updatedRegistration.id,
            transactionId,
        }).catch((err) => console.warn("[Email] Payment receipt email failed:", err?.message));

        return NextResponse.json({
            success: true,
            message: "Payment successfully recorded!",
            transactionId,
            registration: {
                id: updatedRegistration.id,
                name: updatedRegistration.name,
                email: updatedRegistration.email,
                status: updatedRegistration.status
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Payment recording failed:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
