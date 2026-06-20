"use client";

import { useState, useEffect } from "react";
import {
  History,
  Search,
  CreditCard,
  ArrowDownToLine,
  Calendar,
  Ticket,
  DollarSign,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// ─── ১. ডেমো স্ট্রাইপ ট্রানজেকশন ডাটা ───
const MOCK_TRANSACTIONS = [
  {
    id: "ch_3Mv9x8L2eZv1MioA0aBcDe1f",
    ticketTitle: "Dhaka to Cox's Bazar Premium AC Bus",
    amount: 2400,
    paymentDate: "2026-06-18T14:22:00",
    status: "succeeded",
  },
  {
    id: "ch_3Mv7a1K9eZv1MioA9zXyWv3u",
    ticketTitle: "Ena Transport - Sylhet Non-AC Cruise",
    amount: 2100,
    paymentDate: "2026-06-15T09:45:00",
    status: "succeeded",
  },
  {
    id: "ch_3Mu2b5J1eZv1MioA4pQrSt7s",
    ticketTitle: "Saintmartin Travel - Direct Ship Ticket",
    amount: 10000,
    paymentDate: "2026-05-20T11:15:00",
    status: "succeeded",
  },
  {
    id: "ch_3Mt8c4H0eZv1MioA1jKlMn2q",
    ticketTitle: "Green Line Scania - Rajshahi Sleeper",
    amount: 1500,
    paymentDate: "2026-04-12T18:30:00",
    status: "succeeded",
  },
];

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // প্রিমিয়াম ফিল দেওয়ার জন্য ছোট লোডিং সিমুলেশন
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // 🔍 সার্চ ফিল্টারিং লজিক (টিকিট টাইটেল এবং ট্রানজেকশন আইডি দিয়ে সার্চ করা যাবে)
  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ডেট ফরম্যাটার
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <History className="w-7 h-7 text-[#6367FF]" /> Transaction History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and download receipts for all payments made securely via
            Stripe.
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex items-center max-w-md relative">
        <Search className="absolute left-3 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by ticket title or Transaction ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 focus-visible:ring-[#6367FF] rounded-xl border-slate-200"
        />
      </div>

      {/* TRANSACTIONS TABLE */}
      <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          {isLoading ? (
            // টেবিল স্কেলিটন লোডার
            <div className="p-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4"
                >
                  <Skeleton className="h-5 w-1/4 rounded-full" />
                  <Skeleton className="h-5 w-1/3 rounded-full" />
                  <Skeleton className="h-5 w-1/6 rounded-full" />
                  <Skeleton className="h-5 w-1/12 rounded-full" />
                </div>
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            // নো ডাটা ফাউন্ড স্টেট
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-700">
                No transactions found
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                We couldn&apos;t find any matching payment histories for your
                search query.
              </p>
            </div>
          ) : (
            // মেইন রেসপন্সিভ টেবিল
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/70">
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="font-semibold text-slate-600 pl-6 py-4">
                      Ticket Title
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600">
                      Transaction ID
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600">
                      Payment Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-600 text-right pr-6">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow
                      key={tx.id}
                      className="border-slate-50 hover:bg-slate-50/40 transition-colors group"
                    >
                      {/* TICKET TITLE & LOGO */}
                      <TableCell className="font-medium text-slate-800 pl-6 py-4 max-w-75">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FFDBFD] text-[#6367FF] flex items-center justify-center shrink-0">
                            <Ticket className="w-4 h-4" />
                          </div>
                          <span className="truncate block font-semibold group-hover:text-[#6367FF] transition-colors">
                            {tx.ticketTitle}
                          </span>
                        </div>
                      </TableCell>

                      {/* TRANSACTION ID */}
                      <TableCell className="font-mono text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md tracking-tight">
                            {tx.id}
                          </span>
                        </div>
                      </TableCell>

                      {/* PAYMENT DATE */}
                      <TableCell className="text-slate-600 text-sm">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(tx.paymentDate)}
                        </div>
                      </TableCell>

                      {/* AMOUNT (৳) */}
                      <TableCell className="text-right pr-6">
                        <span className="font-extrabold text-[#6367FF] text-sm md:text-base">
                          ৳ {tx.amount.toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-medium">
                          Stripe Verified
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
