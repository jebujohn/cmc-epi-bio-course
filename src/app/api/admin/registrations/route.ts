import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const checkAuth = (req: Request) => {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return false;
    }
    return true;
};

// GET /api/admin/registrations - List all applications
export async function GET(req: Request) {
    if (!checkAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
    if (!checkAuth(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
