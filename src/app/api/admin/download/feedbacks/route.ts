import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passcode = searchParams.get("passcode");

    if (!passcode || passcode !== process.env.ADMIN_PASSWORD) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const feedbacks = await prisma.feedback.findMany({
            orderBy: { createdAt: "desc" },
        });

        const registrations = await prisma.registration.findMany();
        const regMap = new Map();
        for (const reg of registrations) {
            regMap.set(reg.id, { name: reg.name, authCode: reg.authCode });
        }

        // Convert to CSV
        const headers = ["ID", "Participant", "AuthCode", "Day", "SessionFeedbacks", "Comments", "CreatedAt"];
        const rows = feedbacks.map(f => {
            const reg = f.participantId ? regMap.get(f.participantId) : null;
            let sessionFeedbacksStr = "";
            try {
                sessionFeedbacksStr = typeof f.sessionFeedbacks === 'string' 
                    ? f.sessionFeedbacks 
                    : JSON.stringify(f.sessionFeedbacks);
                sessionFeedbacksStr = `"${sessionFeedbacksStr.replace(/"/g, '""')}"`;
            } catch (e) {
                 sessionFeedbacksStr = '""';
            }

            return [
                f.id,
                `"${reg ? reg.name.replace(/"/g, '""') : "Unknown Participant"}"`,
                `"${reg?.authCode || ""}"`,
                `"${f.day}"`,
                sessionFeedbacksStr,
                `"${f.comments ? f.comments.replace(/"/g, '""') : ""}"`,
                f.createdAt.toISOString()
            ];
        });

        const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="feedbacks.csv"',
            },
        });
    } catch (error) {
         console.error("Failed to download feedbacks:", error);
         return new NextResponse("Internal Server Error", { status: 500 });
    }
}
