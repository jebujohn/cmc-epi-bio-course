import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendFeedbackReminderEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const participants = await prisma.registration.findMany({
            where: {
                status: "PAID",
            }
        });

        const promises = participants.map(participant => 
            sendFeedbackReminderEmail({
                toEmail: participant.email,
                name: participant.name,
                authCode: participant.authCode || "N/A"
            }).catch(err => {
                console.error(`Failed to send reminder to ${participant.email}:`, err);
            })
        );

        await Promise.allSettled(promises);

        return NextResponse.json({
            success: true,
            message: `Feedback reminders sent to ${participants.length} participants.`
        });
    } catch (error) {
        console.error("Failed to send feedback reminders:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
