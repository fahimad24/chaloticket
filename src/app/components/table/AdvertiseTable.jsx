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
import { updateTicket } from "@/lib/api-action";

const AdvertiseTable = ({ tickets, setTickets, currentAdvertisedCount }) => {
  const handleToggleAdvertise = async (id, currentStatus, title) => {
    if (!currentStatus && currentAdvertisedCount >= 6) {
      toast.error("Advertisement Limit Exceeded!", {
        description:
          "You can only feature a maximum of 6 tickets simultaneously on the homepage.",
        icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      });
      return;
    }
    const result = await updateTicket(id, { isAdvertised: !currentStatus });
    if (result.error) {
      toast.error("Failed to update advertisement status. Please try again.");
    }
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket._id === id) {
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

  const renderTicketImage = (imageUrl, title, isAdvertised) => {
    return (
      <div className="relative shrink-0 select-none w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-600 bg-slate-100 flex items-center justify-center">
        {imageUrl ? (
          <Image
            fill
            priority
            src={imageUrl}
            alt={title}
            className={`w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-600 transition-all duration-300
              ${
                isAdvertised
                  ? "ring-2 ring-amber-500 ring-offset-2 scale-95 shadow-md shadow-amber-500/20"
                  : "opacity-90"
              }`}
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-300 border border-slate-200 dark:border-slate-500">
            <ImageIcon className="w-5 h-5" />
          </div>
        )}

        {isAdvertised && (
          <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full shadow-sm border border-white animate-bounce">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 dark:border-slate-500 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70 dark:bg-slate-700/50">
            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-500">
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 pl-6">
                Ticket Banner & Route
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                Destination
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                Ticket Price
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-center">
                Live Status
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-right pr-6">
                Push to Homepage
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket._id}
                className={`hover:bg-slate-50/40 transition-colors dark:bg-slate-800 border-slate-100 dark:border-slate-500 ${ticket.isAdvertised ? "bg-amber-50/10" : ""}`}
              >
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3.5">
                    {renderTicketImage(
                      ticket.image,
                      ticket.title,
                      ticket.isAdvertised,
                    )}
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-300 line-clamp-1">
                        {ticket.title}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">
                        ID: {ticket._id}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-500 px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{ticket.from}</span>
                    <span className="text-slate-300 dark:text-slate-400 font-normal">
                      →
                    </span>
                    <span>{ticket.to}</span>
                  </div>
                </TableCell>

                <TableCell className="py-4 font-extrabold text-sm text-slate-800 dark:text-slate-300">
                  ৳ {ticket.price.toLocaleString()}
                </TableCell>

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

                <TableCell className="py-4 text-right pr-6">
                  <div className="inline-flex items-center justify-end h-8">
                    <Switch
                      checked={ticket.isAdvertised}
                      onCheckedChange={() =>
                        handleToggleAdvertise(
                          ticket._id,
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

      <div className="block md:hidden space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket._id}
            className={`rounded-xl border-slate-100 dark:border-slate-600 shadow-sm overflow-hidden transition-all duration-200 ${ticket.isAdvertised ? "bg-amber-50/30 dark:bg-amber-50/20 border-amber-200/60 dark:border-amber-200/40 ring-1 ring-amber-100 dark:ring-amber-100/30" : "bg-white dark:bg-slate-800"}`}
          >
            <CardContent className="p-4 space-y-4">
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
                      ID: {ticket._id}
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
                      className="text-slate-400 dark:text-slate-300 text-[10px] py-0.5"
                    >
                      Off
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-600 text-xs">
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

              <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Show in Homepage Banner:
                </span>
                <Switch
                  checked={ticket.isAdvertised}
                  onCheckedChange={() =>
                    handleToggleAdvertise(
                      ticket._id,
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
};

export default AdvertiseTable;
