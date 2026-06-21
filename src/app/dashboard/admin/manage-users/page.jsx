"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  ShieldAlert,
  UserPlus,
  Shield,
  Star,
  Mail,
  Ban,
  RefreshCw,
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
import { Button } from "@/components/ui/button";

// ─── ১. ইউজার লিস্ট ডেমো ডাটা ───
const INITIAL_USERS = [
  {
    id: "USR-01",
    name: "Zahid Hasan",
    email: "zahid.hasan@gmail.com",
    role: "user",
    isFraud: false,
  },
  {
    id: "USR-02",
    name: "Niaz Morshed",
    email: "niaz.vendor@greenline.com",
    role: "vendor",
    isFraud: false,
  },
  {
    id: "USR-03",
    name: "Sultana Razia",
    email: "razia.travels@yahoo.com",
    role: "vendor",
    isFraud: true,
  }, // অলরেডি ফ্রড
  {
    id: "USR-04",
    name: "Taskin Ahmed",
    email: "taskin.dev@gmail.com",
    role: "admin",
    isFraud: false,
  },
  {
    id: "USR-05",
    name: "Imran Khan",
    email: "imran.khan@outlook.com",
    role: "user",
    isFraud: false,
  },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(INITIAL_USERS);

  // ─── ২. অ্যাকশন হ্যান্ডলার ফাংশনস ───

  // ROLE: MAKE ADMIN
  const handleMakeAdmin = (id, name) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: "admin" } : user)),
    );
    toast.success(`${name} is now an Admin`);
  };

  // ROLE: MAKE VENDOR
  const handleMakeVendor = (id, name) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: "vendor" } : user)),
    );
    toast.success(`${name} is now a Vendor`);
  };

  // 🚨 MARK AS FRAUD (FOR BOTH USER & VENDOR)
  const handleMarkAsFraud = (id, name, role) => {
    const confirmFraud = window.confirm(
      `⚠️ Are you sure you want to mark this ${role} (${name}) as FRAUD? This will restrict their platform privileges.`,
    );
    if (confirmFraud) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isFraud: true } : user,
        ),
      );
      toast.error(`${name} marked as FRAUD!`, {
        description: `This account's actions are now blocked and blacklisted.`,
      });
    }
  };

  // 🔄 UNMARK FRAUD (রিকভারি অপশন)
  const handleUnmarkFraud = (id, name) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isFraud: false } : user)),
    );
    toast.success(`Fraud status removed for ${name}`, {
      description: "Account access privileges restored.",
    });
  };

  // ─── ৩. হেল্পার UI জেনারেটরস ───

  // নামের প্রথম অক্ষর দিয়ে ডাইনামিক প্রোফাইল ইমেজ (Avatar)
  const renderAvatar = (name, isFraud) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border select-none
        ${
          isFraud
            ? "bg-rose-100 text-rose-700 border-rose-200"
            : "bg-indigo-50 text-[#6367FF] border-indigo-100"
        }`}
      >
        {initials}
      </div>
    );
  };

  // রোল ও ফ্রড স্টেট ওয়াইজ ব্যাজ
  const getRoleBadge = (role, isFraud) => {
    if (isFraud)
      return (
        <Badge
          variant="destructive"
          className="bg-rose-600 text-white gap-1 animate-pulse"
        >
          <Ban className="w-3.5 h-3.5" /> Fraud Locked
        </Badge>
      );

    const badges = {
      admin: (
        <Badge className="bg-purple-50 text-purple-700 border border-purple-200 gap-1">
          <Shield className="w-3 h-3 text-purple-600" /> Admin
        </Badge>
      ),
      vendor: (
        <Badge className="bg-indigo-50 text-[#6367FF] border border-indigo-200 gap-1">
          <Star className="w-3 h-3 text-[#6367FF]" /> Vendor
        </Badge>
      ),
      user: (
        <Badge className="bg-slate-100 text-slate-600 border border-slate-200 gap-1">
          <UserCheck className="w-3 h-3 text-slate-500" /> User
        </Badge>
      ),
    };
    return badges[role];
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Users className="w-7 h-7 text-[#6367FF]" /> Manage Users
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor user accounts, manage vendor roles, and enforce global fraud
          protection policies.
        </p>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────── */}
      {/* LAYOUT A: DESKTOP, LAPTOP & TABLET VIEW (md: এবং তার বড় স্ক্রিনের জন্য) */}
      {/* ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="font-semibold text-slate-700 py-4 pl-6">
                Profile & Identity
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4">
                Account Type
              </TableHead>
              <TableHead className="font-semibold text-slate-700 py-4 text-right pr-6">
                Access Control Options
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className={`hover:bg-slate-50/40 transition-colors border-slate-100 ${user.isFraud ? "bg-rose-50/20" : ""}`}
              >
                {/* ১. LEFT PROFILE IMAGE & DETAILS */}
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    {renderAvatar(user.name, user.isFraud)}
                    <div className="space-y-0.5">
                      <p
                        className={`text-sm font-bold ${user.isFraud ? "text-rose-700 line-through" : "text-slate-800"}`}
                      >
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-300" /> {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* ২. ROLE BADGE */}
                <TableCell className="py-4">
                  {getRoleBadge(user.role, user.isFraud)}
                </TableCell>

                {/* ৩. ACTIONS (ADMIN EXCLUDED FROM FRAUD LOCK) */}
                <TableCell className="py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    {user.isFraud ? (
                      // ফ্রড অ্যাকাউন্ট রিকভার করার বাটন
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnmarkFraud(user.id, user.name)}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 h-8 px-3 rounded-xl font-bold text-xs flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Unmark Fraud
                      </Button>
                    ) : (
                      <>
                        {/* MAKE ADMIN BUTTON */}
                        {user.role !== "admin" && (
                          <Button
                            size="sm"
                            onClick={() => handleMakeAdmin(user.id, user.name)}
                            className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-3 rounded-xl font-bold text-xs"
                          >
                            Make Admin
                          </Button>
                        )}

                        {/* MAKE VENDOR BUTTON */}
                        {user.role !== "vendor" && (
                          <Button
                            size="sm"
                            onClick={() => handleMakeVendor(user.id, user.name)}
                            className="bg-[#6367FF] hover:bg-[#5054E3] text-white h-8 px-3 rounded-xl font-bold text-xs"
                          >
                            Make Vendor
                          </Button>
                        )}

                        {/* MARK AS FRAUD BUTTON (FOR BOTH USERS & VENDORS, EXCLUDING ADMIN) */}
                        {user.role !== "admin" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleMarkAsFraud(user.id, user.name, user.role)
                            }
                            className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-3 rounded-xl font-bold text-xs flex items-center gap-1"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" /> Mark as
                            Fraud
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* LAYOUT B: MOBILE CARD LIST LAYOUT (মোবাইল স্ক্রিনের জন্য রেস্পনসিভ) */}
      {/* ──────────────────────────────────────────────────────────── */}
      <div className="block md:hidden space-y-4">
        {users.map((user) => (
          <Card
            key={user.id}
            className={`rounded-xl border-slate-100 shadow-sm overflow-hidden ${user.isFraud ? "bg-rose-50/30 border-rose-100" : "bg-white"}`}
          >
            <CardContent className="p-4 space-y-3.5">
              {/* মোবাইল প্রোফাইল হেডার (বাম পাশে ইমেজ) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 max-w-[70%]">
                  {renderAvatar(user.name, user.isFraud)}
                  <div className="space-y-0.5 min-w-0">
                    <p
                      className={`text-sm font-bold ${user.isFraud ? "text-rose-700 line-through" : "text-slate-800"} truncate`}
                    >
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div>{getRoleBadge(user.role, user.isFraud)}</div>
              </div>

              {/* মোবাইল অ্যাকশন বাটন গ্রুপ */}
              <div className="pt-2 border-t border-slate-50 flex flex-col gap-2 w-full">
                {user.isFraud ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnmarkFraud(user.id, user.name)}
                    className="border-slate-200 text-slate-600 w-full h-9 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />{" "}
                    Unmark Fraud Account
                  </Button>
                ) : (
                  <>
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        onClick={() => handleMakeAdmin(user.id, user.name)}
                        className="bg-purple-600 hover:bg-purple-700 text-white w-full h-9 font-bold text-xs"
                      >
                        Make Admin
                      </Button>
                    )}

                    {user.role !== "vendor" && (
                      <Button
                        size="sm"
                        onClick={() => handleMakeVendor(user.id, user.name)}
                        className="bg-[#6367FF] text-white w-full h-9 font-bold text-xs"
                      >
                        Make Vendor
                      </Button>
                    )}

                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleMarkAsFraud(user.id, user.name, user.role)
                        }
                        className="border-rose-200 text-rose-600 hover:bg-rose-50 w-full h-9 font-bold text-xs"
                      >
                        Mark as Fraud
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
