"use client";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TicketCountdown } from "../TimeCountdown";
import { GetStatusBadge } from "./GetStatusBadge";
import { useUserInfo } from "@/lib/user-action";

const MyBookingCard = ({ ticket, isDeparturePassed, canPay }) => {
  const { session } = useUserInfo();
  const handlePayment = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === id ? { ...booking, status: "paid" } : booking,
      ),
    );
  };

  const formatDepartureDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div>
      <Card className="group rounded-2xl overflow-hidden border-slate-100 dark:border-slate-600 dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between pt-0">
        {/* TICKET CARD TOP / IMAGE */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <Image
            src={ticket?.image}
            alt={ticket?.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 z-10">
            <GetStatusBadge status={ticket?.status} />
          </div>
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-mono">
            ID: {ticket?._id}
          </div>
        </div>

        <CardContent className="p-5 space-y-4 grow">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-300 text-base line-clamp-1 group-hover:text-[#6367FF] transition-colors">
              {ticket?.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-600 p-2.5 rounded-xl border border-slate-100 dark:border-slate-500">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="truncate">{ticket?.from}</span>
            <span className="text-slate-400  mx-1">→</span>
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="truncate">{ticket?.to}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 border-b border-dashed border-slate-100 pb-3 text-sm">
            <div className="text-slate-500 space-y-0.5">
              <span>Quantity</span>
              <p className="font-bold text-slate-800 dark:text-slate-300 text-base flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-slate-400" />{" "}
                {ticket?.quantity} Pcs
              </p>
            </div>
            <div className="text-slate-500 space-y-0.5 text-right">
              <span>Total Amount</span>
              <p className="font-extrabold text-[#6367FF] text-base flex items-center justify-end">
                ৳ {ticket?.price}
              </p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-medium text-slate-700 dark:text-slate-300">
                  Departure Schedule
                </span>
                <span>{formatDepartureDate(ticket?.departureTime)}</span>
              </div>
            </div>
            <TicketCountdown
              departureTime={ticket?.departureTime}
              status={ticket?.status}
            />
          </div>
        </CardContent>

        <CardFooter className="px-5 py-3 flex flex-col gap-3">
          {canPay && (
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <input type="hidden" name="ticketId" value={ticket?._id} />
                <input type="hidden" name="email" value={session?.email} />
                <Button
                  type="submit"
                  role="link"
                  className="w-full bg-[#6367FF] hover:bg-[#8494FF] text-white rounded-xl py-5 font-semibold shadow-md shadow-[#6367FF]/20 flex items-center justify-center gap-2 transition-all"
                >
                  <CreditCard className="w-4 h-4" /> Pay Now (Stripe)
                </Button>
              </section>
            </form>
          )}

          {ticket?.status === "accepted" && isDeparturePassed && (
            <div className="w-full bg-slate-100 text-slate-400 text-xs font-medium text-center p-3 rounded-xl border border-slate-200 dark:bg-slate-600 dark:text-slate-300 dark:border-slate-500 flex items-center justify-center gap-1.5 cursor-not-allowed">
              <AlertCircle className="w-4 h-4 text-slate-400" /> Payment Expired
              (Time Passed)
            </div>
          )}

          {ticket?.status === "pending" && (
            <div className="w-full bg-amber-50 text-amber-600 text-xs font-semibold text-center p-3 rounded-xl border border-amber-100/60 dark:bg-amber-600 dark:text-amber-300 dark:border-amber-500 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4 animate-spin" /> Waiting for Vendor
              Approval
            </div>
          )}

          {ticket?.status === "paid" && (
            <div className="w-full bg-emerald-50 text-emerald-600 text-xs font-bold text-center p-3 rounded-xl border border-emerald-100 dark:bg-emerald-600 dark:text-emerald-300 dark:border-emerald-500 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Ticket Secured & Paid
            </div>
          )}

          {ticket?.status === "rejected" && (
            <div className="w-full bg-rose-50 text-rose-600 text-xs font-medium text-center p-3 rounded-xl border border-rose-100 dark:bg-rose-600 dark:text-rose-300 dark:border-rose-500 flex items-center justify-center gap-1.5">
              <XCircle className="w-4 h-4" /> Booking Cancelled by Vendor
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyBookingCard;
