"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#FFDBFD] via-[#C9BEFF]/30 to-[#8494FF]/20 p-4 md:p-8 font-sans antialiased selection:bg-[#6367FF]/20">

            {/* Glow effects in background */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#C9BEFF] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFDBFD] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-700" />

            {/* Main Glassmorphic Ticket Container */}
            <div className="relative max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_25px_50px_-12px_rgba(99,103,255,0.15)] border border-white/60 overflow-hidden flex flex-col md:flex-row">

                {/* Left Section: Visual / Route Status */}
                <div className="bg-[#6367FF] p-8 md:w-2/5 flex flex-col justify-between text-white relative">
                    {/* Decorative Pattern Lines */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

                    <div className="relative z-10">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#FFDBFD]">System Alert</span>
                        <h2 className="text-6xl font-black mt-2 text-[#FFDBFD]">404</h2>
                    </div>

                    {/* Animated Vehicle Route Visual */}
                    <div className="relative z-10 my-12 flex flex-col gap-6 pl-4 border-l-2 border-dashed border-[#8494FF]">
                        {/* Plane SVG */}
                        <div className="relative -left-6.25 bg-white text-[#6367FF] p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md animate-bounce animation-duration-[3s]">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z" />
                            </svg>
                        </div>
                        {/* Train SVG */}
                        <div className="relative -left-6.25 bg-[#8494FF] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md animate-bounce animation-duration-[4s] [animation-delay:0.5s]">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2c-4 0-7 2.08-7 5v10c0 2 1.25 3 3 3l1 .5V22h6v-1.5l1-.5c1.75 0 3-1 3-3V7c0-2.92-3-5-7-5zm0 2c3.51 0 5 1.7 5 3v3H7V7c0-1.3 1.49-3 5-3zm5 13H7v-5h10v5zm-11.5-2c-.83 0-1.5-.67-1.5-1.5S4.67 12 5.5 12s1.5.67 1.5 1.5S6.33 15 5.5 15zm13 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                            </svg>
                        </div>
                        {/* Bus SVG */}
                        <div className="relative -left-6.25 bg-[#C9BEFF] text-[#6367FF] p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md animate-bounce animation-duration-[3.5s] [animation-delay:1s]">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M4 16c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-7c0-2.12-3.88-3-8-3s-8 .88-8 3v7zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative z-10 text-xs font-medium tracking-wide text-[#C9BEFF]">
                        ChaloTicket Transit Authority © 2026
                    </div>
                </div>

                {/* Right Section: Core Ticket Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between relative bg-white">

                    {/* Brand Logo Header */}
                    <div className="flex items-center justify-between border-b border-[#C9BEFF]/40 pb-4 mb-6">
                        <div className="text-xl font-black tracking-tight text-[#6367FF]">
                            Chalo<span className="text-[#8494FF]">Ticket</span>
                        </div>
                        <div className="bg-[#FFDBFD] text-[#6367FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Status: Lost
                        </div>
                    </div>

                    {/* Error Message Details */}
                    <div className="my-auto">
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3">
                            Route Connection Cancelled
                        </h1>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                            The destination timetable you requested doesn&apos;t exist or has temporarily departed. Please double-check your terminal number or head back to the main booking hub.
                        </p>

                        {/* Simulated Data Info Block */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8 grid grid-cols-2 gap-4 text-left">
                            <div>
                                <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Departure Point</span>
                                <span className="text-sm font-semibold text-slate-700">Current Session</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Arrival Point</span>
                                <span className="text-sm font-semibold text-[#6367FF]">Unknown Horizon</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/"
                            className="flex-1 px-6 py-3.5 bg-[#6367FF] hover:bg-[#8494FF] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shadow-[#6367FF]/20 text-center transform hover:-translate-y-0.5"
                        >
                            Back to Main Hub
                        </Link>
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3.5 border-2 border-[#C9BEFF] hover:border-[#8494FF] text-slate-600 font-bold text-sm rounded-xl transition-all duration-300 text-center hover:bg-slate-50"
                        >
                            Previous Terminal
                        </button>
                    </div>

                </div>

                {/* Ticket Perforation / Cutout Aesthetics (Visible on desktop screens) */}
                <div className="hidden md:block absolute left-[40%] top-0 -translate-x-1/2 w-6 h-6 bg-[#FFDBFD] rounded-full -mt-3 border-b border-white/40 z-20" />
                <div className="hidden md:block absolute left-[40%] bottom-0 -translate-x-1/2 w-6 h-6 bg-[#C9BEFF]/40 rounded-full -mb-3 border-t border-white/40 z-20" />
            </div>
        </div>
    );
}