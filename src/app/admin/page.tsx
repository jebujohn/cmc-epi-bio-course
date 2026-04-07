"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Search, ExternalLink, Mail, User, School, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Registration {
    id: string;
    name: string;
    email: string;
    institution: string;
    qualification: string;
    experience: string;
    interest: string;
    status: string;
    createdAt: string;
}

export default function AdminPortal() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/registrations");
            if (res.ok) {
                const data = await res.json();
                setRegistrations(data);
            }
        } catch (error) {
            console.error("Fetch failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/admin/registrations", {
                method: "PATCH",
                body: JSON.stringify({ id, status }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
                if (selectedRegistration?.id === id) {
                    setSelectedRegistration(prev => prev ? { ...prev, status } : null);
                }
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const filtered = registrations.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.institution.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "APPROVED": return "bg-green-100 text-green-700 border-green-200";
            case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED": return <CheckCircle size={16} />;
            case "REJECTED": return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Admin <span className="text-primary">Portal</span>
                        </h1>
                        <p className="text-slate-500 mt-1">Manage epidemiology course applications</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Sidebar: Application List */}
                    <div className="lg:col-span-1 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="p-8 text-center text-slate-400 font-medium">Loading applications...</div>
                        ) : filtered.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 font-medium bg-white rounded-xl border border-dashed border-slate-200">
                                No applications found
                            </div>
                        ) : (
                            filtered.map((reg) => (
                                <motion.button
                                    key={reg.id}
                                    layoutId={reg.id}
                                    onClick={() => setSelectedRegistration(reg)}
                                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                                        selectedRegistration?.id === reg.id 
                                        ? "bg-white border-primary shadow-lg ring-2 ring-primary/5" 
                                        : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 truncate">{reg.name}</h3>
                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getStatusStyles(reg.status)}`}>
                                            {reg.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                                        <School size={12} /> {reg.institution}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {new Date(reg.createdAt).toLocaleDateString()}
                                    </p>
                                </motion.button>
                            ))
                        )}
                    </div>

                    {/* Main Content: Application Details */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {selectedRegistration ? (
                                <motion.div
                                    key={selectedRegistration.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                                >
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-100 pb-8 mb-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-2xl font-extrabold text-slate-900">{selectedRegistration.name}</h2>
                                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyles(selectedRegistration.status)}`}>
                                                        {getStatusIcon(selectedRegistration.status)}
                                                        {selectedRegistration.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                    <a href={`mailto:${selectedRegistration.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                                        <Mail size={16} /> {selectedRegistration.email}
                                                    </a>
                                                    <span className="flex items-center gap-2">
                                                        <School size={16} /> {selectedRegistration.institution}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 w-full md:w-auto">
                                                <button
                                                    onClick={() => updateStatus(selectedRegistration.id, "APPROVED")}
                                                    disabled={selectedRegistration.status === "APPROVED"}
                                                    className="flex-1 md:flex-none px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                                >
                                                    <CheckCircle size={18} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(selectedRegistration.id, "REJECTED")}
                                                    disabled={selectedRegistration.status === "REJECTED"}
                                                    className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                                >
                                                    <XCircle size={18} /> Reject
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Highest Qualification</label>
                                                <p className="text-slate-800 font-medium text-lg">{selectedRegistration.qualification}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years of Experience</label>
                                                <p className="text-slate-800 font-medium text-lg">{selectedRegistration.experience || "Not provided"}</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
                                            <div className="flex items-center gap-2 mb-4 text-primary">
                                                <BookOpen size={20} />
                                                <h3 className="font-bold uppercase tracking-wider text-xs">Statement of Interest</h3>
                                            </div>
                                            <p className="text-slate-700 leading-relaxed italic whitespace-pre-wrap">
                                                "{selectedRegistration.interest}"
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-900 p-4 text-center">
                                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Application Management Console</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 border-dashed min-h-[500px]">
                                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-6">
                                        <User size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Select an application</h3>
                                    <p className="text-slate-500 max-w-xs text-center">Review the details and statement of interest to approve or reject the enrollment.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
