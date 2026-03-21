import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { participantId, day, overall, pace, content, faculty, comments } = body;

        if (!day || !overall || !pace || !content || !faculty) {
            return NextResponse.json({ error: "Missing required rating fields" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                participantId: participantId || null,
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
