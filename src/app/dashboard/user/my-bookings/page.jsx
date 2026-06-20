"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Ticket,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CreditCard,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ─── ১. ডেমো বুকিং ডাটা (আপনার রিকোয়ারমেন্টের সব স্টেট কভার করে) ───
const INITIAL_BOOKINGS = [
  {
    id: "B-101",
    title: "Dhaka to Cox's Bazar Premium AC Bus",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    from: "Dhaka",
    to: "Cox's Bazar",
    quantity: 2,
    unitPrice: 1200,
    departureTime: "2026-07-15T22:00:00", // Future date
    status: "pending", // pending | accepted | rejected | paid
  },
  {
    id: "B-102",
    title: "Ena Transport - Sylhet Non-AC Cruise",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600&auto=format&fit=crop",
    from: "Dhaka",
    to: "Sylhet",
    quantity: 3,
    unitPrice: 700,
    departureTime: "2026-06-25T08:30:00", // Future date
    status: "accepted", // Vendor accepted -> Pay Now button should appear
  },
  {
    id: "B-103",
    title: "Green Line Scania - Rajshahi Sleeper",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop",
    from: "Dhaka",
    to: "Rajshahi",
    quantity: 1,
    unitPrice: 1500,
    departureTime: "2026-05-10T14:00:00", // Passed date
    status: "accepted", // Accepted but expired -> Cannot pay
  },
  {
    id: "B-104",
    title: "Saintmartin Travel - Direct Ship Ticket",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop",
    from: "Chittagong",
    to: "Saintmartin",
    quantity: 4,
    unitPrice: 2500,
    departureTime: "2026-08-01T06:00:00",
    status: "paid", // Already purchased
  },
  {
    id: "B-105",
    title: "Hanif Enterprise - Khulna Express",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600&auto=format&fit=crop",
    from: "Dhaka",
    to: "Khulna",
    quantity: 2,
    unitPrice: 850,
    departureTime: "2026-07-02T11:45:00",
    status: "rejected", // Vendor rejected -> Countdown will be removed
  },
];

// ─── ২. লাইভ কাউন্টডাউন কম্পোনেন্ট ───
function TicketCountdown({ departureTime, status }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // যদি রিজেক্টেড হয়, টাইমার রেন্ডারই হবে না (Requirement Rule)
    if (status === "rejected") return;

    const calculateTime = () => {
      const difference = +new Date(departureTime) - +new Date();

      if (difference <= 0) {
        setTimeLeft("Departure Passed");
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [departureTime, status]);

  if (status === "rejected") return null;

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-semibold mt-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 w-full justify-center
      ${isExpired ? "text-rose-500 bg-rose-50" : "text-[#6367FF] bg-[#6367FF]/5"}`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>{timeLeft}</span>
    </div>
  );
}

// ─── ৩. মেইন পেজ কম্পোনেন্ট ───
export default function MyBookedTickets() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ডেমো লোডিং এফেক্ট
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 💳 স্ট্রাইপ গেটওয়ে সিমুলেশন (পেমেন্ট সাকসেস হ্যান্ডলার)
  const handlePayment = (id) => {
    alert("Redirecting to Stripe payment gateway...");

    // পেমেন্ট সফল হলে স্ট্যাটাস 'paid' হবে (এবং কোয়ান্টিটি ডাটাবেজে কমবে)
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "paid" } : booking,
      ),
    );
  };

  // স্ট্যাটাস ব্যাজ ডাইনামিক স্টাইলিং
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
      accepted: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
      rejected: "bg-rose-100 text-rose-700 hover:bg-rose-100",
      paid: "bg-[#FFDBFD] text-[#6367FF] border border-[#6367FF]/20 hover:bg-[#FFDBFD]",
    };
    return (
      <Badge
        className={`capitalize px-3 py-1 rounded-full font-medium ${styles[status]}`}
      >
        {status}
      </Badge>
    );
  };

  // ডেট ফরম্যাটার
  const formatDepartureDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Ticket className="w-7 h-7 text-[#6367FF]" /> My Booked Tickets
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage, track count-downs, and make secure payments for your booked
          trips.
        </p>
      </div>

      {/* SKELETON LOADER */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="rounded-2xl overflow-hidden border-slate-100"
            >
              <Skeleton className="h-44 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // ─── ৩-কলাম গ্রিড লেআউট (3 Column Grid Layout) ───
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((ticket) => {
            const totalPrice = ticket.unitPrice * ticket.quantity;
            const isDeparturePassed =
              new Date(ticket.departureTime) < new Date();
            const canPay = ticket.status === "accepted" && !isDeparturePassed;

            return (
              <Card
                key={ticket.id}
                className="group rounded-2xl overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between"
              >
                {/* TICKET CARD TOP / IMAGE */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    fill
                    priority
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    {getStatusBadge(ticket.status)}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-mono">
                    ID: {ticket.id}
                  </div>
                </div>

                {/* TICKET DETAILS CONTAINER */}
                <CardContent className="p-5 space-y-4 grow">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-[#6367FF] transition-colors">
                      {ticket.title}
                    </h3>
                  </div>

                  {/* ROUTE INFORMATION */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="truncate">{ticket.from}</span>
                    <span className="text-slate-400 mx-1">→</span>
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">{ticket.to}</span>
                  </div>

                  {/* QUANTITY & PRICING */}
                  <div className="grid grid-cols-2 gap-2 border-b border-dashed border-slate-100 pb-3 text-sm">
                    <div className="text-slate-500 space-y-0.5">
                      <span>Quantity</span>
                      <p className="font-bold text-slate-800 text-base flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {ticket.quantity} Pcs
                      </p>
                    </div>
                    <div className="text-slate-500 space-y-0.5 text-right">
                      <span>Total Amount</span>
                      <p className="font-extrabold text-[#6367FF] text-base flex items-center justify-end">
                        ৳ {totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* DEPARTURE TIME */}
                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium text-slate-700">
                        Departure Schedule
                      </span>
                      <span>{formatDepartureDate(ticket.departureTime)}</span>
                    </div>
                  </div>
                </CardContent>

                {/* COUNTDOWN & ACTIONS FOOTER */}
                <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                  {/* কন্ডিশনাল লাইভ কাউন্টডাউন */}
                  <TicketCountdown
                    departureTime={ticket.departureTime}
                    status={ticket.status}
                  />

                  {/* ─── কন্ডিশনাল অ্যাকশন বাটনসমূহ ─── */}

                  {/* ১. ভেন্ডর অ্যাকসেপ্ট করেছে এবং সময় এখনো পার হয়নি -> Stripe Pay Now */}
                  {canPay && (
                    <Button
                      onClick={() => handlePayment(ticket.id)}
                      className="w-full bg-[#6367FF] hover:bg-[#8494FF] text-white rounded-xl py-5 font-semibold shadow-md shadow-[#6367FF]/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <CreditCard className="w-4 h-4" /> Pay Now (Stripe)
                    </Button>
                  )}

                  {/* ২. ভেন্ডর অ্যাকসেপ্ট করেছে কিন্তু ডিপার্চার সময় পার হয়ে গেছে -> পেমেন্ট লক */}
                  {ticket.status === "accepted" && isDeparturePassed && (
                    <div className="w-full bg-slate-100 text-slate-400 text-xs font-medium text-center p-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-not-allowed">
                      <AlertCircle className="w-4 h-4 text-slate-400" /> Payment
                      Expired (Time Passed)
                    </div>
                  )}

                  {/* ৩. ইনিশিয়ালি পেন্ডিং স্টেট */}
                  {ticket.status === "pending" && (
                    <div className="w-full bg-amber-50 text-amber-600 text-xs font-semibold text-center p-3 rounded-xl border border-amber-100/60 flex items-center justify-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" /> Waiting for
                      Vendor Approval
                    </div>
                  )}

                  {/* ৪. পেমেন্ট কমপ্লিট সাকসেস স্টেট */}
                  {ticket.status === "paid" && (
                    <div className="w-full bg-emerald-50 text-emerald-600 text-xs font-bold text-center p-3 rounded-xl border border-emerald-100 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Ticket Secured & Paid
                    </div>
                  )}

                  {/* ৫. রিজেক্টেড স্টেট */}
                  {ticket.status === "rejected" && (
                    <div className="w-full bg-rose-50 text-rose-600 text-xs font-medium text-center p-3 rounded-xl border border-rose-100 flex items-center justify-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Booking Cancelled by
                      Vendor
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
