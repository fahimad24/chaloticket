"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  Ticket,
  CalendarDays,
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

export default function UserProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isSaving, setIsSaving] = useState(false);

  // ডেমো সেভ ফাংশন
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500); // ১.৫ সেকেন্ড পর সেভ হবে
  };

  // ⏳ পেজ লোডিং অবস্থায় Skeleton দেখাবে
  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-37.5 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-100 w-full rounded-2xl" />
          <Skeleton className="h-100 w-full md:col-span-2 rounded-2xl" />
        </div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ─── HEADER BANNER ─── */}
      <div className="relative h-32 md:h-48 rounded-2xl bg-linear-to-r from-[#6367FF] to-[#8494FF] overflow-hidden shadow-lg">
        {/* ব্যাকগ্রাউন্ডে কিছু ডেকোরেটিভ শেপ */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-[#c9beff]/30 rounded-full blur-2xl"></div>
      </div>

      {/* ─── MAIN CONTENT GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-0 relative -mt-16 md:-mt-24">
        {/* ─── LEFT SIDE: USER OVERVIEW CARD ─── */}
        <Card className="border-slate-100 shadow-sm z-10 flex flex-col h-fit">
          <CardHeader className="text-center pb-2 items-center">
            {/* Profile Avatar Overlapping */}
            <div className="relative w-24 h-24 rounded-full border-4 border-white bg-[#FFDBFD] flex items-center justify-center text-[#6367FF] text-3xl font-bold shadow-md mb-2">
              {user?.name?.charAt(0).toUpperCase() || "U"}
              {/* Image Upload Button */}
              <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-[#6367FF] transition-colors shadow-sm">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <CardTitle className="text-xl font-bold text-slate-800">
              {user?.name || "User Name"}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 justify-center text-slate-500 mt-1">
              <Mail className="w-4 h-4" />
              {user?.email || "user@example.com"}
            </CardDescription>

            <div className="mt-4 px-3 py-1 bg-[#6367FF]/10 text-[#6367FF] text-xs font-semibold rounded-full uppercase tracking-wider">
              Traveler Account
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-[#6367FF]">
                    <Ticket className="w-4 h-4" />
                  </div>
                  Total Bookings
                </div>
                <span className="font-bold text-lg text-slate-800">12</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-[#6367FF]">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  Joined Since
                </div>
                <span className="font-medium text-sm text-slate-600">
                  Oct 2023
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ─── RIGHT SIDE: TABS (INFO & SETTINGS) ─── */}
        <div className="md:col-span-2 z-10">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-6 bg-slate-100/80 p-1 rounded-xl">
              <TabsTrigger
                value="personal"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#6367FF] data-[state=active]:shadow-sm transition-all"
              >
                <User className="w-4 h-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#6367FF] data-[state=active]:shadow-sm transition-all"
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* ─── TAB 1: PERSONAL INFO FORM ─── */}
            <TabsContent value="personal">
              <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your profile details and contact information.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSave}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="name"
                            defaultValue={user?.name}
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            defaultValue={user?.email}
                            disabled
                            className="pl-9 bg-slate-50 text-slate-500 cursor-not-allowed"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            placeholder="+880 1XXX-XXXXXX"
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            id="address"
                            placeholder="Dhaka, Bangladesh"
                            className="pl-9 focus-visible:ring-[#6367FF]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-slate-50 pt-6">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-[#6367FF] hover:bg-[#8494FF] text-white px-8 rounded-xl shadow-md shadow-[#6367FF]/20 transition-all"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* ─── TAB 2: SECURITY SETTINGS ─── */}
            <TabsContent value="security">
              <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Password & Security</CardTitle>
                  <CardDescription>
                    Manage your password and secure your account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSave}>
                  <CardContent className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="focus-visible:ring-[#6367FF]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="focus-visible:ring-[#6367FF]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="focus-visible:ring-[#6367FF]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-start border-t border-slate-50 pt-6">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-8 rounded-xl transition-all"
                    >
                      {isSaving ? "Updating..." : "Update Password"}
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
