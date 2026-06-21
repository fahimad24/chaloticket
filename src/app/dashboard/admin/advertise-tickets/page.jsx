"use client";

import { useState } from "react";
import {
  Megaphone,
  Ticket,
  MapPin,
  Layers,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

// ─── ১. ইমেজ সহ ডেমো টিকিট ডাটা (Unsplash ট্রান্সপোর্ট ইমেজ ব্যবহার করা হয়েছে) ───
const APPROVED_TICKETS = [
  {
    id: "TK-9901",
    title: "Green Line - Scania Double Decker",
    from: "Dhaka",
    to: "Cox's Bazar",
    price: 2500,
    isAdvertised: true,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9907",
    title: "Green Line - Scania Double Decker",
    from: "Dhaka",
    to: "Cox's Bazar",
    price: 2500,
    isAdvertised: true,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9902",
    title: "Hanif Enterprise - Volvo AC Multi-Axle",
    from: "Dhaka",
    to: "Dinajpur",
    price: 1200,
    isAdvertised: true,
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9903",
    title: "Saintmartin Travels - Luxury Sleeper Coach",
    from: "Dhaka",
    to: "Teknaf",
    price: 1800,
    isAdvertised: true,
    image:
      "https://images.unsplash.com/photo-1626125345510-4603468eedfb?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9904",
    title: "Ena Transport - Hyundai AC Comfort",
    from: "Dhaka",
    to: "Sylhet",
    price: 900,
    isAdvertised: false,
    image:
      "https://images.unsplash.com/photo-1562620644-66548e173eaf?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9905",
    title: "Shohag Deluxe - Scania Multi-Axle",
    from: "Dhaka",
    to: "Chittagong",
    price: 1300,
    isAdvertised: false,
    image:
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "TK-9906",
    title: "Desh Travels - Man Comfort Line",
    from: "Dhaka",
    to: "Rajshahi",
    price: 1000,
    isAdvertised: false,
    image:
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=150&auto=format&fit=crop",
  },
];

export default function AdvertiseTickets() {
  const [tickets, setTickets] = useState(APPROVED_TICKETS);

  // বিজ্ঞাপন কাউন্টার
  const currentAdvertisedCount = tickets.filter((t) => t.isAdvertised).length;

  // TOGGLE HANDLER (ম্যাক্সিমাম ৬টি লিমিটেশন)
  const handleToggleAdvertise = (id, currentStatus, title) => {
    if (!currentStatus && currentAdvertisedCount >= 6) {
      toast.error("Advertisement Limit Exceeded!", {
        description:
          "You can only feature a maximum of 6 tickets simultaneously on the homepage.",
        icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      });
      return;
    }

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === id) {
          const nextStatus = !ticket.isAdvertised;
          if (nextStatus) {
            toast.success("Ticket Featured", {
              description: `"${title}" is now live on the homepage.`,
            });
          } else {
            toast.info("Advertisement Removed", {
              description: `"${title}" removed from homepage.`,
            });
          }
          return { ...ticket, isAdvertised: nextStatus };
        }
        return ticket;
      }),
    );
  };

  // 🖼️ বাম পাশের রিয়েল টিকিট/বাস ইমেজ রেন্ডারার
  const renderTicketImage = (imageUrl, title, isAdvertised) => {
    return (
      <div className="relative shrink-0 select-none w-12 h-12 rounded-xl border border-slate-100">
        {imageUrl ? (
          <Image
            fill
            priority
            src={imageUrl}
            alt={title}
            className={`w-12 h-12 rounded-xl object-cover border border-slate-100 transition-all duration-300
              ${
                isAdvertised
                  ? "ring-2 ring-amber-500 ring-offset-2 scale-95 shadow-md shadow-amber-500/20"
                  : "opacity-90"
              }`}
          />
        ) : (
          // যদি কোনো ইমেজের ইউআরএল না থাকে তবে ব্যাকআপ আইকন দেখাবে
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
            <ImageIcon className="w-5 h-5" />
          </div>
        )}

        {/* অ্যাডভার্টাইজড হলে ইমেজের উপর ছোট একটা জ্বলজ্বলে স্টার ব্যাজ */}
        {isAdvertised && (
          <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow-sm border border-white animate-bounce">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER & COUNTER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-[#6367FF]" /> Advertise Tickets
          </h1>
          <p className="text-sm text-slate-500">
            Manage your campaign display slots. Enable the switch to push any
            verified ticket to the main portal.
          </p>
        </div>

        {/* SLOT COUNTER */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl min-w-50 self-start lg:self-center">
          <div className="p-2 bg-indigo-50 text-[#6367FF] rounded-lg">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Campaign Slots
            </p>
            <p className="text-sm font-extrabold text-slate-700">
              <span
                className={
                  currentAdvertisedCount >= 6
                    ? "text-rose-600 font-black"
                    : "text-[#6367FF]"
                }
              >
                {currentAdvertisedCount}
              </span>
              <span className="text-slate-400 font-normal"> / 6 Active</span>
            </p>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* LAYOUT A: DESKTOP & TABLET VIEW (md: এবং তার বড় স্ক্রিনের জন্য টেবিল লেআউট) */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="font-semibold text-slate-700 py-4 pl-6">
                Ticket Banner & Route
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4">
                Destination
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4">
                Ticket Price
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-center">
                Live Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">
                Push to Homepage
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className={`hover:bg-slate-50/40 transition-colors border-slate-100 ${ticket.isAdvertised ? "bg-amber-50/10" : ""}`}
              >
                {/* 🖼️ LEFT SIDE IMAGE & ROUTE DETAILS */}
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3.5">
                    {renderTicketImage(
                      ticket.image,
                      ticket.title,
                      ticket.isAdvertised,
                    )}
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">
                        {ticket.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        ID: {ticket.id}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* ২. GEOLOCATION */}
                <TableCell className="py-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{ticket.from}</span>
                    <span className="text-slate-300 font-normal">→</span>
                    <span>{ticket.to}</span>
                  </div>
                </TableCell>

                {/* ৩. PRICING */}
                <TableCell className="py-4 font-extrabold text-sm text-slate-800">
                  ৳ {ticket.price.toLocaleString()}
                </TableCell>

                {/* ৪. STATUS BADGE */}
                <TableCell className="py-4 text-center">
                  {ticket.isAdvertised ? (
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 shadow-none hover:bg-amber-50 font-bold text-xs">
                      ⚡ On Air
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-slate-50 text-slate-400 border-slate-200 font-medium text-xs"
                    >
                      Standby
                    </Badge>
                  )}
                </TableCell>

                {/* ৫. ADVERTISE TOGGLE SWITCH */}
                <TableCell className="py-4 text-right pr-6">
                  <div className="inline-flex items-center justify-end h-8">
                    <Switch
                      checked={ticket.isAdvertised}
                      onCheckedChange={() =>
                        handleToggleAdvertise(
                          ticket.id,
                          ticket.isAdvertised,
                          ticket.title,
                        )
                      }
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* LAYOUT B: MOBILE CARD LAYOUT (মোবাইল স্ক্রিনের জন্য রেস্পনসিভ কার্ড) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="block md:hidden space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className={`rounded-xl border-slate-100 shadow-sm overflow-hidden transition-all duration-200 ${ticket.isAdvertised ? "bg-amber-50/30 border-amber-200/60 ring-1 ring-amber-100" : "bg-white"}`}
          >
            <CardContent className="p-4 space-y-4">
              {/* মোবাইল প্রোফাইল হেডার (বাম পাশে ইমেজ) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3.5 max-w-[75%]">
                  {renderTicketImage(
                    ticket.image,
                    ticket.title,
                    ticket.isAdvertised,
                  )}
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {ticket.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      ID: {ticket.id}
                    </p>
                  </div>
                </div>
                <div>
                  {ticket.isAdvertised ? (
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-100 text-[10px] py-0.5">
                      Featured
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-slate-400 text-[10px] py-0.5"
                    >
                      Off
                    </Badge>
                  )}
                </div>
              </div>

              {/* ডেস্টিনেশন ও প্রাইসিং */}
              <div className="flex items-center justify-between bg-slate-50/60 p-2.5 rounded-lg border border-slate-100 text-xs">
                <div className="flex items-center gap-1 font-semibold text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{ticket.from}</span>
                  <span className="text-slate-300 font-normal">→</span>
                  <span>{ticket.to}</span>
                </div>
                <p className="font-extrabold text-slate-800">
                  ৳ {ticket.price}
                </p>
              </div>

              {/* মোবাইল সুইচ প্যানেল */}
              <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Show in Homepage Banner:
                </span>
                <Switch
                  checked={ticket.isAdvertised}
                  onCheckedChange={() =>
                    handleToggleAdvertise(
                      ticket.id,
                      ticket.isAdvertised,
                      ticket.title,
                    )
                  }
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
