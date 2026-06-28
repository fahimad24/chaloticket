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
import { fetchBookedTicketsStatus, updateTicket } from "@/lib/api-action";
import { toast } from "sonner";
const RequestedBookingTable = ({ bookingRequests: initialRequests }) => {
  const [bookingRequests, setBookingRequests] = useState(initialRequests);

  console.log("Booking requests in table:", bookingRequests);

  // ✅ ACCEPT BUTTON HANDLER
  const handleAccept = async (id) => {
    const result = await fetchBookedTicketsStatus(id, "accepted");
    if (result) {
      setBookingRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, status: "accepted" } : request,
        ),
      );
      toast.success("Booking Accepted", {
        description: "You have accepted the booking request.",
      });
    }
  };

  // ❌ REJECT BUTTON HANDLER
  const handleReject = async (id, quantity, ticketId) => {
    const result = await fetchBookedTicketsStatus(id, "rejected");
    const data = await updateTicket(ticketId, { quantity: quantity });
    console.log("Reject result:", result);
    if (result) {
      setBookingRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, status: "rejected" } : request,
        ),
      );
      toast.error("Booking Rejected", {
        description: "You have rejected the booking request.",
      });
    }
  };

  // 🏷️ স্ট্যাটাস ওয়াইজ ব্যাজ জেনারেটর
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
      paid: (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
        >
          <CreditCard className="w-3 h-3" /> Paid
        </Badge>
      ),
    };
    return badges[status];
  };
  return (
    <Table>
      <TableHeader className="bg-slate-50/70 dark:bg-slate-700">
        <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-600">
          <TableHead className="w-62.5 font-semibold text-slate-700 dark:text-slate-300 py-4 pl-6">
            User Details
          </TableHead>
          <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
            Ticket Title
          </TableHead>
          <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-center">
            Quantity
          </TableHead>
          <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-right">
            Total Price
          </TableHead>
          <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-center">
            Status
          </TableHead>
          <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-right pr-6">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {bookingRequests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
              No booking requests available at the moment.
            </TableCell>
          </TableRow>
        ) : (
          bookingRequests.map((request) => {
            const isPending = request?.status === "pending";

            return (
              <TableRow
                key={request?._id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-600/50 transition-colors border-slate-100 dark:border-slate-600"
              >
                <TableCell className="py-4 pl-6 font-medium">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {request?.userName}
                      </p>
                      <p className="text-xs text-slate-400  font-mono select-all">
                        {request?.userEmail}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4 max-w-75">
                  <div className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <Ticket className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{request?.title}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                  <div className="inline-flex items-center gap-1 bg-slate-100/80 dark:bg-slate-600/50 px-2.5 py-1 rounded-md text-xs">
                    <Layers className="w-3 h-3 text-slate-500" />
                    {request?.quantity} Pcs
                  </div>
                </TableCell>

                <TableCell className="py-4 text-right font-extrabold text-slate-900 dark:text-slate-300">
                  <div className="space-y-0.5">
                    <p className="text-sm">
                      ৳ {request?.price.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-normal">
                      ৳ {request?.price} × {request?.quantity}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-center">
                  {getStatusBadge(request?.status)}
                </TableCell>

                <TableCell className="py-4 text-right pr-6">
                  {isPending ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAccept(request._id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-8 px-3 rounded-lg font-semibold text-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleReject(
                            request._id,
                            request?.quantity,
                            request?.ticketId,
                          )
                        }
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-3 rounded-lg font-semibold text-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </Button>
                    </div>
                  ) : (
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
  );
};

export default RequestedBookingTable;
