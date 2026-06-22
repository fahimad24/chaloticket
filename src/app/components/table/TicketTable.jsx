"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  X,
  Ticket,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { updateTicket } from "@/lib/api-action";

const TicketTable = ({ allTickets }) => {
  const [tickets, setTickets] = useState(allTickets);

  // APPROVE BUTTON HANDLER
  const handleApprove = async (id, title) => {
    const result = await updateTicket(id, { verificationStatus: "approved" });
    if (result) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id
            ? { ...ticket, verificationStatus: "approved" }
            : ticket,
        ),
      );
      toast.success("Ticket route approved successfully!", {
        description: `"${title}" is now live on the platform for users.`,
      });
    } else {
      toast.error("Failed to approve the ticket. Please try again.");
    }
  };

  // REJECT BUTTON HANDLER
  const handleReject = async (id) => {
    const result = await updateTicket(id, { verificationStatus: "rejected" });
    if (!result) {
      toast.error("Failed to reject the ticket. Please try again.");
      return;
    }
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === id
          ? { ...ticket, verificationStatus: "rejected" }
          : ticket,
      ),
    );
    toast.error("Ticket route verification rejected", {
      description: "The vendor will see this route locked as rejected.",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200 gap-1",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200 gap-1",
      rejected: "bg-rose-50 text-rose-700 border-rose-200 gap-1",
    };

    const icons = {
      pending: <Clock className="w-3 h-3 animate-spin text-amber-500" />,
      approved: <CheckCircle2 className="w-3 h-3 text-emerald-500" />,
      rejected: <XCircle className="w-3 h-3 text-rose-500" />,
    };

    return (
      <Badge
        variant="outline"
        className={`capitalize px-2.5 py-1 rounded-md font-semibold text-xs ${styles[status]}`}
      >
        {icons[status]} {status}
      </Badge>
    );
  };
  return (
    <Table>
      <TableHeader className="bg-slate-50/70">
        <TableRow className="hover:bg-transparent border-slate-100">
          <TableHead className="w-70 font-semibold text-slate-700 py-4 pl-6">
            Ticket Route Details
          </TableHead>
          <TableHead className="w-55 font-semibold text-slate-700 py-4">
            Vendor Info
          </TableHead>
          <TableHead className="font-semibold text-slate-700 py-4">
            Destination
          </TableHead>
          <TableHead className="font-semibold text-slate-700 py-4 text-right">
            Pricing & Seats
          </TableHead>
          <TableHead className="font-semibold text-slate-700 py-4 text-center">
            Verification Status
          </TableHead>
          <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">
            Moderation Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tickets.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-12 text-slate-400 font-medium"
            >
              No ticket logs found in the moderation queue.
            </TableCell>
          </TableRow>
        ) : (
          tickets.map((ticket) => {
            const isPending = ticket.verificationStatus === "pending";

            return (
              <TableRow
                key={ticket._id}
                className="hover:bg-slate-50/40 transition-colors border-slate-100"
              >
                {/* ১. TICKET TITLE & ID */}
                <TableCell className="py-4 pl-6 font-medium">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-indigo-50 text-[#6367FF] rounded-lg shrink-0 mt-0.5">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">
                        {ticket.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        REF: {ticket.id}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* ২. VENDOR NAME & EMAIL */}
                <TableCell className="py-4">
                  <div className="flex items-start gap-2 text-xs">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 truncate">
                      <p className="font-semibold text-slate-700">
                        {ticket.vendorName}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono truncate select-all">
                        {ticket.vendorEmail}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* ৩. FROM & TO GEOLOCATION */}
                <TableCell className="py-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>{ticket.from}</span>
                    <span className="text-slate-300 font-normal">→</span>
                    <span>{ticket.to}</span>
                  </div>
                </TableCell>

                {/* ৪. PRICING & SEATS QUANTITY */}
                <TableCell className="py-4 text-right">
                  <div className="text-xs space-y-0.5">
                    <p className="font-extrabold text-slate-800">
                      ৳ {ticket.price.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {ticket.quantity} Tickets Left
                    </p>
                  </div>
                </TableCell>

                {/* ৫. VERIFICATION STATUS */}
                <TableCell className="py-4 text-center">
                  {getStatusBadge(ticket.verificationStatus)}
                </TableCell>

                {/* ৬. MODERATION BUTTONS (APPROVE / REJECT) */}
                <TableCell className="py-4 text-right pr-6">
                  {isPending ? (
                    <div className="flex items-center justify-end gap-2">
                      {/* APPROVE BUTTON */}
                      <Button
                        size="sm"
                        onClick={() => handleApprove(ticket._id, ticket.title)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-8 px-2.5 rounded-xl font-bold text-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </Button>

                      {/* REJECT BUTTON */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(ticket._id)}
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-2.5 rounded-xl font-bold text-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </Button>
                    </div>
                  ) : (
                    // অলরেডি ডিসাইড হয়ে গেলে অ্যাকশন লক মেসেজ শো করবে
                    <div className="text-xs text-slate-400 font-semibold pr-2 flex items-center justify-end gap-1 select-none">
                      <ShieldAlert className="w-3.5 h-3.5 text-slate-300" />{" "}
                      Moderated
                    </div>
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

export default TicketTable;
