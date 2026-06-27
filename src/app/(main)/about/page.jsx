"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Headphones,
  Users,
  MapPin,
  Award,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#6367FF]/10">
      <div className="relative overflow-hidden bg-linear-to-b from-[#6367FF]/5 via-white to-white pt-24 pb-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-12 left-1/4 w-72 h-72 bg-[#6367FF]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffdbfd]/60 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border bg-[#ffdbfd]/40 text-[#6367FF] border-[#C9BEFF]/40 uppercase tracking-wider">
            About Chalo Ticket
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl leading-tight">
            Making Your Journey <br />
            <span className="text-[#6367FF]">Smart & Seamless</span>
          </h1>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Chalo Ticket is Bangladesh&apos;s ultimate digital transportation
            hub, connecting thousands of passengers with verified bus, train,
            and air operators instantly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/60 border border-slate-100 p-8 rounded-3xl text-center shadow-sm">
          <div>
            <p className="text-3xl md:text-4xl font-black text-slate-950">
              50k+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
              Happy Passengers
            </p>
          </div>
          <div className="border-l border-slate-200/60">
            <p className="text-3xl md:text-4xl font-black text-[#6367FF]">
              120+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
              Verified Vendors
            </p>
          </div>
          <div className="border-l border-slate-200/60">
            <p className="text-3xl md:text-4xl font-black text-slate-950">
              500+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
              Routes Covered
            </p>
          </div>
          <div className="border-l border-slate-200/60">
            <p className="text-3xl md:text-4xl font-black text-[#8494FF]">
              24/7
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
              Customer Support
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We are redefining the ticketing system by prioritizing security,
            speed, and real-time choice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#6367FF]" />,
              title: "100% Verified Tickets",
              desc: "Every vendor and schedule on Chalo Ticket is strictly cross-verified before going live, guaranteeing zero duplicate bookings.",
            },
            {
              icon: <Zap className="w-6 h-6 text-[#8494FF]" />,
              title: "Lightning Fast Booking",
              desc: "No unnecessary waiting. Search your preferred transport option, choose your desired seat, and confirm within a minute.",
            },
            {
              icon: <Headphones className="w-6 h-6 text-[#6367FF]" />,
              title: "Dedicated Support Team",
              desc: "Facing an issue at the counter or during the journey? Our customer success team is online round-the-clock to back you up.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-950">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-[#6367FF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <span className="text-[10px] bg-linear-to-r from-[#6367FF] to-[#8494FF] text-white font-extrabold tracking-widest uppercase px-3 py-1 rounded-lg">
              Our Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Empowering Every Traveler Across The Country.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We envision a future where commuting or traveling is free from the
              hassles of physical counter queues and price manipulations.
              Through modern software architecture, Chalo Ticket connects
              passengers directly with vendors transparently.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8494FF] mt-0.5 shrink-0" />
                <p className="text-xs font-semibold text-slate-300">
                  Seamless Inter-City Network
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#8494FF] mt-0.5 shrink-0" />
                <p className="text-xs font-semibold text-slate-300">
                  Fair Pricing Guarantee
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#6367FF]" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Join Us Today
              </p>
            </div>
            <p className="text-xl font-bold text-slate-100">
              Ready to explore your next destination?
            </p>
            <p className="text-xs text-slate-400">
              Browse from thousands of available slots, check perks like Wi-Fi
              and Air Conditioned options, and plan flawlessly.
            </p>
            <div className="pt-4">
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center gap-2 bg-[#6367FF] hover:bg-[#5054E6] text-white font-bold text-sm px-5 h-11 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
              >
                <span>Browse Tickets Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
