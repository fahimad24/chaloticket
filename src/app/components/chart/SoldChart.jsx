"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SoldChart = ({ data }) => {
  return (
    <Card className="rounded-2xl border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 p-5 space-y-4">
      <div>
        <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-300">
          Inventory Allocation vs Conversion
        </CardTitle>
        <CardDescription className="text-xs text-slate-400 dark:text-slate-300">
          Comparing added transport routes against actual ticket sales
        </CardDescription>
      </div>
      <div className="h-72 w-full text-xs font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
  );
};

export default SoldChart;
