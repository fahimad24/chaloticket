"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Layers,
  ArrowRight,
  Sparkles,
  Bus,
  Train,
  Plane,
  ArrowUpDown,
} from "lucide-react";
import { fetchAllTicketsSearch } from "@/lib/api-action";
import SearchBar from "@/app/components/SearchBar";
import TicketsSkeleton from "@/app/components/skeleton/TicketsSkeleton";

function TicketsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState([]);

  const currentSort = searchParams.get("sort") || "default";

  useEffect(() => {
    const transportType =
      searchParams.get("transportType")?.toLowerCase() || "";
    const from = searchParams.get("from")?.toLowerCase() || "";
    const to = searchParams.get("to")?.toLowerCase() || "";
    const sort = searchParams.get("sort") || "";

    const loadTickets = async () => {
      const data = await fetchAllTicketsSearch(from, to, transportType, sort);
      setTickets(data);
    };

    console.log("Fetching tickets with params:", {
      transportType,
      from,
      to,
      sort,
    });

    loadTickets();
  }, [searchParams]);

  const handleSearch = (formData) => {
    const transportType = formData.get("transportType")?.toLowerCase();
    const from = formData.get("from")?.toLowerCase();
    const to = formData.get("to")?.toLowerCase();
    const date = formData.get("date");

    const params = new URLSearchParams(searchParams.toString());

    if (transportType === "all") {
      params.set("transportType", transportType);
      params.delete("from");
      params.delete("to");
      params.delete("date");
      return router.push(`?${params.toString()}`);
    }

    if (transportType) params.set("transportType", transportType);
    else params.delete("transportType");
    if (from) params.set("from", from);
    else params.delete("from");
    if (to) params.set("to", to);
    else params.delete("to");
    if (date) params.set("date", date);
    else params.delete("date");

    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value !== "default") {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <Bus className="w-3.5 h-3.5" />;
      case "train":
        return <Train className="w-3.5 h-3.5" />;
      case "plane":
        return <Plane className="w-3.5 h-3.5" />;
      default:
        return <Bus className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-8 text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-200 sm:text-5xl">
            All Available <span className="text-[#6367FF]">Tickets</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 max-w-md mx-auto">
            Search destinations, filter transport modes, and sort prices
            dynamically.
          </p>
        </div>

        <SearchBar searchParams={searchParams} handleSearch={handleSearch} />
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-300">
            Showing <span className="text-[#6367FF]">{tickets.length}</span>{" "}
            verified results
          </p>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 px-4 py-2 rounded-xl w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-[#8494FF]" />
            <select
              value={currentSort}
              onChange={handleSortChange}
              className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="default">Sort by: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <Card
              key={ticket._id?.$oid || ticket._id?.toString() || index}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-300 bg-white border hover:-translate-y-1 hover:shadow-xl ${
                ticket.isAdvertised
                  ? "border-[#C9BEFF] shadow-sm ring-4 ring-[#ffdbfd]/30"
                  : "border-slate-100 dark:border-slate-500 shadow-sm"
              }`}
            >
              {ticket.isAdvertised && (
                <div className="absolute top-3 left-3 z-20 bg-linear-to-r from-[#6367FF] to-[#8494FF] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured Ad</span>
                </div>
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
                  priority={ticket.isAdvertised}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent" />
              </div>

              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border capitalize bg-[#ffdbfd]/40 text-[#6367FF] border-[#C9BEFF]/40">
                    {getTransportIcon(ticket?.transportType)}
                    {ticket?.transportType || "Bus"}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    {ticket?.quantity || 0} Seats Left
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base md:text-lg line-clamp-1 group-hover:text-[#6367FF] transition-colors duration-200">
                    {ticket?.title || "Untitled Route"}
                  </h3>
                </div>

                {ticket?.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 min-h-6">
                    {ticket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="text-[10px] bg-white text-[#8494FF] font-bold px-2 py-0.5 rounded-md border border-[#C9BEFF]/30 shadow-[0_2px_4px_rgba(99,103,255,0.02)]"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-dashed border-slate-100 pt-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Per Unit Price
                    </p>
                    <p className="font-extrabold text-slate-950 text-lg md:text-xl flex items-baseline gap-0.5">
                      <span className="text-sm font-semibold text-[#6367FF]">
                        ৳
                      </span>
                      {Number(ticket?.price || 0).toLocaleString()}
                    </p>
                  </div>

                  <Link
                    href={`/tickets/${ticket._id?.$oid || ticket._id}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#6367FF] hover:bg-[#5054E6] text-white font-bold text-xs px-4 h-10 rounded-xl transition-all duration-200 shadow-sm active:scale-95"
                  >
                    <span>See Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function AllTicketsPage() {
  return (
    <Suspense fallback={<TicketsSkeleton />}>
      <TicketsContent />
    </Suspense>
  );
}
