import Link from "next/link";
import { Lock } from "lucide-react";

export default function RegistrationPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 flex items-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10 md:p-16 text-center">
                    <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock size={36} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Registrations are <span className="text-red-600">Closed</span>
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                        Thank you for your interest in the 46th Epidemiology Refresher Course.
                        Registrations for the 2026 cohort are now closed and we are no longer
                        accepting new applications.
                    </p>
                    <p className="text-slate-500 text-sm mb-8">
                        For any queries, please reach out to the course coordinators.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
