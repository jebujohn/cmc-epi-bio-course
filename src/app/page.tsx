"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users, Award, PlayCircle, NotebookText } from "lucide-react";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 z-0" />
        <div className="absolute opacity-10 blur-3xl rounded-full bg-primary/20 w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute opacity-20 blur-3xl rounded-full bg-secondary/20 w-96 h-96 bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <Link href="/registration">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-6 border border-green-200 shadow-sm hover:bg-green-200 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Registrations for 2026 cohort now open
              </motion.div>
            </Link>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              <span className="block text-2xl md:text-3xl text-primary font-bold mb-2">46th Epidemiology Refresher Course (ERC)</span>
              Principles and Practice of <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-green-500">Epidemiology</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Designed for medical faculty, postgraduate students and researchers <span className="font-medium text-primary">without formal epidemiology training</span>. 
              Enhance skills in clinical research, decision-making, and health management.
              <br className="hidden md:block" />
              <span className="text-primary font-bold">Fee: INR 8850</span> (Inclusive of GST). 
              Limited to <span className="font-bold text-slate-900">40 seats</span>. 
              <br className="hidden md:block" /> <span className="text-sm font-medium text-slate-500">(Accommodation charges extra)</span>
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link href="/registration" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Register Now
                <ArrowRight size={20} />
              </Link>
              <Link href="/agenda" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm group">
                View Agenda
                <NotebookText size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 mt-12 pt-8 border-t border-slate-200 justify-center">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2.5 rounded-lg text-primary">
                  <Calendar size={22} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Dates</p>
                  <p className="text-sm font-semibold text-slate-900">July 6 - July 18, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2.5 rounded-lg text-secondary">
                  <MapPin size={22} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-slate-900">CHTC Bagayam, CMC Vellore</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600">
                  <Calendar size={22} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Application Deadline</p>
                  <p className="text-sm font-semibold text-slate-900">May 25, 2026</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Attend This Course?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Designed specifically for medical professionals and researchers aiming to strengthen their analytical capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="bg-blue-100 text-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PlayCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hands-On Sessions</h3>
              <p className="text-slate-600 leading-relaxed">
                Move beyond theory. Our curriculum heavily emphasizes software sessions including <strong>R, SPSS, Epi Info, and Zotero</strong>.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="bg-green-100 text-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Faculty</h3>
              <p className="text-slate-600 leading-relaxed">
                Learn directly from renowned professors and practicing epidemiologists from CMC and international partner universities.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="bg-orange-100 text-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Certification</h3>
              <p className="text-slate-600 leading-relaxed">
                Receive an official certificate from CMC Vellore upon successfully completing the two-week rigorous curriculum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue & Accommodation Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Venue & Accommodation</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Experience learning at the historic Community Health Training Centre (CHTC) in the Christian Medical College campus at Bagayam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <MapPin className="text-primary" />
                  Training Center
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The course is held at CHTC, Bagayam. Surrounded by lush greenery, the center provides a tranquil and focused environment for intensive statistical learning.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Users className="text-secondary" />
                  Participant Accommodation
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Shared accommodation is available at the CHTC Guest House for the duration of the course to facilitate networking among participants.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-medium mb-1">Non-AC Room</p>
                    <p className="font-bold text-slate-900">₹550 <span className="text-sm font-normal text-slate-500">/ night</span></p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-medium mb-1">AC Room</p>
                    <p className="font-bold text-slate-900">₹650 <span className="text-sm font-normal text-slate-500">/ night</span></p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">* Food is available at the mess for an additional cost.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 relative group">
                <img
                  src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1000/height:1000/https://cdn.gamma.app/4ak4y6ycqi9c36v/37f434776ddf49d2846bcf3efb0b9ecf/original/chtc.jpg"
                  alt="CHTC Building"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-6">CHTC Campus, Bagayam</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 relative group">
                <img
                  src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:1000/height:1000/https://cdn.gamma.app/4ak4y6ycqi9c36v/4ccf376f86db41328245eb7d3095278c/original/20250801_101012-1-1.jpg"
                  alt="CHTC Accommodation"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <p className="text-white font-medium p-6">Guest House Accommodation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
