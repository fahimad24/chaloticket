import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistorySkeleton() {
  const skeletonRows = Array.from({ length: 3 });

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14 pl-6">
              Trip Details
            </TableHead>
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14">
              Ticket ID
            </TableHead>
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14">
              Type
            </TableHead>
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14">
              Booked At
            </TableHead>
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14 text-right">
              Price
            </TableHead>
            <TableHead className="font-black text-slate-700 dark:text-slate-300 h-14 text-right pr-6">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, idx) => (
            <TableRow
              key={idx}
              className="border-b border-slate-100 dark:border-slate-800"
            >
              <TableCell className="py-4 pl-6 min-w-70">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse font-mono" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </TableCell>
              <TableCell className="py-4 text-right">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse ml-auto" />
              </TableCell>
              <TableCell className="py-4 pr-6">
                <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
