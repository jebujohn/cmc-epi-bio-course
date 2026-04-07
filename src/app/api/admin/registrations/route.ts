import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuthorized(req: Request): boolean {
    const password = req.headers.get("x-admin-password");
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || !password) return false;
    return password === adminPassword;
}

export async function GET(req: Request) {
    try {
        if (!isAuthorized(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error("Admin fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        if (!isAuthorized(req)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id, status } = await req.json();
        if (!id || !status) {
            return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
        }
        const updated = await prisma.registration.update({
            where: { id },
            data: { status },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Admin update failed:", error);
        return NextResponse.json({ error: "Failed to update registration status" }, { status: 500 });
    }
}
