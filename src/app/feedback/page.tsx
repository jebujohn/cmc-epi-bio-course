"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, CalendarDays, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        day: "Day 1",
        participantId: "",
        ratingOverall: "",
        ratingPace: "",
        ratingContent: "",
        ratingFaculty: "",
        comments: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const days = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    participantId: formData.participantId,
                    day: formData.day,
                    overall: parseInt(formData.ratingOverall),
                    pace: parseInt(formData.ratingPace),
                    content: parseInt(formData.ratingContent),
                    faculty: parseInt(formData.ratingFaculty),
                    comments: formData.comments,
                })
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const data = await response.json();
                alert(data.error || "Failed to submit feedback.");
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const RatingRow = ({ label, name }: { label: string, name: string }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg px-2 transition-colors">
            <label className="text-sm font-semibold text-slate-700 mb-2 sm:mb-0 w-1/3">{label}</label>
            <div className="flex gap-2 sm:gap-4 w-2/3 justify-end sm:justify-start">
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        type="button"
                        onClick={() => handleRating(name, val.toString())}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${(formData as any)[name] === val.toString()
                            ? 'bg-primary text-white scale-110 shadow-md ring-2 ring-primary/30'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <div className="hidden sm:flex w-full mt-2 sm:mt-0 sm:w-1/4 justify-between text-xs text-slate-400 font-medium px-2">
                <span>Poor</span>
                <span>Excellent</span>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
                        <MessageSquare className="text-primary" size={36} />
                        Daily Feedback
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
                        Your daily feedback helps us continuously improve the course. Responses are anonymous unless you choose to provide your Participant ID.
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
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Feedback Saved</h2>
                                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                    Thank you for completing the feedback form for {formData.day}. We value your input.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setFormData({ ...formData, ratingOverall: "", ratingPace: "", ratingContent: "", ratingFaculty: "", comments: "" });
                                    }}
                                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                                >
                                    Submit Another Day
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="p-8 md:p-12 space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <div className="space-y-2">
                                        <label htmlFor="day" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <CalendarDays size={16} className="text-slate-500" />
                                            Select Course Day *
                                        </label>
                                        <select
                                            id="day"
                                            name="day"
                                            required
                                            value={formData.day}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-medium text-slate-900"
                                        >
                                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="participantId" className="text-sm font-semibold text-slate-700">Participant ID / Email (Optional)</label>
                                        <input
                                            type="text"
                                            id="participantId"
                                            name="participantId"
                                            value={formData.participantId}
                                            onChange={handleChange}
                                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900"
                                            placeholder="e.g. EP26-042 or email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                                        <Star size={20} className="text-yellow-500" />
                                        Session Ratings (1 = Poor, 5 = Excellent)
                                    </h3>

                                    <RatingRow label="Overall Session Quality" name="ratingOverall" />
                                    <RatingRow label="Pace of Delivery" name="ratingPace" />
                                    <RatingRow label="Clarity of Content/Handouts" name="ratingContent" />
                                    <RatingRow label="Effectiveness of Faculty" name="ratingFaculty" />
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label htmlFor="comments" className="text-sm font-semibold text-slate-700 text-lg">Open-ended Feedback</label>
                                    <p className="text-xs text-slate-500 mb-2">What did you like most? What could be improved?</p>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        rows={4}
                                        value={formData.comments}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900 resize-y"
                                        placeholder="The hands-on R session was excellent, but we needed more time for the exercises..."
                                    />
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.ratingOverall || !formData.ratingContent || !formData.ratingFaculty || !formData.ratingPace}
                                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 w-full sm:w-auto justify-center"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Submit Feedback'}
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
