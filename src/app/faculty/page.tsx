"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, BookOpen, ExternalLink, GraduationCap } from "lucide-react";

const facultyData = [
    {
        id: 2,
        name: "Anu Oommen",
        designation: "Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Morbidity and Mortality Measurement"],
        bio: "An expert in quantifying disease frequency, Anu Oommen teaches the essential principles of measurement errors, reliability, and validity within epidemiological data.",
        image: "/faculty/anu.jpg",
        imagePosition: "center center",
        fit: "contain",
        profileUrl: "https://www.cmch-vellore.edu/anu-mary-oommen/",
        scholarUrl: "https://scholar.google.com/citations?user=opEL128AAAAJ",
    },
    {
        id: 5,
        name: "Divya Muliyil",
        designation: "Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Causal Analysis", "Study Designs"],
        bio: "Focuses on causality evaluation and complex epidemiological frameworks, ensuring students can design rigorous cohort and cross-sectional studies.",
        image: "/faculty/divya.jpg",
        imagePosition: "center 10%",
        fit: "cover",
        profileUrl: "https://www.cmch-vellore.edu/divya-elizabeth-muliyil/",
        scholarUrl: null,
    },
    {
        id: 1,
        name: "Jacob John",
        designation: "Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Introduction to Epidemiology"],
        bio: "Jacob John leads the foundational sessions on the epidemiological approach, giving students a robust understanding of disease dynamics and practical public health research methodology.",
        image: "/faculty/jacob_john.jpg",
        imagePosition: "center center",
        fit: "contain",
        profileUrl: "https://www.cmch-vellore.edu/jacob-john/",
        scholarUrl: "https://scholar.google.com/citations?user=1YQc1_wAAAAJ",
    },
    {
        id: 8,
        name: "Jackwin Sam",
        designation: "Assistant Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Practical Software Sessions", "Data Management"],
        bio: "Leads the intensive hands-on sessions utilising SPSS, Epi Info, and Zotero ensuring practical technological capability.",
        image: null,
        profileUrl: "https://www.cmch-vellore.edu/jackwin-sam-paul-g/",
        scholarUrl: "https://scholar.google.com/citations?user=tyvpQucAAAAJ",
    },
    {
        id: 4,
        name: "JP Muliyil",
        designation: "Eminent Professor",
        affiliation: "CMC Vellore",
        expertise: ["Case Control Studies", "Clinical Trials"],
        bio: "A pioneer in public health in India, JP Muliyil guides participants through rigorous study designs with real-world complexities.",
        image: null,
        profileUrl: "https://en.wikipedia.org/wiki/Jayaprakash_Muliyil",
        scholarUrl: null,
    },
    {
        id: 6,
        name: "Sam Marconi",
        designation: "Associate Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Systematic Reviews", "Software Training"],
        bio: "Marconi bridges the gap between raw literature and robust conclusions through systematic review methodology and statistical computing.",
        image: "/faculty/marconi.jpg",
        imagePosition: "center 20%",
        fit: "cover",
        profileUrl: "https://www.cmch-vellore.edu/sam-marconi/",
        scholarUrl: "https://scholar.google.com/citations?user=WY-PJXUAAAAJ",
    },
    {
        id: 7,
        name: "Shalini Jeyapaul",
        designation: "Associate Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Survey Methods", "Statistics"],
        bio: "An expert in survey methodology and data extraction, handling intricate queries related to statistical modelling in community health.",
        image: null,
        profileUrl: "https://www.cmch-vellore.edu/dr-shalini-j/",
        scholarUrl: null,
    },
    {
        id: 3,
        name: "Venkata Raghava Mohan",
        designation: "Professor",
        affiliation: "Dept. of Community Health, CMC Vellore",
        expertise: ["Sampling techniques", "Statistics"],
        bio: "Specialising in rigorous sampling methods, Venkata Raghava Mohan helps students deeply understand population statistics and proper methodological design.",
        image: "/faculty/venkata.jpg",
        imagePosition: "center 20%",
        fit: "cover",
        profileUrl: "https://www.cmch-vellore.edu/venkata-raghava-m/",
        scholarUrl: null,
    },
];

export default function FacultyPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState<typeof facultyData[0] | null>(null);

    const filteredFaculty = facultyData.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-slate-200 pb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Our <span className="text-primary">Faculty</span>
                        </h1>
                        <p className="text-slate-600 max-w-xl text-lg">
                            Learn directly from accomplished researchers and practitioners leading the fields of epidemiology and biostatistics globally.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search faculty or expertise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
                        />
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFaculty.map((faculty) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={faculty.id}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                            onClick={() => setSelectedFaculty(faculty)}
                        >
                            <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                                {faculty.image ? (
                                    <Image
                                        src={faculty.image}
                                        alt={faculty.name}
                                        fill
                                        className={`${faculty.fit === 'contain' ? 'object-contain p-8' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                                        style={{ objectPosition: faculty.imagePosition ?? "center 20%" }}
                                    />
                                ) : (
                                    <GraduationCap size={48} className="text-slate-400 opacity-50 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                )}
                            </div>

                            <div className="p-6 relative">
                                <div className="absolute -top-7 right-6 z-20">
                                    <a
                                        href={faculty.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-white p-2 rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                                        title="View academic profile"
                                    >
                                        <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                            <ExternalLink size={18} />
                                        </div>
                                    </a>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{faculty.name}</h3>
                                <p className="text-primary-light font-medium text-sm mb-3">{faculty.designation}</p>

                                <p className="text-sm text-slate-500 flex items-center gap-2 mb-4">
                                    <MapPin size={14} className="flex-shrink-0" />
                                    <span className="truncate">{faculty.affiliation}</span>
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {faculty.expertise.slice(0, 2).map((exp, idx) => (
                                        <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                                            {exp}
                                        </span>
                                    ))}
                                    {faculty.expertise.length > 2 && (
                                        <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                                            +{faculty.expertise.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal for Faculty Details */}
                <AnimatePresence>
                    {selectedFaculty && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-left">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                                onClick={() => setSelectedFaculty(null)}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row"
                            >
                                <button
                                    onClick={() => setSelectedFaculty(null)}
                                    className="absolute top-4 right-4 bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 p-2 rounded-full transition-colors z-20"
                                >
                                    <X size={20} />
                                </button>

                                <div className="md:w-2/5 md:min-h-[500px] bg-slate-100 relative flex items-center justify-center border-r border-slate-200 min-h-[300px]">
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/10"></div>
                                    {selectedFaculty.image ? (
                                        <Image
                                            src={selectedFaculty.image}
                                            alt={selectedFaculty.name}
                                            fill
                                            className={`${selectedFaculty.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
                                            style={{ objectPosition: selectedFaculty.imagePosition ?? "center 20%" }}
                                        />
                                    ) : (
                                        <GraduationCap size={72} className="text-slate-300 opacity-60 z-10" />
                                    )}
                                </div>

                                <div className="md:w-3/5 p-8 md:p-12 flex flex-col">
                                    <div className="mb-2">
                                        <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{selectedFaculty.designation}</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedFaculty.name}</h2>
                                    <p className="text-slate-500 flex items-center gap-2 mb-8 border-b border-slate-100 pb-6">
                                        <MapPin size={18} className="text-secondary" />
                                        {selectedFaculty.affiliation}
                                    </p>

                                    <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <BookOpen size={18} className="text-primary-light" />
                                        Areas of Expertise
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selectedFaculty.expertise.map((exp, idx) => (
                                            <span key={idx} className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-default text-sm px-4 py-1.5 rounded-lg font-medium border border-slate-200">
                                                {exp}
                                            </span>
                                        ))}
                                    </div>

                                    <h4 className="text-lg font-bold text-slate-900 mb-3">About</h4>
                                    <p className="text-slate-600 leading-relaxed text-base flex-grow">
                                        {selectedFaculty.bio}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                                        <a
                                            href={selectedFaculty.profileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            <ExternalLink size={15} />
                                            Academic Profile
                                        </a>
                                        {selectedFaculty.scholarUrl && (
                                            <a
                                                href={selectedFaculty.scholarUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                                            >
                                                <ExternalLink size={15} />
                                                Google Scholar
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
