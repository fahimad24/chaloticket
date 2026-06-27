"use client";

import React from "react";
import { Bus, Train, Plane, MapPin, Calendar, Search } from "lucide-react";

export default function SearchBar({ searchParams, handleSearch }) {
  const defaultType = searchParams.get("transportType") || "all";
  const defaultFrom = searchParams.get("from") || "";
  const defaultTo = searchParams.get("to") || "";
  const defaultDate = searchParams.get("date") || "";

  return (
    <div className="w-full rounded-3xl shadow-[0_20px_50px_rgba(99,103,255,0.08)] border border-[#C9BEFF]/30 p-6 text-left backdrop-blur-xl bg-white/90">
      <form action={handleSearch} className="space-y-6">
        <div className="flex gap-2 border-b border-slate-100 pb-4 overflow-x-auto scrollbar-none">
          {[
            {
              value: "all",
              label: "All Transport",
              icon: <Search className="w-4 h-4" />,
            },
            { value: "bus", label: "Bus", icon: <Bus className="w-4 h-4" /> },
            {
              value: "train",
              label: "Train",
              icon: <Train className="w-4 h-4" />,
            },
            {
              value: "plane",
              label: "Plane",
              icon: <Plane className="w-4 h-4" />,
            },
          ].map((item) => (
            <label
              key={item.value}
              className="relative flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="transportType"
                value={item.value}
                defaultChecked={defaultType === item.value}
                className="sr-only peer"
              />
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 border border-transparent peer-checked:border-[#C9BEFF] peer-checked:bg-[#ffdbfd]/40 peer-checked:text-[#6367FF] hover:bg-slate-50 transition-all duration-200">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#8494FF]" />
              <span>From</span>
            </label>
            <input
              type="text"
              name="from"
              placeholder="Departure city"
              defaultValue={defaultFrom}
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#8494FF]" />
              <span>To</span>
            </label>
            <input
              type="text"
              name="to"
              placeholder="Destination city"
              defaultValue={defaultTo}
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#8494FF]" />
              <span>Journey Date</span>
            </label>
            <input
              type="date"
              name="date"
              defaultValue={defaultDate}
              className="w-full px-4 py-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-slate-700 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-12 bg-[#6367FF] hover:bg-[#5054E6] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#6367FF]/15 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Tickets</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
