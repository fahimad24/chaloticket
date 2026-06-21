"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Ticket,
  ShoppingCart,
  Calendar,
  Filter,
  ArrowUpRight,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── ১. রেভিনিউ ও টিকিট বিক্রির ডেমো অ্যানালিটিক্স ডাটা ───
const REVENUE_DATA = [
  { month: "Jan", ticketsAdded: 80, ticketsSold: 45, revenue: 54000 },
  { month: "Feb", ticketsAdded: 95, ticketsSold: 60, revenue: 72000 },
  { month: "Mar", ticketsAdded: 120, ticketsSold: 85, revenue: 102000 },
  { month: "Apr", ticketsAdded: 110, ticketsSold: 90, revenue: 117000 },
  { month: "May", ticketsAdded: 140, ticketsSold: 115, revenue: 149500 },
  { month: "Jun", ticketsAdded: 165, ticketsSold: 130, revenue: 182000 },
];

export default function RevenueOverview() {
  const [timeframe, setTimeframe] = useState("6months");

  // ─── ২. মেট্রিকেস সামারি ক্যালকুলেশন ───
  const totalTicketsAdded = REVENUE_DATA.reduce(
    (sum, item) => sum + item.ticketsAdded,
    0,
  );
  const totalTicketsSold = REVENUE_DATA.reduce(
    (sum, item) => sum + item.ticketsSold,
    0,
  );
  const totalRevenue = REVENUE_DATA.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD 1: TOTAL TICKETS ADDED */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden relative group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Tickets Added
              </span>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                {totalTicketsAdded}
              </h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +12% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: TOTAL TICKETS SOLD */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden relative group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Tickets Sold
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                {totalTicketsSold}
              </h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +18% conversion rate
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: TOTAL REVENUE */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden relative group hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Gross Revenue
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-2xl md:text-3xl font-black text-[#6367FF]">
                ৳ {totalRevenue.toLocaleString()}
              </h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +24% vs target projections
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── ৪. চার্টস সেকশন (Charts Section) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART A: REVENUE TRENDS (AREA CHART) */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white p-5 space-y-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">
              Gross Revenue Flow
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Monthly breakdown of successful ticket payouts
            </CardDescription>
          </div>
          <div className="h-72 w-full text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6367FF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6367FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  formatter={(value) => [
                    `৳ ${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6367FF"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CHART B: TICKETS ADDED VS SOLD (BAR CHART) */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white p-5 space-y-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-800">
              Inventory Allocation vs Conversion
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Comparing added transport routes against actual ticket sales
            </CardDescription>
          </div>
          <div className="h-72 w-full text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REVENUE_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#94A3B8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Bar
                  dataKey="ticketsAdded"
                  name="Tickets Added"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                  opacity={0.4}
                  barSize={16}
                />
                <Bar
                  dataKey="ticketsSold"
                  name="Tickets Sold"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
