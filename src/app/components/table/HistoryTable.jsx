import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HistoryTable({ bookedTickets }) {
  const getStatusStyles = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "paid":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50";
      case "accepted":
        return "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50";
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-200/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
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
          {bookedTickets && bookedTickets.length > 0 ? (
            bookedTickets.map((item) => (
              <TableRow
                key={item._id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/40 dark:hover:bg-slate-900/40 transition-colors"
              >
                <TableCell className="py-4 pl-6 min-w-70">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold">
                        {item.from} → {item.to}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
                  {item.ticketId}
                </TableCell>
                <TableCell className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {item.transportType}
                </TableCell>
                <TableCell className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {formatDate(item.bookedAt)}
                </TableCell>
                <TableCell className="font-black text-slate-950 dark:text-white text-right text-base">
                  ৳{item.price}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <span
                    className={`inline-flex px-2.5 py-1 text-[10px] font-black rounded-lg border uppercase tracking-wider ${getStatusStyles(item.status)}`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-4 text-slate-500 dark:text-slate-400"
              >
                No booked tickets found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
