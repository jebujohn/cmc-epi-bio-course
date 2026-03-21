import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, institution, qualification, experience, interest } = body;

        if (!name || !email || !institution || !qualification || !interest) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already registered
        const existingUser = await prisma.registration.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered for the course." }, { status: 409 });
        }

        // Store in local SQLite database
        const registration = await prisma.registration.create({
            data: {
                name,
                email,
                institution,
                qualification,
                experience,
                interest
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registration successful!",
            registrationId: registration.id
        }, { status: 201 });

    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
