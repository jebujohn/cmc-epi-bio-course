import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPaymentReceiptEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

/**
 * INSTITUTIONAL PAYMENT GATEWAY WEBHOOK
 * 
 * Your institutional gateway should be configured to send a POST request to:
 * https://your-domain.com/api/payment/webhook
 * 
 * upon a successful transaction.
 */
export async function POST(req: Request) {
    try {
        // 1. Get the payload sent by your institutional gateway
        const body = await req.json();
        
        // TODO: Replace these with the actual fields sent by your institutional API 
        // e.g., body.reference_number, body.txn_id, body.status
        const identifier = body.identifier || body.reference_number;
        const incomingTxnId = body.transaction_id || `INST-${Date.now()}`;
        const paymentStatus = body.status || "SUCCESS";

        // 2. Validate request (IMPORTANT: You should verify a hash/signature 
        // passing from the institution to ensure the request is not spoofed)
        const secretHeader = req.headers.get("x-institutional-secret");
        if (process.env.INSTITUTIONAL_API_SECRET && secretHeader !== process.env.INSTITUTIONAL_API_SECRET) {
            return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
        }

        if (!identifier || paymentStatus !== "SUCCESS") {
            return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
        }

        // 3. Find the registration in our database
        const registration = await prisma.registration.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { id: identifier }
                ]
            }
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        // 4. Update the database to PAID (avoid duplicates if already paid)
        if (registration.status !== "PAID") {
            const updatedRegistration = await prisma.registration.update({
                where: { id: registration.id },
                data: { status: "PAID" }
            });

            // 5. Send SendGrid receipt
            await sendPaymentReceiptEmail({
                toEmail: updatedRegistration.email,
                name: updatedRegistration.name,
                registrationId: updatedRegistration.id,
                transactionId: incomingTxnId,
            }).catch((err) => console.warn("[Email] Payment receipt email failed:", err?.message));
        }

        return NextResponse.json({ success: true, message: "Payment recorded via webhook" }, { status: 200 });

    } catch (error) {
        console.error("Webhook processing failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
