import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendRegistrationConfirmation } from "@/lib/email";

export const dynamic = "force-dynamic";

function generateAuthCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            name, email, phone, emergencyContactName, emergencyContactPhone,
            age, gender, statPackagePreference,
            institution, qualification, experience, interest 
        } = body;

        if (!name || !email || !institution || !qualification || !interest || !phone || !gender) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user already registered
        const existingUser = await prisma.registration.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered for the course." }, { status: 409 });
        }

        const authCode = generateAuthCode();

        // Save registration to database
        const registration = await prisma.registration.create({
            data: {
                authCode,
                name,
                email,
                phone,
                emergencyContactName,
                emergencyContactPhone,
                age: age ? parseInt(age as string, 10) : null,
                gender,
                statPackagePreference,
                institution,
                qualification,
                experience,
                interest
            }
        });

        // Send confirmation email (non-blocking — failure does not break registration)
        sendRegistrationConfirmation({ toEmail: email, name, institution, qualification, authCode })
            .catch((err) => console.warn("[Email] Registration confirmation failed:", err?.message));

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
