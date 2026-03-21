"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        institution: "",
        qualification: "",
        experience: "",
        interest: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const data = await response.json();
                alert(data.error || "An error occurred during registration.");
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Course <span className="text-primary">Registration</span>
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
                        Apply now to secure your spot for the 2026 cohort. Applications are reviewed on a rolling basis.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">

                    <AnimatePresence>
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-16 text-center"
                            >
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
                                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                    Thank you for your interest. We have received your application and will review it shortly. A confirmation email has been sent to your inbox.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/payment'}
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                                >
                                    Proceed to Course Fee Payment
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="p-8 md:p-12 space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                            placeholder="Dr. John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                            placeholder="john.doe@hospital.org"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label htmlFor="institution" className="text-sm font-semibold text-slate-700">Institution / Organization *</label>
                                        <input
                                            type="text"
                                            id="institution"
                                            name="institution"
                                            required
                                            value={formData.institution}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                            placeholder="Christian Medical College"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="qualification" className="text-sm font-semibold text-slate-700">Highest Qualification *</label>
                                        <select
                                            id="qualification"
                                            name="qualification"
                                            required
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                        >
                                            <option value="" disabled>Select highest qualification</option>
                                            <option value="MBBS">MBBS</option>
                                            <option value="MD/MS/DNB">MD / MS / DNB</option>
                                            <option value="PhD">PhD</option>
                                            <option value="MPH/MSc">MPH / MSc</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="experience" className="text-sm font-semibold text-slate-700">Years of Experience</label>
                                        <select
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                        >
                                            <option value="" disabled>Select experience level</option>
                                            <option value="0-2">0 - 2 years</option>
                                            <option value="3-5">3 - 5 years</option>
                                            <option value="6-10">6 - 10 years</option>
                                            <option value="10+">10+ years</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label htmlFor="interest" className="text-sm font-semibold text-slate-700">Statement of Interest *</label>
                                        <p className="text-xs text-slate-500 mb-2">Briefly describe how this course will help your current work or future goals.</p>
                                        <textarea
                                            id="interest"
                                            name="interest"
                                            required
                                            rows={4}
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900 resize-y"
                                            placeholder="I am interested in applying biostatistical methods to my ongoing clinical trial..."
                                        />
                                    </div>

                                </div>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-xs text-slate-500 max-w-xs flex items-center gap-2">
                                        <AlertCircle size={16} className="text-secondary opacity-70" />
                                        We respect your privacy. All information is stored securely.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        {!isSubmitting && <Send size={20} />}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
