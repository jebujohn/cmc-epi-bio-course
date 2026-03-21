"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, GraduationCap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Agenda", href: "/agenda" },
    { name: "Faculty", href: "/faculty" },
    { name: "Feedback", href: "/feedback" },
  ];

  return (
    <nav className="fixed w-full z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary leading-tight">
                  46th Epidemiology Refresher Course
                </span>
                <span className="text-xs text-secondary font-medium tracking-wide">
                  Principles and Practice of Epidemiology
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/registration"
              className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <GraduationCap size={18} />
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-100 shadow-xl absolute w-full left-0 bg-white/95">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-slate-50 w-full text-center rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/registration"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center bg-primary hover:bg-primary-light text-white px-5 py-3 rounded-md text-base font-medium transition-colors shadow-sm"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
