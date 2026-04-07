"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, Clock, UserIcon, CheckCircle2 } from "lucide-react";

export default function AgendaPage() {
    const [openDay, setOpenDay] = useState<number | null>(1);

    const toggleDay = (day: number) => {
        setOpenDay(openDay === day ? null : day);
    };

    const schedule = [
        {
            day: 1,
            date: "Monday, July 6",
            title: "Introduction to Epidemiology & Study Designs",
            sessions: [
                { time: "09:00 - 10:30", topic: "Welcome & Overview of Epidemiology", faculty: "Jacob John" },
                { time: "11:00 - 13:00", topic: "Measures of Disease Frequency", faculty: "Anu Oommen" },
                { time: "14:00 - 16:00", topic: "Observational Study Designs (Cohort & Case-Control)", faculty: "JP Muliyil" },
            ]
        },
        {
            day: 2,
            date: "Tuesday, July 7",
            title: "Basic Biostatistics & Descriptive Statistics",
            sessions: [
                { time: "09:00 - 10:30", topic: "Types of Data & Data Presentation", faculty: "Venkata Raghava Mohan" },
                { time: "11:00 - 13:00", topic: "Measures of Central Tendency & Dispersion", faculty: "Sam Marconi" },
                { time: "14:00 - 16:00", topic: "Hands-on: Descriptive Stats in SPSS/R", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 3,
            date: "Wednesday, July 8",
            title: "Probability & Inferential Statistics",
            sessions: [
                { time: "09:00 - 10:30", topic: "Normal Distribution & Confidence Intervals", faculty: "Anu Oommen" },
                { time: "11:00 - 13:00", topic: "Hypothesis Testing & p-values", faculty: "Divya Muliyil" },
                { time: "14:00 - 16:00", topic: "Hands-on: Inferential Stats", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 4,
            date: "Thursday, July 9",
            title: "Categorical Data Analysis",
            sessions: [
                { time: "09:00 - 10:30", topic: "Chi-square Test & Odds Ratio/Relative Risk", faculty: "Shalini Paul" },
                { time: "11:00 - 13:00", topic: "Confounding & Effect Modification", faculty: "Divya Muliyil" },
                { time: "14:00 - 16:00", topic: "Hands-on: Categorical Data in R", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 5,
            date: "Friday, July 10",
            title: "Continuous Data Analysis",
            sessions: [
                { time: "09:00 - 10:30", topic: "Student's t-test (Independent & Paired)", faculty: "Venkata Raghava Mohan" },
                { time: "11:00 - 13:00", topic: "One-Way ANOVA", faculty: "Jacob John" },
                { time: "14:00 - 16:00", topic: "Hands-on: t-tests and ANOVA", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 6,
            date: "Saturday, July 11",
            title: "Correlation & Regression",
            sessions: [
                { time: "09:00 - 10:30", topic: "Pearson & Spearman Correlation", faculty: "Anu Oommen" },
                { time: "11:00 - 13:00", topic: "Multiple Linear Regression", faculty: "Shalini Paul" },
                { time: "14:00 - 16:00", topic: "Hands-on: Regression Output Interpretation", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 7,
            date: "Monday, July 13",
            title: "Advanced Epidemiological Methods",
            sessions: [
                { time: "09:00 - 10:30", topic: "Systematic Reviews & Meta-Analysis", faculty: "Sam Marconi" },
                { time: "11:00 - 13:00", topic: "Critical Appraisal of Literature", faculty: "Anu Oommen" },
                { time: "14:00 - 16:00", topic: "Hands-on: Review Methods", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 8,
            date: "Tuesday, July 14",
            title: "Field Surveys and Practicums",
            sessions: [
                { time: "09:00 - 10:30", topic: "Survey Methodology", faculty: "Shalini Paul" },
                { time: "11:00 - 13:00", topic: "Design and Execution of Field Surveys", faculty: "Venkata Raghava Mohan" },
                { time: "14:00 - 16:00", topic: "Hands-on: Open Discussion", faculty: "Faculty Panel" },
            ]
        },
        {
            day: 9,
            date: "Wednesday, July 15",
            title: "Advanced Statistical Modeling",
            sessions: [
                { time: "09:00 - 10:30", topic: "Survival Analysis", faculty: "Jacob John" },
                { time: "11:00 - 13:00", topic: "Logistic Regression", faculty: "Sam Marconi" },
                { time: "14:00 - 16:00", topic: "Hands-on: Advanced Models in R", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 10,
            date: "Thursday, July 16",
            title: "Clinical Trials & Interventions",
            sessions: [
                { time: "09:00 - 10:30", topic: "Design and analysis of Clinical Trials", faculty: "JP Muliyil" },
                { time: "11:00 - 13:00", topic: "Randomization and Blinding", faculty: "Divya Muliyil" },
                { time: "14:00 - 16:00", topic: "Protocol Development", faculty: "Faculty Panel" },
            ]
        },
        {
            day: 11,
            date: "Friday, July 17",
            title: "Health Economics & Outcomes",
            sessions: [
                { time: "09:00 - 10:30", topic: "Health Economics Overview", faculty: "Venkata Raghava Mohan" },
                { time: "11:00 - 13:00", topic: "Cost-Effectiveness Analysis", faculty: "Anu Oommen" },
                { time: "14:00 - 16:00", topic: "Hands-on: Modeling", faculty: "Jackwin Sam" },
            ]
        },
        {
            day: 12,
            date: "Saturday, July 18",
            title: "Culmination & Final Assessments",
            sessions: [
                { time: "09:00 - 10:30", topic: "Course Assessment Exam", faculty: "Faculty Panel" },
                { time: "11:00 - 13:00", topic: "Final Presentations", faculty: "Faculty Panel" },
                { time: "14:00 - 16:00", topic: "Valedictory & Certificate Distribution", faculty: "Jacob John & Anu Oommen" },
            ]
        }
    ];

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
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/30 hover:bg-slate-100 px-5 py-2.5 rounded-lg shadow-sm transition-all font-medium">
                        <Download size={20} />
                        Download PDF
                    </button>
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
