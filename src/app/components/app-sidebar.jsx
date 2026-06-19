"use client";

import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  User,
  Ticket,
  History,
  Store,
  PlusCircle,
  ClipboardList,
  DollarSign,
  ShieldCheck,
  Settings,
  Users,
  Megaphone,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton, // 👈 ১. Skeleton ইম্পোর্ট করা হলো
} from "@/components/ui/sidebar";
import Logo from "./ui/Logo";
import { useUserInfo } from "@/lib/user-action";
import { cn } from "@/lib/utils";
import { Button } from "@heroui/react";

const sidebarRoutes = {
  traveler: [
    { title: "User Profile", url: "/dashboard/profile", icon: User },
    {
      title: "My Booked Tickets",
      url: "/dashboard/booked-tickets",
      icon: Ticket,
    },
    {
      title: "Transaction History",
      url: "/dashboard/transactions",
      icon: History,
    },
  ],
  vendor: [
    { title: "Vendor Profile", url: "/dashboard/vendor-profile", icon: Store },
    { title: "Add Ticket", url: "/dashboard/add-ticket", icon: PlusCircle },
    { title: "My Added Tickets", url: "/dashboard/my-tickets", icon: Ticket },
    {
      title: "Requested Bookings",
      url: "/dashboard/requested-bookings",
      icon: ClipboardList,
    },
    { title: "Revenue Overview", url: "/dashboard/revenue", icon: DollarSign },
  ],
  admin: [
    {
      title: "Admin Profile",
      url: "/dashboard/admin-profile",
      icon: ShieldCheck,
    },
    {
      title: "Manage Tickets",
      url: "/dashboard/manage-tickets",
      icon: Settings,
    },
    { title: "Manage Users", url: "/dashboard/manage-users", icon: Users },
    {
      title: "Advertise Tickets",
      url: "/dashboard/advertise-tickets",
      icon: Megaphone,
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { session, isPending } = useUserInfo();

  console.log("Session in AppSidebar:", session, "Is Pending:", isPending);

  const currentRole = session?.role;
  const currentRoutes = sidebarRoutes[currentRole];

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200 bg-primary/5 transition-all duration-300"
    >
      {/* ─── SIDEBAR HEADER ─── */}
      <SidebarHeader className="p-4 border-b border-slate-100">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-3 px-2">
            <Logo textSize="text-3xl" className="" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ─── SIDEBAR CONTENT ─── */}
      <SidebarContent className="gap-0 p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            {isPending ? "Loading Menu..." : `${currentRole} Menu`}
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {/* 👈 ৩. এখানে কন্ডিশন চেক করা হচ্ছে: লোড হতে থাকলে ৫টি কঙ্কাল (Skeleton) দেখাবে */}
              {isPending
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SidebarMenuItem key={index} className="px-2 py-1">
                      <SidebarMenuSkeleton />
                    </SidebarMenuItem>
                  ))
                : // লোড শেষ হলে আসল রুট ম্যাপ হবে
                  currentRoutes.map((route) => {
                    const isActive = pathname === route.url;
                    const Icon = route.icon;

                    return (
                      <SidebarMenuItem key={route.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={`w-full transition-all duration-200 py-5 px-3 rounded-xl
                          ${
                            isActive
                              ? "bg-[#6367FF] text-white hover:bg-[#6367FF] hover:text-white shadow-md shadow-[#6367FF]/20"
                              : "text-slate-600 hover:bg-[#8494FF]/10 hover:text-[#6367FF]"
                          }`}
                        >
                          <Link
                            href={route.url}
                            className="flex items-center gap-3"
                          >
                            <Icon
                              className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}
                            />
                            <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
                              {route.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ─── SIDEBAR FOOTER ─── */}
      <SidebarFooter className="p-3 border-t border-slate-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full p-2 rounded-xl bg-slate-50 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
              <div className="flex items-center gap-2 overflow-hidden">
                {/* লোড হওয়ার সময় প্রোফাইল পিকচারের জায়গায় একটি ছোট ব্লিংক বা লোডার ইফেক্ট থাকবে */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 
                  ${isPending ? "bg-slate-200 animate-pulse" : "bg-[#FFDBFD] text-[#6367FF]"}`}
                >
                  {!isPending &&
                    (session?.user?.name?.charAt(0).toUpperCase() || "U")}
                </div>

                <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                  {isPending ? (
                    <>
                      <div className="h-3 w-20 bg-slate-200 animate-pulse rounded-full mb-1"></div>
                      <div className="h-2 w-12 bg-slate-200 animate-pulse rounded-full"></div>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-semibold text-slate-700 truncate">
                        {session?.user?.name}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate capitalize">
                        {currentRole}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {!isPending && (
                <Button
                  variant="ghost"
                  size="icon"
                  onPress={() => handleLogout()}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors group-data-[collapsible=icon]:hidden"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
