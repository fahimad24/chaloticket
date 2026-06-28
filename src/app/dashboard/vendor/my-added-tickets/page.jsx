"use client";

import { useState, useEffect } from "react";
import {
  Ticket,
  MapPin,
  Calendar,
  Layers,
  Edit3,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { deleteTicket, fetchAllTickets } from "@/lib/api-action";
import { useUserInfo } from "@/lib/user-action";
import { DeleteModal } from "@/app/components/modal/DeleteModal";
import Link from "next/link";

export default function MyAddedTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useUserInfo();

  useEffect(() => {
    async function fetchTickets() {
      const result = await fetchAllTickets(session?.email);
      setTickets(result);
      setIsLoading(false);
    }
    fetchTickets();
    return () => {
      setTickets([]);
    };
  }, [session?.email]);

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending:
        "bg-amber-50 text-amber-700 border-amber-200/60 flex items-center gap-1",
      approved:
        "bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1",
      rejected:
        "bg-rose-50 text-rose-700 border-rose-200 flex items-center gap-1",
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

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-primary tracking-tight flex items-center gap-2">
          <Ticket className="w-7 h-7 text-[#6367FF]" /> My Added Tickets
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
          Monitor your transport routes, check real-time admin approvals, and
          update route metrics.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="rounded-2xl overflow-hidden border-slate-100 shadow-sm bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-md "
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
      ) : tickets.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-600 rounded-2xl bg-white dark:bg-slate-800 max-w-xl mx-auto p-6 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No tickets found
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-400">
            You haven&apos;t created any ticket routes yet. Click &apos;Add
            Ticket&apos; to list your first transport service.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const isRejected = ticket.verificationStatus === "rejected";

            return (
              <Card
                key={ticket._id}
                className="group rounded-2xl overflow-hidden border-slate-100 dark:border-slate-600 shadow-sm bg-white dark:bg-slate-800 flex flex-col justify-between transition-all duration-300 hover:shadow-md pt-0"
              >
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-600 overflow-hidden aspect-video">
                  <Image
                    src={ticket.image}
                    alt={ticket.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 ${isRejected ? "grayscale opacity-75" : ""}`}
                  />

                  <div className="absolute top-3 right-3 z-10 shadow-sm">
                    {getStatusBadge(ticket.verificationStatus)}
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    ROUTE REF: {ticket._id}
                  </div>
                </div>

                <CardContent className="p-5 space-y-3 grow">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-200 tracking-wider">
                      {ticket.transportType} Service
                    </span>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base line-clamp-1 group-hover:text-[#6367FF] dark:group-hover:text-[#6367FF] transition-colors mt-0.5">
                      {ticket.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-200 bg-slate-50 dark:bg-slate-600 p-2.5 rounded-xl border border-slate-100/70 dark:border-slate-600/70">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{ticket.from}</span>
                    <span className="text-slate-300 mx-0.5">→</span>
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{ticket.to}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs border-b border-dashed border-slate-100 dark:border-slate-600/70 pb-3">
                    <div>
                      <span className="text-slate-400 dark:text-slate-200 block mb-0.5">
                        Available Supply
                      </span>
                      <p className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />{" "}
                        {ticket.quantity} Seats
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 dark:text-slate-200 block mb-0.5">
                        Price (Per Unit)
                      </span>
                      <p className="font-extrabold text-[#6367FF] text-sm">
                        ৳ {ticket.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-200 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium text-slate-700 dark:text-slate-200">
                        Scheduled Departure
                      </span>
                      <span className="text-[11px]">
                        {formatDateTime(ticket.departureTime)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {ticket.perks.map((perk, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-200 font-medium px-2 py-0.5 rounded-md"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 flex flex-col gap-2.5">
                  {isRejected && (
                    <div className="w-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-2 rounded-lg text-[11px] font-medium border border-rose-100 dark:border-rose-500/50 flex items-center gap-1.5 mt-5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
                      Actions disabled because admin rejected this route.
                    </div>
                  )}

                  {!isRejected && (
                    <div className="grid grid-cols-2 gap-2 w-full mt-5">
                      <Link
                        href={`/dashboard/vendor/my-added-tickets/update-ticket/${ticket._id}`}
                        disabled={isRejected}
                        variant="outline"
                        className="border-slate-200 dark:border-slate-600 bg-amber-100 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 h-9 transition-all disabled:opacity-40 disabled:bg-slate-100 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Update
                      </Link>

                      <DeleteModal
                        ticket={ticket}
                        isRejected={isRejected}
                        handleDelete={handleDelete}
                      ></DeleteModal>
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
