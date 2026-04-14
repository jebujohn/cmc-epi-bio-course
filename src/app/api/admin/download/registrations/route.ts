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
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Convert to CSV
        const headers = ["ID", "Name", "Email", "Institution", "Qualification", "Experience", "Interest", "Status", "CreatedAt", "AuthCode"];
        const rows = registrations.map(r => [
            r.id,
            `"${r.name.replace(/"/g, '""')}"`,
            r.email,
            `"${r.institution.replace(/"/g, '""')}"`,
            `"${r.qualification.replace(/"/g, '""')}"`,
            `"${r.experience ? r.experience.replace(/"/g, '""') : ""}"`,
            `"${r.interest ? r.interest.replace(/"/g, '""') : ""}"`,
            r.status,
            r.createdAt.toISOString(),
            r.authCode || ""
        ]);

        const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="registrations.csv"',
            },
        });
    } catch (error) {
        console.error("Failed to download registrations:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
