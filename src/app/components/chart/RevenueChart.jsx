"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <Card className="rounded-2xl border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 p-5 space-y-4">
      <div>
        <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-300">
          Gross Revenue Flow
        </CardTitle>
        <CardDescription className="text-xs text-slate-400 dark:text-slate-300">
          Monthly breakdown of successful ticket payouts
        </CardDescription>
      </div>
      <div className="h-72 w-full text-xs font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              formatter={(value) => [`৳ ${value.toLocaleString()}`, "Revenue"]}
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
  );
};

export default RevenueChart;
