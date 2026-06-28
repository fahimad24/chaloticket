import { TrendingUp, Filter, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import ColumnMetrics from "@/app/components/ColumnMetrics";
import {
  fetchMonthlyReport,
  fetchTotalRevenue,
  fetchTotalTicketsQuantity,
  fetchTotalTicketsSold,
  getSession,
} from "@/lib/api-action";

import RevenueChart from "@/app/components/chart/RevenueChart";
import SoldChart from "@/app/components/chart/SoldChart";

export default async function RevenueOverview() {
  const { userId } = await getSession();
  const totalTicketsAdded = await fetchTotalTicketsQuantity(userId);
  const totalTicketsSold = await fetchTotalTicketsSold(userId);
  const totalRevenue = await fetchTotalRevenue(userId);
  const monthlyReport = await fetchMonthlyReport(userId);
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-primary tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-[#6367FF]" /> Revenue Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
            Real-time insights into your ticket sales, inventories, and gross
            earnings.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-xl border-slate-200 dark:border-slate-600 text-xs font-semibold gap-1.5 text-slate-600 dark:text-slate-300"
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

      <ColumnMetrics
        ticketsAdded={totalTicketsAdded}
        ticketsSold={totalTicketsSold}
        revenue={totalRevenue}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyReport} />

        <SoldChart data={monthlyReport} />
      </div>
    </div>
  );
}
