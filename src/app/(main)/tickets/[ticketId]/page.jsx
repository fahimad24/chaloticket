"use client";

import { useState, useEffect, use, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Layers,
  MapPin,
  ShieldCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
  Ticket,
  X,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  fetchTicketById,
  fetchUserBookedTickets,
  updateTicket,
} from "@/lib/api-action";
import { useUserInfo } from "@/lib/user-action";
import TicketDetailsSkeleton from "@/app/components/ui/TicketDetailsSkeleton";
import Link from "next/link";

function TicketDetailsContent({ params }) {
  const { ticketId } = use(params);
  const router = useRouter();

  const { session, isPanding } = useUserInfo();

  const [ticket, setTicket] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function loadTicketData() {
      try {
        const ticketData = await fetchTicketById(ticketId);
        setTicket(ticketData);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    }
    if (ticketId) {
      loadTicketData();
    }
  }, [ticketId]);

  const targetDepartureTime = ticket?.departureTime || ticket?.departure;

  useEffect(() => {
    if (!targetDepartureTime) return;

    const calculateTimeLeft = () => {
      const departureDate = new Date(targetDepartureTime);
      const currentDate = new Date();

      const difference = departureDate.getTime() - currentDate.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDepartureTime]);

  if (!ticket) {
    return <TicketDetailsSkeleton></TicketDetailsSkeleton>;
  }

  const isTimePassed = timeLeft.isExpired;
  const isSoldOut = ticket?.quantity === 0;
  const vendor = session?.role === "vendor";
  const admin = session?.role === "admin";
  const isBookNowDisabled =
    isTimePassed || isSoldOut || !session || isPanding || vendor || admin;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (bookingQty > ticket?.quantity || bookingQty <= 0) {
      alert("Booking quantity can't be greater than Ticket Quantity!");
      return;
    }

    const formData = new FormData(e.target);
    const quantity = formData.get("quantity");

    const bookedData = {
      ...ticket,
      ticketId,
      userId: session?.id,
      userName: session?.name,
      userEmail: session?.email,
      quantity: parseInt(quantity),
      status: "pending",
      bookedAt: new Date().toISOString(),
      price: ticket?.price * parseInt(quantity),
    };

    setIsSubmitting(true);
    try {
      const result = await fetchUserBookedTickets(bookedData, ticketId);
      const resultData = await updateTicket(ticketId, {
        quantity: ticket.quantity - parseInt(quantity),
      });

      if (result && result.bookedTicketId && resultData) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/user/my-bookings");
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 md:px-6 mt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#6367FF]">
            <Home /> Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/tickets" className="hover:text-[#6367FF]">
            Tickets
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#6367FF] truncate max-w-50">
            {ticket?.title}
          </span>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative h-64 md:h-96 w-full bg-slate-100">
                <Image
                  src={
                    ticket?.image ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
                  } // 👈 সেফ ফলব্যাক ইমেজ
                  alt={ticket?.title || "Ticket Details"}
                  fill
                  priority
                  className="object-cover"
                />
                {/* Tailwind v4-এ bg-linear-to-t বা পুরোনো ভার্সনে bg-gradient-to-t */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#6367FF] tracking-wider px-2.5 py-1 bg-indigo-50 rounded-md">
                    {ticket?.transportType} Fleet
                  </span>
                  <h1 className="text-xl md:text-3xl font-bold text-slate-800 tracking-tight mt-3">
                    {ticket?.title}
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        From
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {ticket?.from}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-200/60 pt-3 md:pt-0 md:pl-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        To
                      </p>
                      <p className="text-sm font-semibold text-slate-700">
                        {ticket?.to}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-slate-400" /> Amenities &
                    Perks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket?.perks && ticket.perks.length > 0 ? (
                      ticket.perks.map((perk, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-100 text-slate-600 font-medium px-3 py-1 rounded-xl border border-slate-200/40 shadow-sm"
                        >
                          ✨ {perk}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">
                        No extra perks specified.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WIDGET */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Ticket Price
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-slate-900">
                    <span className="text-base font-bold text-[#6367FF]">
                      ৳
                    </span>
                    {ticket?.price?.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">
                    Availability
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg mt-1 ${
                      isSoldOut
                        ? "bg-rose-50 text-rose-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {isSoldOut ? "Sold Out" : `${ticket?.quantity} Seats Left`}
                  </span>
                </div>
              </div>

              {/* COUNTDOWN */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#6367FF]" /> Time
                  Remaining
                </p>

                {isTimePassed ? (
                  <div className="w-full bg-rose-50 text-rose-600 p-3 rounded-2xl text-xs font-semibold border border-rose-100 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Departure schedule has already passed.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: "Days", val: timeLeft.days },
                      { label: "Hrs", val: timeLeft.hours },
                      { label: "Min", val: timeLeft.minutes },
                      { label: "Sec", val: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-2"
                      >
                        <p className="text-lg font-black text-slate-800 font-mono">
                          {String(item.val).padStart(2, "0")}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DATE & TIME BOX */}
              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">
                    Date:{" "}
                    {targetDepartureTime
                      ? new Date(targetDepartureTime).toLocaleDateString(
                          "en-US",
                          { dateStyle: "long" },
                        )
                      : "--"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">
                    Time:{" "}
                    {targetDepartureTime
                      ? new Date(targetDepartureTime).toLocaleTimeString(
                          "en-US",
                          { timeStyle: "short" },
                        )
                      : "--"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isBookNowDisabled}
                className="w-full h-12 rounded-2xl bg-[#6367FF] text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-100 hover:bg-[#5054E6] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                <Ticket className="w-4 h-4" />
                {isSoldOut
                  ? "Sold Out (0 Left)"
                  : isTimePassed
                    ? "Expired / Departed"
                    : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                Confirm Seat Booking
              </h2>
              <p className="text-xs text-slate-400">
                Specify your seat allocation count.
              </p>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-700 text-base">
                  Booking Success!
                </h3>
                <p className="text-xs text-slate-400">
                  Redirecting to dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={
                        ticket?.image ||
                        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
                      }
                      alt="Route"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">
                      {ticket?.title}
                    </p>
                    <p className="text-[11px] text-[#6367FF] font-semibold mt-0.5">
                      ৳ {ticket?.price?.toLocaleString()} / Unit
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label
                      htmlFor="quantity"
                      className="font-bold text-slate-600"
                    >
                      Desired Quantity
                    </label>
                    <span className="text-slate-400">
                      Max limit: <b>{ticket?.quantity} seats</b>
                    </span>
                  </div>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min="1"
                    max={ticket?.quantity}
                    value={bookingQty}
                    onChange={(e) =>
                      setBookingQty(
                        Math.min(
                          ticket?.quantity,
                          Math.max(1, parseInt(e.target.value) || 0),
                        ),
                      )
                    }
                    required
                    className="w-full h-11 px-3.5 bg-slate-50/50 border border-slate-200 focus:border-[#6367FF] rounded-xl font-semibold text-sm outline-none"
                  />

                  <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/30 flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-500 font-medium">
                      Subtotal Estimate:
                    </span>
                    <span className="font-extrabold text-[#6367FF] text-sm">
                      ৳ {(ticket?.price * bookingQty).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    bookingQty <= 0 ||
                    bookingQty > ticket?.quantity
                  }
                  className="w-full h-11 bg-[#6367FF] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#5054E6] disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? "Processing..." : "Confirm & Request Booking"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ৫. মেইন এক্সপোর্ট (Suspense Wrapper এর সাথে) ───
export default function TicketDetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="text-center h-400 flex items-center justify-center text-slate-500">
          <p>Loading ticket view...</p>
        </div>
      }
    >
      <TicketDetailsContent params={params} />
    </Suspense>
  );
}
