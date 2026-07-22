"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bus,
  Train,
  Plane,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchAllTicketsSearch } from "@/lib/api-action";
import SearchBar from "@/app/components/SearchBar";
import TicketsSkeleton from "@/app/components/skeleton/TicketsSkeleton";
import TicketCard from "../components/card/TicketCard";
import TicketCardSkeleton from "@/app/components/skeleton/TicketCardSkeleton";
const ITEMS_PER_PAGE = 6;

function TicketsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentSort = searchParams.get("sort") || "default";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const transportType =
      searchParams.get("transportType")?.toLowerCase() || "";
    const from = searchParams.get("from")?.toLowerCase() || "";
    const to = searchParams.get("to")?.toLowerCase() || "";
    const sort = searchParams.get("sort") || "";

    const loadTickets = async () => {
      setIsLoading(true);
      const data = await fetchAllTicketsSearch(from, to, transportType, sort);
      setTickets(data);
      setIsLoading(false);
    };

    loadTickets();
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (formData) => {
    const transportType = formData.get("transportType")?.toLowerCase();
    const from = formData.get("from")?.toLowerCase();
    const to = formData.get("to")?.toLowerCase();
    const date = formData.get("date");

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    // if (transportType === "all") {
    //   formData.delete("transportType");
    //   formData.delete("from");
    //   formData.delete("to");
    //   formData.delete("date");
    //   return router.push(`/tickets`, { scroll: false });
    // }

    if (transportType) params.set("transportType", transportType);
    else params.delete("transportType");
    if (from) params.set("from", from);
    else params.delete("from");
    if (to) params.set("to", to);
    else params.delete("to");
    if (date) params.set("date", date);
    else params.delete("date");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleOnChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    console.log(
      "handleOnChange called with event:",
      e.target.name,
      e.target.value,
    );
    const transportType = e.target.value;
    if (transportType === "all") {
      return router.push(`/tickets`, { scroll: false });
    }

    if (e.target.value) {
      params.set(e.target.name, e.target.value);
    } else {
      params.delete(e.target.name);
    }
    router.push(`?${params.toString()}`, { scroll: false }); // Remove focus from the input after change
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("transportType");
    params.delete("from");
    params.delete("to");
    params.delete("date");
    params.set("page", "1");
    router.push(`/tickets`, { scroll: false });
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (e.target.value !== "default") {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedTickets = tickets.slice(startIndex, endIndex);

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
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-8 text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-slate-950 dark:text-slate-200 sm:text-5xl">
            All Available <span className="text-[#6367FF]">Tickets</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 max-w-md mx-auto">
            Search destinations, filter transport modes, and sort prices
            dynamically.
          </p>
        </div>

        <SearchBar
          searchParams={searchParams}
          handleSearch={handleSearch}
          handleOnChange={handleOnChange}
          handleClearFilters={handleClearFilters}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-300">
            Showing{" "}
            <span className="text-[#6367FF]">{displayedTickets.length}</span> of{" "}
            <span className="text-[#6367FF]">{tickets.length}</span> verified
            results
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
          {isLoading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <TicketCardSkeleton key={index} />
            ))
          ) : Array.isArray(displayedTickets) && displayedTickets.length > 0 ? (
            displayedTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                ticket={ticket}
                isAdvertised={ticket?.isAdvertised}
                getTransportIcon={getTransportIcon}
              />
            ))
          ) : (
            <p className="text-center py-12 text-slate-400 dark:text-slate-300 font-medium">
              No tickets found.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${
                  currentPage === page
                    ? "bg-[#6367FF] text-white shadow-lg shadow-[#6367FF]/20"
                    : "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
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
