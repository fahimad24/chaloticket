import { TrendingUp, Filter, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import ColumnMetrics from "@/app/components/ColumnMetrics";
import {
  fetchMonthlyReport,
  fetchTotalRevenue,
  fetchTotalTicketsQuantity,
  fetchTotalTicketsSold,
} from "@/lib/api-action";

import RevenueChart from "@/app/components/chart/RevenueChart";
import SoldChart from "@/app/components/chart/SoldChart";

export default async function RevenueOverview() {
  const totalTicketsAdded = await fetchTotalTicketsQuantity();
  const totalTicketsSold = await fetchTotalTicketsSold();
  const totalRevenue = await fetchTotalRevenue();
  const monthlyReport = await fetchMonthlyReport();
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-[#6367FF]" /> Revenue Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time insights into your ticket sales, inventories, and gross
            earnings.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-xl border-slate-200 text-xs font-semibold gap-1.5 text-slate-600"
          >
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>
          <Button
            size="sm"
            className="h-9 rounded-xl bg-[#6367FF] hover:bg-[#5054E3] text-white text-xs font-semibold gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export Report
          </Button>
        </div>
      </div>

      {/* ─── ৩. ৩-কলাম মেট্রিকেস কার্ডস (3-Column Metrics Row) ─── */}
      <ColumnMetrics
        ticketsAdded={totalTicketsAdded}
        ticketsSold={totalTicketsSold}
        revenue={totalRevenue}
      />
      {/* ─── ৪. চার্টস সেকশন (Charts Section) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART A: REVENUE TRENDS (AREA CHART) */}
        <RevenueChart data={monthlyReport} />

        {/* CHART B: TICKETS ADDED VS SOLD (BAR CHART) */}
        <SoldChart data={monthlyReport} />
      </div>
    </div>
  );
}
