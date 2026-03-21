"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, CheckCircle2, Lock, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [amount] = useState(8850); // 8,850 INR
    const [registrationId, setRegistrationId] = useState("");

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!registrationId) return;
        setIsProcessing(true);
        // Mock Payment Processing via Razorpay/Stripe
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2500);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
                        <CreditCard className="text-primary" size={36} />
                        Course Fee Payment
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
                        Complete your registration by securely paying the course fee.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
                    <AnimatePresence>
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-12 text-center"
                            >
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
                                <p className="text-slate-500 mb-6 font-medium">Transaction ID: TXN-{Math.floor(Math.random() * 90000) + 10000}</p>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 max-w-sm mx-auto text-left">
                                    <div className="flex justify-between mb-3 border-b border-slate-200 pb-2">
                                        <span className="text-slate-500 text-sm">Amount Paid</span>
                                        <span className="font-bold text-slate-900">₹8,850</span>
                                    </div>
                                    <div className="flex justify-between mb-3 border-b border-slate-200 pb-2">
                                        <span className="text-slate-500 text-sm">Registration ID</span>
                                        <span className="font-bold text-slate-900">{registrationId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500 text-sm">Course</span>
                                        <span className="font-bold text-slate-900 text-right">46th ERC</span>
                                    </div>
                                </div>
                                <button
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
                                >
                                    <Download size={20} />
                                    Download Receipt (PDF)
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handlePayment}
                                className="p-8 md:p-10 space-y-8"
                            >
                                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-primary">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                                        <ShieldCheck className="text-primary" size={20} />
                                        Order Summary
                                    </h3>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-100">
                                        <span className="text-slate-700 font-medium">46th Epidemiology Refresher Course (2026)</span>
                                        <span className="text-2xl font-extrabold text-slate-900">₹{amount.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Inclusive of 18% GST and course materials.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="registrationId" className="text-sm font-semibold text-slate-700">Registration ID or Registered Email *</label>
                                        <input
                                            type="text"
                                            id="registrationId"
                                            name="registrationId"
                                            required
                                            value={registrationId}
                                            onChange={(e) => setRegistrationId(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900 font-medium"
                                            placeholder="e.g. EP26-042 or john@example.com"
                                        />
                                    </div>

                                    {/* Dummy Payment Methods Selector to simulate integration UI */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700">Select Payment Method</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="border border-primary bg-primary/5 rounded-lg p-4 cursor-pointer flex flex-col items-center justify-center gap-2 relative">
                                                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full ring-2 ring-white" />
                                                <CreditCard size={24} className="text-primary" />
                                                <span className="text-xs font-bold text-slate-900 text-center">Card / UPI / NetBanking</span>
                                            </div>
                                            <div className="border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-lg p-4 cursor-not-allowed flex flex-col items-center justify-center gap-2 opacity-60">
                                                <span className="text-xs font-bold text-slate-500 text-center uppercase">Institutional Transfer</span>
                                                <span className="text-[10px] text-slate-400">Contact admin</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={isProcessing || !registrationId}
                                        className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold font-sans shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                                Processing Payment...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Lock size={18} className="text-slate-300" />
                                                Pay ₹{amount.toLocaleString()} Securely
                                            </span>
                                        )}

                                        {/* Gloss effect for the button */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                        Secured by Razorpay • PCI-DSS Certified
                                    </p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
