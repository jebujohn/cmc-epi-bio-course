"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Lock } from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
    invalid: "This link is invalid or has expired. Please request a new one.",
    unpaid: "Your enrollment is not yet confirmed. Please complete payment to access the portal.",
    auth: "Your session has expired. Please log in again.",
};

export default function PortalLoginForm({ errorParam }: { errorParam?: string }) {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<"idle" | "loading" | "success">("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const authError = errorParam ? (ERROR_MESSAGES[errorParam] ?? "Something went wrong. Please try again.") : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("loading");
        setSubmitError(null);

        try {
            const res = await fetch("/api/portal/request-link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });

            if (res.ok) {
                setState("success");
            } else {
                setState("idle");
                setSubmitError("Something went wrong. Please try again.");
            }
        } catch {
            setState("idle");
            setSubmitError("Connection failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {state === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 text-center"
                    >
                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Check your inbox</h2>
                        <p className="text-slate-500 mb-2">
                            If <strong className="text-slate-700">{email}</strong> is registered as a confirmed participant, you&apos;ll receive a login link shortly.
                        </p>
                        <p className="text-sm text-slate-400">The link is valid for 30 days. Check your spam folder if you don&apos;t see it within a few minutes.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
                    >
                        <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Lock size={40} />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-2">Participant Portal</h1>
                        <p className="text-slate-500 text-center mb-8 font-medium">
                            Enter your registered email address and we&apos;ll send you a secure login link.
                        </p>

                        {authError && (
                            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <span>{authError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block pl-1">
                                    Registered Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </div>
                                {submitError && (
                                    <p className="text-red-500 text-xs mt-2 font-medium pl-1">{submitError}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={state === "loading" || !email.trim()}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {state === "loading" ? (
                                    "Sending link…"
                                ) : (
                                    <>Send Login Link <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-xs text-slate-400 mt-6">
                            Access is restricted to confirmed, paid participants of the {" "}
                            <span className="text-slate-500 font-medium">46th Epidemiology Refresher Course</span>.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
