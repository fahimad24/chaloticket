"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { DollarSign } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Ticket } from "lucide-react";

const ColumnMetrics = ({ ticketsAdded, ticketsSold, revenue }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* CARD 1: TOTAL TICKETS ADDED */}
      <Card className="rounded-2xl border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 overflow-hidden relative group hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
              Total Tickets Added
            </span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-300">
              {ticketsAdded}
            </h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +12% from last month
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CARD 2: TOTAL TICKETS SOLD */}
      <Card className="rounded-2xl border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 overflow-hidden relative group hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
              Total Tickets Sold
            </span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-300">
              {ticketsSold.totalTicketsSold}
            </h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18% conversion rate
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CARD 3: TOTAL REVENUE */}
      <Card className="rounded-2xl border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 overflow-hidden relative group hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
              Total Gross Revenue
            </span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-[#6367FF]">
              ৳ {revenue.toLocaleString()}
            </h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +24% vs target projections
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColumnMetrics;
