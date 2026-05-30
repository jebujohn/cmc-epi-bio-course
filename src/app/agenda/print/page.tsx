"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { schedule } from "@/data/agenda";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const DAY_COLORS = [
    "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a",
    "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a", "#1a4a7a",
];

function isBreak(topic: string) {
    return topic.startsWith("☕") || topic.startsWith("🍽") || topic.startsWith("🍵");
}

export default function PrintAgendaPage() {
    return (
        <>
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                body { background: #f8fafc; }

                /* Hide the site chrome on this page */
                nav, footer { display: none !important; }
                main { padding-top: 0 !important; }

                .page-wrapper {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 40px 32px;
                    background: white;
                }

                /* ── Print button (screen only) ─────────────────── */
                .print-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 32px;
                    padding: 10px 20px;
                    background: #1a4a7a;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                }
                .print-btn:hover { background: #15396a; }

                /* ── Header ─────────────────────────────────────── */
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 20px;
                    border-bottom: 3px solid #1a4a7a;
                    margin-bottom: 28px;
                }
                .header-text h1 {
                    font-size: 22px;
                    font-weight: 800;
                    color: #1a4a7a;
                    line-height: 1.2;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .header-text h2 {
                    font-size: 14px;
                    font-weight: 500;
                    color: #64748b;
                    margin-top: 4px;
                }
                .header-text .dates {
                    display: inline-block;
                    margin-top: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    color: white;
                    background: #1a4a7a;
                    padding: 3px 10px;
                    border-radius: 4px;
                }
                .logo-wrap {
                    flex-shrink: 0;
                }

                /* ── Day block ──────────────────────────────────── */
                .day-block {
                    margin-bottom: 24px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    overflow: hidden;
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                .day-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 10px 16px;
                    background: #1a4a7a;
                    color: white;
                }
                .day-num {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .day-num span:first-child {
                    font-size: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    opacity: 0.8;
                    line-height: 1;
                }
                .day-num span:last-child {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 1;
                }
                .day-info h3 {
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 1.2;
                }
                .day-info p {
                    font-size: 12px;
                    opacity: 0.8;
                    margin-top: 1px;
                }

                /* ── Sessions table ─────────────────────────────── */
                .sessions {
                    width: 100%;
                    border-collapse: collapse;
                }
                .sessions tr {
                    border-bottom: 1px solid #f1f5f9;
                }
                .sessions tr:last-child {
                    border-bottom: none;
                }
                .sessions td {
                    padding: 8px 14px;
                    font-size: 13px;
                    vertical-align: middle;
                }
                .sessions .col-time {
                    white-space: nowrap;
                    width: 120px;
                    color: #475569;
                    font-weight: 600;
                    font-size: 12px;
                    border-right: 1px solid #f1f5f9;
                }
                .sessions .col-topic {
                    color: #1e293b;
                    font-weight: 500;
                    flex: 1;
                }
                .sessions .col-faculty {
                    width: 200px;
                    color: #64748b;
                    font-size: 12px;
                    text-align: right;
                    font-style: italic;
                }

                /* Break rows */
                .row-break {
                    background: #f8fafc;
                }
                .row-break .col-time { color: #94a3b8; }
                .row-break .col-topic { color: #94a3b8; font-weight: 400; font-style: italic; }

                /* ── Footer ─────────────────────────────────────── */
                .footer {
                    margin-top: 32px;
                    padding-top: 16px;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                    font-size: 11px;
                    color: #94a3b8;
                }

                /* ── Print styles ────────────────────────────────── */
                @media print {
                    body { background: white; }
                    .page-wrapper { padding: 20px 24px; max-width: 100%; }
                    .print-btn { display: none !important; }
                    .day-block { break-inside: avoid; page-break-inside: avoid; }
                    @page {
                        size: A4;
                        margin: 15mm 12mm;
                    }
                }
            `}</style>

            <div className={`page-wrapper ${inter.className}`}>
                {/* Print button — hidden on print */}
                <button className="print-btn" onClick={() => window.print()}>
                    🖨 Print / Save as PDF
                </button>

                {/* Header */}
                <div className="header">
                    <div className="header-text">
                        <h1>Principles &amp; Practice of Epidemiology</h1>
                        <h2>Christian Medical College, Vellore — ERC 2026</h2>
                        <span className="dates">6 July – 18 July 2026</span>
                    </div>
                    <div className="logo-wrap">
                        <Image src="/cmc-logo.png" alt="CMC Vellore" width={80} height={80} style={{ objectFit: "contain" }} />
                    </div>
                </div>

                {/* Schedule */}
                {schedule.map((dayPlan) => (
                    <div key={dayPlan.day} className="day-block">
                        <div className="day-header">
                            <div className="day-num">
                                <span>Day</span>
                                <span>{dayPlan.day}</span>
                            </div>
                            <div className="day-info">
                                <h3>{dayPlan.date}</h3>
                                <p>{dayPlan.title}</p>
                            </div>
                        </div>
                        <table className="sessions">
                            <tbody>
                                {dayPlan.sessions.map((session, idx) => (
                                    <tr key={idx} className={isBreak(session.topic) ? "row-break" : ""}>
                                        <td className="col-time">{session.time}</td>
                                        <td className="col-topic">{session.topic}</td>
                                        <td className="col-faculty">{session.faculty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}

                <div className="footer">
                    Christian Medical College &amp; Hospital, Vellore — Epidemiology Resource Centre (ERC) — Schedule subject to change
                </div>
            </div>
        </>
    );
}
