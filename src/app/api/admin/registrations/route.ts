import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/admin/registrations - List all applications
export async function GET() {
    try {
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error("Admin fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
    }
}

// PATCH /api/admin/registrations - Update application status
export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }

        const updated = await prisma.registration.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Admin update failed:", error);
        return NextResponse.json({ error: "Failed to update registration status" }, { status: 500 });
    }
}
