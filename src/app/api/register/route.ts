import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
    return NextResponse.json(
        { error: "Registrations for the 2026 cohort are closed." },
        { status: 403 }
    );
}
