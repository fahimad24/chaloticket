"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Shield,
  ShoppingBag,
  DollarSign,
  PlusCircle,
  CheckCircle,
  Users,
  BarChart3,
  Ticket,
  Bus,
  ArrowRight,
  TicketX,
} from "lucide-react";
import { useUserInfo } from "@/lib/user-action";
import {
  fetchAllTickets,
  fetchAllUsers,
  fetchBookedTicketsByUserId,
  fetchTotalRevenue,
  fetchTotalTicketsQuantity,
  fetchTotalTicketsSold,
} from "@/lib/api-action";
import HistoryTable from "@/app/components/table/HistoryTable";
import ProfileSkeleton from "@/app/components/skeleton/ProfileSkeleton";
import { EditProfileDialog } from "@/app/components/ui/EditProfileModal";
import { GetStatusBadges } from "@/app/components/ui/GetStatusBadges";

export default function UnifiedProfilePage() {
  const { session, refetch } = useUserInfo();

  const currentRole = session?.role || "traveler";

  const [isPending, setIsPending] = useState(true);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [totalTicketsAdded, setTotalTicketsAdded] = useState(0);
  const [totalTicketsSold, setTotalTicketsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [users, setUsers] = useState([]);

  const profileData = {
    name: session?.name || "User",
    email: session?.email || "No email provided",
    avatar:
      session?.image ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    joinedDate: session?.createdAt
      ? new Date(session.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A",
  };

  useEffect(() => {
    async function fetchData() {
      if (!session?.id) return;

      setIsPending(true);
      try {
        if (currentRole === "traveler") {
          const data = await fetchBookedTicketsByUserId(session.id);
          if (data) setBookedTickets(data);
        } else if (currentRole === "vendor") {
          const totalTicketsAdded = await fetchTotalTicketsQuantity(session.id);
          const totalTicketsSold = await fetchTotalTicketsSold(session.id);
          const totalRevenue = await fetchTotalRevenue(session.id);
          if (totalTicketsAdded) setTotalTicketsAdded(totalTicketsAdded);
          if (totalTicketsSold) setTotalTicketsSold(totalTicketsSold);
          if (totalRevenue) setTotalRevenue(totalRevenue);
        } else if (currentRole === "admin") {
          const usersData = await fetchAllUsers();
          const data = await fetchAllTickets("", "");
          if (data) setBookedTickets(data);
          if (usersData) setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsPending(false);
      }
    }

    if (session?.id) {
      fetchData();
    }
  }, [session?.id, currentRole]);

  const completedTrips = bookedTickets.filter(
    (t) =>
      t.status?.toLowerCase() === "accepted" ||
      t.status?.toLowerCase() === "paid",
  ).length;

  const rejectedTrips = bookedTickets.filter(
    (t) => t.status?.toLowerCase() === "rejected",
  ).length;

  const userStats = [
    {
      label: "Total Bookings",
      value: `${bookedTickets.length} Tickets`,
      icon: <Ticket className="w-5 h-5 text-[#6367FF]" />,
    },
    {
      label: "Completed Trips",
      value: `${completedTrips} Tickets`,
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    },
    {
      label: "Rejected Trips",
      value: `${rejectedTrips} Tickets`,
      icon: <TicketX className="w-5 h-5 text-rose-500" />,
    },
  ];

  const vendorStats = [
    {
      label: "Total Earnings",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
    },
    {
      label: "Total Transport Routes",
      value: `${totalTicketsAdded} Routes`,
      icon: <Bus className="w-5 h-5 text-[#6367FF]" />,
    },
    {
      label: "Seats Sold",
      value: `${totalTicketsSold.totalTicketsSold} Seats`,
      icon: <Users className="w-5 h-5 text-[#8494FF]" />,
    },
  ];

  const adminStats = [
    {
      label: "Total Users",
      value: `${users.length} users`,
      icon: <Users className="w-5 h-5 text-[#6367FF]" />,
    },
    {
      label: "Active Vendors",
      value: `${users.filter((user) => user.role === "vendor").length} Companies`,
      icon: <ShoppingBag className="w-5 h-5 text-[#8494FF]" />,
    },
    {
      label: "Total System Sales",
      value: "৳3,80,000",
      icon: <BarChart3 className="w-5 h-5 text-emerald-500" />,
    },
  ];

  if (isPending || (!session && currentRole === "traveler")) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-[#6367FF]/10 shrink-0">
              <Image
                src={profileData.avatar}
                alt="User Avatar"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {profileData.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black rounded-lg uppercase tracking-wider border ${
                    currentRole === "admin"
                      ? "bg-rose-50 text-rose-600 border-rose-200/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900"
                      : currentRole === "vendor"
                        ? "bg-amber-50 text-amber-600 border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900"
                        : "bg-[#ffdbfd]/40 text-[#6367FF] border-[#C9BEFF]/40 dark:bg-[#6367FF]/10 dark:text-[#8494FF]"
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  {currentRole}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-400">
                {profileData.email}
              </p>
              <p className="text-xs text-slate-400 font-semibold">
                Member Since: {profileData.joinedDate}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <EditProfileDialog session={session} refetch={refetch} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentRole === "traveler" &&
            userStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  {stat.icon}
                </div>
              </div>
            ))}

          {currentRole === "vendor" &&
            vendorStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  {stat.icon}
                </div>
              </div>
            ))}

          {currentRole === "admin" &&
            adminStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  {stat.icon}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          {currentRole === "traveler" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                  Recent Purchase History
                </h3>
              </div>
              <div className="w-full">
                <HistoryTable bookedTickets={bookedTickets} />
              </div>
            </div>
          )}

          {currentRole === "vendor" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                  Your Active Transport Lists
                </h3>
              </div>
              <div className="space-y-4">
                {totalTicketsSold?.tickets.map((ticket, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {ticket.title}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold">
                        Vehicle Class: {ticket.type} • Status: Active
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-none border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          Total Revenue
                        </p>
                        <p className="font-extrabold text-slate-950 dark:text-white">
                          {ticket.sales}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-[#ffdbfd]/40 text-[#6367FF] dark:text-green-300 dark:bg-[#ffdbfd]/40 border border-[#C9BEFF]/40">
                        {ticket.seats} Seats Sold
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentRole === "admin" && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                  Pending Approvals Queue
                </h3>
              </div>
              <div className="space-y-4">
                {bookedTickets.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {req.title}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold">
                        Vendor: {req.vendorName} • {req.transportType} • Seats:{" "}
                        {req.quantity}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto border-t sm:border-none border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 justify-end">
                      <GetStatusBadges status={req.verificationStatus} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
