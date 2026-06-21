"use client";

import { useState } from "react";
import {
  Check,
  X,
  User,
  Ticket,
  Layers,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── ১. ডেমো বুকিং রিকোয়েস্ট ডাটা ───
const INITIAL_REQUESTS = [
  {
    id: "BK-4001",
    user: {
      name: "Asif Zubayer",
      email: "asif.zubayer@gmail.com",
    },
    ticketTitle:
      "Hanif Enterprise - Volvo Multi-Axle Sleeper (Dhaka -> Cox's Bazar)",
    unitPrice: 1500,
    bookingQuantity: 3,
    status: "pending", // pending, accepted, rejected
  },
  {
    id: "BK-4002",
    user: {
      name: "Tanjina Sultana",
      email: "tanjina.s@yahoo.com",
    },
    ticketTitle: "Green Line Scania - Rajshahi Day Cruise (Dhaka -> Rajshahi)",
    unitPrice: 1200,
    bookingQuantity: 2,
    status: "pending",
  },
  {
    id: "BK-4003",
    user: {
      name: "Rahat Chowdhury",
      email: "rahat.chowdhury@outlook.com",
    },
    ticketTitle:
      "Saintmartin Travel - Premium Direct Cruise (Chittagong -> Saintmartin)",
    unitPrice: 2200,
    bookingQuantity: 5,
    status: "accepted", // পূর্বেই এক্সেপ্টেড স্টেটের উদাহরণ
  },
];

export default function RequestedBookings() {
  const [bookingRequests, setBookingRequests] = useState(INITIAL_REQUESTS);

  // ✅ ACCEPT BUTTON HANDLER
  const handleAccept = (id) => {
    setBookingRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "accepted" } : request,
      ),
    );
  };

  // ❌ REJECT BUTTON HANDLER
  const handleReject = (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this booking request?",
    );
    if (confirmReject) {
      setBookingRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "rejected" } : request,
        ),
      );
    }
  };

  // 🏷️ স্ট্যাটাস ওয়াইজ ব্যাজ জেনারেটর
  const getStatusBadge = (status) => {
    const badges = {
      pending: (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 gap-1"
        >
          <Clock className="w-3 h-3" /> Pending
        </Badge>
      ),
      accepted: (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1"
        >
          <CheckCircle2 className="w-3 h-3" /> Accepted
        </Badge>
      ),
      rejected: (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-700 border-rose-200 gap-1"
        >
          <XCircle className="w-3 h-3" /> Rejected
        </Badge>
      ),
    };
    return badges[status];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Inbox className="w-7 h-7 text-[#6367FF]" /> Requested Bookings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, accept, or decline passenger booking requests for your listed
          active routes.
        </p>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-62.5 font-semibold text-slate-700 py-4 pl-6">
                User Details
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4">
                Ticket Title
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-center">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-right">
                Total Price
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-center">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookingRequests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-slate-400"
                >
                  No booking requests available at the moment.
                </TableCell>
              </TableRow>
            ) : (
              bookingRequests.map((request) => {
                // মোট প্রাইস হিসাব করা হচ্ছে: unitPrice * bookingQuantity
                const totalPrice = request.unitPrice * request.bookingQuantity;
                const isPending = request.status === "pending";

                return (
                  <TableRow
                    key={request.id}
                    className="hover:bg-slate-50/50 transition-colors border-slate-100"
                  >
                    {/* ১. USER NAME / EMAIL */}
                    <TableCell className="py-4 pl-6 font-medium">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-800">
                            {request.user.name}
                          </p>
                          <p className="text-xs text-slate-400 font-mono select-all">
                            {request.user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* ২. TICKET TITLE */}
                    <TableCell className="py-4 max-w-75">
                      <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                        <Ticket className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          {request.ticketTitle}
                        </span>
                      </div>
                    </TableCell>

                    {/* ৩. BOOKING QUANTITY */}
                    <TableCell className="py-4 text-center font-semibold text-slate-700">
                      <div className="inline-flex items-center gap-1 bg-slate-100/80 px-2.5 py-1 rounded-md text-xs">
                        <Layers className="w-3 h-3 text-slate-500" />
                        {request.bookingQuantity} Pcs
                      </div>
                    </TableCell>

                    {/* ৪. TOTAL PRICE */}
                    <TableCell className="py-4 text-right font-extrabold text-slate-900">
                      <div className="space-y-0.5">
                        <p className="text-sm">
                          ৳ {totalPrice.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal">
                          ৳ {request.unitPrice} × {request.bookingQuantity}
                        </p>
                      </div>
                    </TableCell>

                    {/* ৫. LIVE STATUS BADGE */}
                    <TableCell className="py-4 text-center">
                      {getStatusBadge(request.status)}
                    </TableCell>

                    {/* ৬. ACTION BUTTONS (ACCEPT / REJECT) */}
                    <TableCell className="py-4 text-right pr-6">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-2">
                          {/* ACCEPT BUTTON */}
                          <Button
                            size="sm"
                            onClick={() => handleAccept(request.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-8 px-3 rounded-lg font-semibold text-xs flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Accept
                          </Button>

                          {/* REJECT BUTTON */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(request.id)}
                            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-3 rounded-lg font-semibold text-xs flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </Button>
                        </div>
                      ) : (
                        // অ্যাকশন নেওয়া হয়ে গেলে বাটন হাইড করে মেসেজ শো করবে
                        <span className="text-xs text-slate-400 italic font-medium pr-2">
                          Action Processed
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
