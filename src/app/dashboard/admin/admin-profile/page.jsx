"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Phone,
  MapPin,
  Edit,
  Key,
  CheckCircle2,
  Activity,
  ShieldCheck,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── ১. মক অ্যাডমিন প্রোফাইল ডাটা ───
const ADMIN_DATA = {
  name: "Ahmad Fahim",
  email: "fahim.admin@chaloticket.com",
  role: "Super Admin", // Admin Role
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop", // Profile Picture
  phone: "+880 1712-345678",
  location: "Dhaka, Bangladesh",
  joinedDate: "January 15, 2025",
  status: "Active",
  permissions: [
    "Manage Vendor Approvals",
    "Ticket Route Moderation",
    "Financial Payout Control",
    "User & Vendor Management",
    "System Settings Override",
  ],
};

export default function AdminProfile() {
  const [admin, setAdmin] = useState(ADMIN_DATA);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Shield className="w-7 h-7 text-[#6367FF]" /> Admin Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View your system privileges, personal identifiers, and account
          credentials.
        </p>
      </div>

      {/* ─── MAIN TWO-COLUMN SPLIT LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: HERO AVATAR CARD */}
        <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden h-fit">
          <div className="h-28 bg-linear-to-r from-[#6367FF] to-[#8f92ff] relative" />

          <CardContent className="p-6 pt-0 text-center relative flex flex-col items-center">
            {/* Profile Picture with Shadcn Avatar */}
            <Avatar className="w-24 h-24 border-4 border-white shadow-md -mt-12 rounded-full object-cover">
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <AvatarFallback className="bg-slate-200 text-slate-700 text-xl font-bold">
                {admin.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Name & Email */}
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-bold text-slate-800">{admin.name}</h2>
              <p className="text-xs text-slate-400 font-mono select-all">
                {admin.email}
              </p>
            </div>

            {/* Role Badge */}
            <div className="mt-3">
              <Badge className="bg-indigo-50 text-[#6367FF] border border-indigo-100 hover:bg-indigo-50 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {admin.role}
              </Badge>
            </div>

            <Separator className="my-5 bg-slate-100" />

            {/* Quick Stats / Status Indicators */}
            <div className="grid grid-cols-2 gap-4 w-full text-left">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Status
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {admin.status}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  System Authority
                </span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                  <Activity className="w-3.5 h-3.5 text-[#6367FF]" /> Full
                  Access
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="w-full space-y-2 mt-5">
              <Button
                size="sm"
                className="w-full h-9 rounded-xl bg-[#6367FF] hover:bg-[#5054E3] text-white text-xs font-semibold gap-1.5 shadow-sm"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Profile Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full h-9 rounded-xl border-slate-200 text-xs font-semibold gap-1.5 text-slate-600"
              >
                <Key className="w-3.5 h-3.5" /> Change Security PIN
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: DETAILED META INFO */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE DETAILS CARD */}
          <Card className="rounded-2xl border-slate-100 shadow-sm bg-white">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-base font-bold text-slate-800">
                Account Identity Information
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Verified identity checkpoints bound to this administrative node.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name Item */}
                <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/70">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Legal Name
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {admin.name}
                    </span>
                  </div>
                </div>

                {/* Email Address Item */}
                <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/70">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      System Email
                    </span>
                    <span className="text-sm font-semibold text-slate-700 truncate">
                      {admin.email}
                    </span>
                  </div>
                </div>

                {/* Phone Number Item */}
                <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/70">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Phone Extension
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {admin.phone}
                    </span>
                  </div>
                </div>

                {/* Registered Location Item */}
                <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/70">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Operating Base
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {admin.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Chronology */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pt-2 pl-1">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>
                  Administrative terminal initialized on{" "}
                  <strong className="text-slate-600">{admin.joinedDate}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* PERMISSIONS & ACL CONTROL CARD */}
          <Card className="rounded-2xl border-slate-100 shadow-sm bg-white">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-base font-bold text-slate-800">
                Security Scope & Permissions
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                ACL matrix privileges mapped to your core security clearancet
                level.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2">
                {admin.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-150 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-indigo-50/40 hover:text-[#6367FF] hover:border-indigo-100 cursor-default"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {permission}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
