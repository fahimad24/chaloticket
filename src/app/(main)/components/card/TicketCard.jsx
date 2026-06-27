"use client";

import Image from "next/image";
import Link from "next/link";
import { Bus, Train, Plane, Layers, Ticket, ArrowRight } from "lucide-react";

export default function TicketCard({ ticket, isAdvertised }) {
  const ticketId = ticket?._id || ticket?.id;
  const getTransportMeta = (type) => {
    const lowerType = type?.toLowerCase();
    switch (lowerType) {
      case "bus":
        return {
          icon: <Bus className="w-3.5 h-3.5" />,
          className: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "train":
        return {
          icon: <Train className="w-3.5 h-3.5" />,
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "air":
      case "flight":
        return {
          icon: <Plane className="w-3.5 h-3.5" />,
          className: "bg-purple-50 text-purple-700 border-purple-200",
        };
      default:
        return {
          icon: <Ticket className="w-3.5 h-3.5" />,
          className: "bg-slate-50 text-slate-700 border-slate-200",
        };
    }
  };

  const transportMeta = getTransportMeta(ticket?.transportType);

  return (
    <div
      className={`group relative rounded-2xl border bg-accent overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isAdvertised
          ? "border-indigo-100 dark:border-indigo-500 shadow-sm ring-1 ring-indigo-50/50"
          : "border-slate-100 dark:border-slate-500 shadow-sm"
      }`}
    >
      {isAdvertised && (
        <span className="absolute top-3 left-3 z-20 bg-linear-to-r from-[#6367FF] to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
          Featured Ad
        </span>
      )}

      <div className="relative h-48 w-full bg-slate-50 overflow-hidden">
        <Image
          src={
            ticket?.image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
          }
          alt={ticket?.title || "Ticket Image"}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          priority={isAdvertised}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full border capitalize ${transportMeta.className}`}
          >
            {transportMeta.icon}
            {ticket?.transportType || "Bus"}
          </span>

          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            {ticket?.quantity || 0} Seats Left
          </span>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-base md:text-lg line-clamp-1 group-hover:text-[#6367FF] transition-colors duration-200">
            {ticket?.title || "Untitled Route"}
          </h3>
        </div>

        {ticket?.perks && ticket.perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 min-h-6">
            {ticket.perks.map((perk, index) => (
              <span
                key={index}
                className="text-[10px] bg-white text-purple-500 font-semibold px-2 py-0.5 rounded border border-emerald-100/50"
              >
                {perk}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-dashed border-slate-100 pt-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Per Unit Price
            </p>
            <p className="font-extrabold text-slate-900 text-lg md:text-xl flex items-baseline gap-0.5">
              <span className="text-sm font-semibold text-[#6367FF]">৳</span>
              {Number(ticket?.price || 0).toLocaleString()}
            </p>
          </div>

          <Link
            href={`/tickets/${ticketId}`}
            className="inline-flex items-center justify-center gap-1.5 bg-[#6367FF] hover:bg-[#5054E6] text-white font-semibold text-xs px-4 h-10 rounded-xl transition-all duration-200 shadow-sm shadow-indigo-100 active:scale-98"
          >
            See Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
