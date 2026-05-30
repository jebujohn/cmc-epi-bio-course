"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Clock, UserIcon, CheckCircle2 } from "lucide-react";
import { schedule } from "@/data/agenda";

export default function AgendaPage() {
    const [openDay, setOpenDay] = useState<number | null>(1);

    const toggleDay = (day: number) => {
        setOpenDay(openDay === day ? null : day);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Course <span className="text-primary">Agenda</span>
                        </h1>
                        <p className="text-slate-600">A rigorous two-week schedule covering foundational to advanced topics.</p>
                    </div>
                    <Link
                        href="/agenda/print"
                        target="_blank"
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/30 hover:bg-slate-100 px-5 py-2.5 rounded-lg shadow-sm transition-all font-medium"
                    >
                        <Download size={20} />
                        Download PDF
                    </Link>
                </div>

                <div className="space-y-4">
                    {schedule.map((dayPlan) => (
                        <div
                            key={dayPlan.day}
                            className={`bg-white rounded-xl border transition-all duration-300 ${openDay === dayPlan.day ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'}`}
                        >
                            <button
                                onClick={() => toggleDay(dayPlan.day)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-bold flex-shrink-0 transition-colors ${openDay === dayPlan.day ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <span className="text-xs uppercase tracking-widest opacity-80 mb-0.5">Day</span>
                                        <span className="text-xl leading-none">{dayPlan.day}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{dayPlan.date}</h3>
                                        <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">
                                            {dayPlan.title}
                                        </p>
                                    </div>
                                </div>
                                <ChevronDown
                                    size={24}
                                    className={`text-slate-400 transition-transform duration-300 ${openDay === dayPlan.day ? 'rotate-180 text-primary' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openDay === dayPlan.day && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                                        className="overflow-hidden border-t border-slate-100"
                                    >
                                        <div className="p-6 bg-slate-50/50 space-y-4">
                                            {dayPlan.sessions.map((session, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow transition-shadow">
                                                    <div className="sm:w-48 flex items-start gap-2 text-slate-600 font-medium">
                                                        <Clock size={18} className="text-secondary mt-0.5" />
                                                        {session.time}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-bold text-slate-900 mb-2 flex flex-wrap items-center gap-2">
                                                            {session.topic}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                                            <UserIcon size={16} className="text-slate-400" />
                                                            {session.faculty}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
