"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Store,
  Ticket,
  Coins,
  CalendarDays,
  ShieldAlert,
  Settings,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function VendorProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);

  // ডেমো সেভ হ্যান্ডলার
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };

  // ⏳ পেজ লোডিং কন্ডিশন (Skeleton Loader)
  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-35 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-95 w-full rounded-2xl" />
          <Skeleton className="h-95 w-full md:col-span-2 rounded-2xl" />
        </div>
      </div>
    );
  }

  const user = session?.user;
  const currentRole = user?.role || "vendor";

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ─── PREMIUM GRADIENT BANNER ─── */}
      <div className="relative h-36 md:h-44 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-[#6367FF] overflow-hidden shadow-md">
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white text-xs font-mono tracking-wider">
          Vendor Portal v1.0
        </div>
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#6367FF]/20 rounded-full blur-2xl"></div>
      </div>

      {/* ─── MAIN GRID LAYOUT ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-0 relative -mt-16 md:-mt-20">
        {/* ─── LEFT SIDE: VENDOR CARD ─── */}
        <div className="space-y-6">
          <Card className="border-slate-100 shadow-sm z-10 bg-white">
            <CardHeader className="text-center pb-2 items-center">
              {/* Profile Pic with Hover Effect */}
              <div className="relative w-24 h-24 rounded-2xl border-4 border-white bg-[#FFDBFD] flex items-center justify-center text-[#6367FF] text-3xl font-extrabold shadow-md mb-3 group overflow-hidden">
                {user?.name?.charAt(0).toUpperCase() || "V"}

                <button className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
                {user?.name || "Vendor Partner"}
              </CardTitle>

              <CardDescription className="flex items-center gap-1.5 justify-center text-slate-500 mt-1 text-xs break-all max-w-full">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {user?.email || "vendor@chaloticket.com"}
              </CardDescription>

              {/* Dynamic Role Badge */}
              <div className="mt-4 px-4 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Store className="w-3.5 h-3.5 text-[#8494FF]" />
                {currentRole}
              </div>
            </CardHeader>

            {/* Vendor Statistics Summary */}
            <CardContent className="pt-4 border-t border-slate-50 mt-4 space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <Ticket className="w-4 h-4 text-[#6367FF]" /> Active Tickets
                </div>
                <span className="font-bold text-slate-800">24</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <Coins className="w-4 h-4 text-emerald-500" /> Total Sales
                </div>
                <span className="font-bold text-slate-800">৳ 1,45,000</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-600">
                  <CalendarDays className="w-4 h-4 text-amber-500" />{" "}
                  Partnership
                </div>
                <span className="font-medium text-slate-500">Since 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── RIGHT SIDE: TABS LAYOUT ─── */}
        <div className="md:col-span-2 z-10">
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-6 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger
                value="business"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#6367FF] transition-all font-semibold"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Company Details
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#6367FF] transition-all font-semibold"
              >
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: COMPANY / VENDOR BUSINESS DETAILS */}
            <TabsContent value="business">
              <Card className="border-slate-100 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    This information will be displayed publicly on your ticket
                    listings.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSave}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">
                          Company / Brand Name
                        </Label>
                        <div className="relative">
                          <Store className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="companyName"
                            defaultValue={
                              user?.name
                                ? `${user.name} Travels`
                                : "ChaloTicket Partner"
                            }
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bizPhone">Business Hotline</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="bizPhone"
                            placeholder="+880 1XXX-XXXXXX"
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bizAddress">Office Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="bizAddress"
                            placeholder="Motijheel C/A, Dhaka, Bangladesh"
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-slate-50 pt-5">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-[#6367FF] hover:bg-[#8494FF] text-white px-6 rounded-xl shadow-md shadow-[#6367FF]/10 transition-all"
                    >
                      {isSaving ? "Updating Business..." : "Save Business Info"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* TAB 2: GENERAL ACCOUNT SETTINGS */}
            <TabsContent value="account">
              <Card className="border-slate-100 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Primary Account Details
                  </CardTitle>
                  <CardDescription>
                    Your main login credentials managed by Better Auth.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSave}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Vendor Owner Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="username"
                            defaultValue={user?.name}
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Registered Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            defaultValue={user?.email}
                            disabled
                            className="pl-9 bg-slate-50 text-slate-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Notice Box */}
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 text-xs flex gap-2.5 items-start mt-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">
                          Security Role Restricted
                        </span>
                        Your system privilege level is locked as a **
                        {currentRole}**. To update your email or primary
                        authentication tier, please contact ChaloTicket system
                        administration.
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end border-t border-slate-50 pt-5">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-6 rounded-xl transition-all"
                    >
                      {isSaving ? "Saving Account..." : "Update Owner Info"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
