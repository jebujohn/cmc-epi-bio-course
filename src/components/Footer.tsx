import Link from "next/link";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Globe className="text-secondary-light" />
                            46th Epidemiology Refresher Course
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-400">
                            A comprehensive two-week course on Principles and Practice of Epidemiology,
                            designed for medical college faculty, health managers, and researchers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 md:pl-10">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/agenda" className="hover:text-white transition-colors">Course Agenda</Link>
                            </li>
                            <li>
                                <Link href="/faculty" className="hover:text-white transition-colors">Expert Faculty</Link>
                            </li>
                            <li>
                                <Link href="/registration" className="hover:text-white transition-colors">Registration</Link>
                            </li>
                            <li>
                                <Link href="/feedback" className="hover:text-white transition-colors">Daily Feedback</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-secondary-light flex-shrink-0" />
                                <span>
                                    Community Health Training Centre (CHTC)<br />
                                    Bagayam, CMC Vellore<br />
                                    Tamil Nadu, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-secondary-light" />
                                <a href="mailto:chad@cmcvellore.ac.in" className="hover:text-white transition-colors">chad@cmcvellore.ac.in</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-secondary-light" />
                                <span>(0416) 228 4207</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center text-slate-500">
                    <p className="mb-2">Organized by <strong>Department of Community Health & Centre for Public Health</strong>, CMC Vellore.</p>
                    <p>&copy; {new Date().getFullYear()} Christian Medical College, Vellore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
