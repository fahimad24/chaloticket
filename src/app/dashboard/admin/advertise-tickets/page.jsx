"use client";
import AdvertiseTable from "@/app/components/table/AdvertiseTable";
import { fetchAllTickets } from "@/lib/api-action";
import { Megaphone, Layers } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdvertiseTickets() {
  const [tickets, setTickets] = useState([]);
  const currentAdvertisedCount = tickets.filter((t) => t.isAdvertised).length;

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllTickets("", "approved");
      setTickets(data);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER & COUNTER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-600 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-primary tracking-tight flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-[#6367FF]" /> Advertise Tickets
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your campaign display slots. Enable the switch to push any
            verified ticket to the main portal.
          </p>
        </div>

        {/* SLOT COUNTER */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-600 border border-slate-100 dark:border-slate-500 px-4 py-3 rounded-xl min-w-50 self-start lg:self-center">
          <div className="p-2 bg-indigo-50 text-[#6367FF] rounded-lg">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
              Campaign Slots
            </p>
            <p className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
              <span
                className={
                  currentAdvertisedCount >= 6
                    ? "text-rose-600 font-black"
                    : "text-[#6367FF]"
                }
              >
                {currentAdvertisedCount}
              </span>
              <span className="text-slate-400 dark:text-slate-300 font-normal">
                {" "}
                / 6 Active
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* TICKET TABLE */}
      <AdvertiseTable
        tickets={tickets}
        setTickets={setTickets}
        currentAdvertisedCount={currentAdvertisedCount}
      />
    </div>
  );
}
