import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { participantId, day, overall, pace, content, faculty, comments } = body;

        if (!participantId) {
            return NextResponse.json({ error: "Participant Passcode is required for authentication." }, { status: 401 });
        }

        // Verify that the participant is a registered user via their 6-letter Passcode
        const registration = await prisma.registration.findFirst({
            where: {
                authCode: participantId.trim().toUpperCase()
            }
        });

        if (!registration) {
            return NextResponse.json({ error: "Authentication failed. Invalid 6-letter passcode." }, { status: 403 });
        }

        if (!day || !overall || !pace || !content || !faculty) {
            return NextResponse.json({ error: "Missing required rating fields" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                participantId: registration.id, // Securely link to their unique database ID
                day,
                overall,
                pace,
                content,
                faculty,
                comments: comments || null
            }
        });

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully!",
            feedbackId: feedback.id
        }, { status: 201 });

    } catch (error) {
        console.error("Feedback submission failed:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
