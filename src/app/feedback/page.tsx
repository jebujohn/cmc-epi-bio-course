"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, MessageSquare, CalendarDays, Star, UserIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { schedule } from "@/data/agenda";

type SessionFeedback = {
    content: string;
    duration: string;
    engagement: string;
};

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        day: "Day 1",
        participantId: "",
        comments: ""
    });
    
    const [sessionFeedbacks, setSessionFeedbacks] = useState<Record<string, SessionFeedback>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const days = schedule.map(s => `Day ${s.day}`);
    
    // Find the currently selected day's schedule
    const currentDayNumber = parseInt(formData.day.replace('Day ', ''));
    const currentDaySchedule = schedule.find(s => s.day === currentDayNumber);

    // Initialize session feedbacks when day changes
    useEffect(() => {
        if (currentDaySchedule) {
            const initialFeedbacks: Record<string, SessionFeedback> = {};
            currentDaySchedule.sessions.forEach(session => {
                initialFeedbacks[session.topic] = { content: "", duration: "", engagement: "" };
            });
            setSessionFeedbacks(initialFeedbacks);
        }
    }, [formData.day, currentDaySchedule]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSessionFeedback = (topic: string, field: keyof SessionFeedback, value: string) => {
        setSessionFeedbacks(prev => ({
            ...prev,
            [topic]: {
                ...prev[topic],
                [field]: value
            }
        }));
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
                    sessionFeedbacks,
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

    // Form validity check
    const isFormValid = () => {
        if (!formData.participantId) return false;
        if (!currentDaySchedule) return false;
        
        for (const session of currentDaySchedule.sessions) {
            const fb = sessionFeedbacks[session.topic];
            if (!fb || !fb.content || !fb.duration || !fb.engagement) return false;
        }
        return true;
    };

    const RadioGroup = ({ topic, field, options, label }: { topic: string, field: keyof SessionFeedback, options: string[], label: string }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 mt-2">
            <span className="text-sm font-medium text-slate-700 w-1/3 mb-2 sm:mb-0">{label}</span>
            <div className="flex flex-wrap gap-2 w-2/3 justify-start sm:justify-end">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => handleSessionFeedback(topic, field, opt)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                            sessionFeedbacks[topic]?.[field] === opt
                                ? 'bg-primary text-white shadow-md ring-2 ring-primary/30 scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
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
                        Your daily feedback helps us continuously improve the course. To prevent spam, you must authenticate using your unique 6-letter Participant Passcode.
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
                                        setFormData({ ...formData, comments: "" });
                                        // Sessions will automatically reset due to useEffect mapping based on day
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
                                        <label htmlFor="participantId" className="text-sm font-semibold text-slate-700">6-Letter Participant Passcode *</label>
                                        <input
                                            type="text"
                                            id="participantId"
                                            name="participantId"
                                            required
                                            maxLength={6}
                                            value={formData.participantId}
                                            onChange={(e) => handleChange({ target: { name: 'participantId', value: e.target.value.toUpperCase() } } as any)}
                                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900 font-mono tracking-widest uppercase"
                                            placeholder="e.g. A7K9XP"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="border-b border-slate-200 pb-2">
                                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
                                            <Star size={20} className="text-yellow-500" />
                                            Session Ratings
                                        </h3>
                                        <p className="text-sm text-slate-500">Please provide feedback for each session today.</p>
                                    </div>

                                    {currentDaySchedule?.sessions.map((session, idx) => (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx} 
                                            className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-sm"
                                        >
                                            <div className="mb-4 pb-3 border-b border-slate-200">
                                                <h4 className="text-md font-bold text-slate-900 leading-tight mb-2">
                                                    {session.topic}
                                                </h4>
                                                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                    <UserIcon size={14} className="text-primary/70" />
                                                    {session.faculty}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <RadioGroup 
                                                    topic={session.topic} 
                                                    field="content" 
                                                    label="Content" 
                                                    options={["Too little", "Just right", "Too much"]} 
                                                />
                                                <RadioGroup 
                                                    topic={session.topic} 
                                                    field="engagement" 
                                                    label="Engagement" 
                                                    options={["Poor", "Good", "Great"]} 
                                                />
                                                <RadioGroup 
                                                    topic={session.topic} 
                                                    field="duration" 
                                                    label="Duration" 
                                                    options={["Too short", "Just right", "Too long"]} 
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label htmlFor="comments" className="text-sm font-semibold text-slate-700 text-lg">Open-ended Feedback</label>
                                    <p className="text-xs text-slate-500 mb-2">What did you like most? What could be improved overall today?</p>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        rows={4}
                                        value={formData.comments}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-slate-900 resize-y"
                                        placeholder="Additional comments or suggestions..."
                                    />
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isFormValid()}
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
