import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { LogOut, BookOpen, Calendar, FileText, Bell } from "lucide-react";

export const metadata = {
    title: "Course Materials | Participant Portal",
};

export default async function PortalDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("portal_session")?.value;

    const session = await verifySession(token);
    if (!session) redirect("/portal?error=auth");

    const participant = await prisma.registration.findUnique({
        where: { email: session.email },
        select: { name: true, email: true, institution: true, status: true },
    });

    if (!participant || participant.status !== "PAID") redirect("/portal?error=auth");

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Portal header */}
            <div className="bg-white border-b border-slate-200 px-4 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Participant Portal</p>
                        <p className="font-bold text-slate-800">{participant.name}</p>
                        <p className="text-xs text-slate-500">{participant.institution}</p>
                    </div>
                    <Link
                        href="/portal/logout"
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-secondary transition-colors font-medium"
                    >
                        <LogOut size={16} />
                        Sign out
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

                {/* Welcome */}
                <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8">
                    <p className="text-sm font-semibold text-white/70 mb-1">Welcome back</p>
                    <h1 className="text-2xl font-extrabold mb-2">{participant.name.split(" ")[0]}</h1>
                    <p className="text-white/80 text-sm">46th Epidemiology Refresher Course · July 6–18, 2026 · CMC Vellore</p>
                </div>

                {/* Quick links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/agenda"
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all group"
                    >
                        <Calendar className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-bold text-slate-800">Course Schedule</p>
                        <p className="text-sm text-slate-500 mt-1">View the full agenda</p>
                    </Link>
                    <Link
                        href="/feedback"
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all group"
                    >
                        <Bell className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-bold text-slate-800">Daily Feedback</p>
                        <p className="text-sm text-slate-500 mt-1">Submit session feedback</p>
                    </Link>
                    <Link
                        href="/faculty"
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all group"
                    >
                        <BookOpen className="text-primary mb-3 group-hover:scale-110 transition-transform" size={28} />
                        <p className="font-bold text-slate-800">Faculty</p>
                        <p className="text-sm text-slate-500 mt-1">Meet the course faculty</p>
                    </Link>
                </div>

                {/* Materials */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                        <FileText className="text-primary" size={22} />
                        <h2 className="text-lg font-extrabold text-slate-900">Course Materials</h2>
                    </div>
                    <div className="px-6 py-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="text-slate-400" size={28} />
                        </div>
                        <p className="font-bold text-slate-700 mb-1">Materials will be posted here</p>
                        <p className="text-sm text-slate-400 max-w-sm mx-auto">
                            Lecture slides, reading materials, and datasets will be uploaded before and during the course. Check back closer to the start date.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
