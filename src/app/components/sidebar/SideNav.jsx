"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LogOut,
  User,
  Ticket,
  Settings,
  Users,
  History,
  Store,
  PlusCircle,
  ClipboardList,
  DollarSign,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

const sidebarRoutes = {
  traveler: [
    { title: "User Profile", url: "/dashboard/profile", icon: User },
    {
      title: "My Booked Tickets",
      url: "/dashboard/user/my-bookings",
      icon: Ticket,
    },
    {
      title: "Transaction History",
      url: "/dashboard/user/transactions",
      icon: History,
    },
  ],
  vendor: [
    {
      title: "Vendor Profile",
      url: "/dashboard/profile",
      icon: Store,
    },
    {
      title: "Add Ticket",
      url: "/dashboard/vendor/add-ticket",
      icon: PlusCircle,
    },
    {
      title: "My Added Tickets",
      url: "/dashboard/vendor/my-added-tickets",
      icon: Ticket,
    },
    {
      title: "Requested Bookings",
      url: "/dashboard/vendor/requested-bookings",
      icon: ClipboardList,
    },
    {
      title: "Revenue Overview",
      url: "/dashboard/vendor/revenue-overview",
      icon: DollarSign,
    },
  ],
  admin: [
    {
      title: "Admin Profile",
      url: "/dashboard/profile",
      icon: ShieldCheck,
    },
    {
      title: "Manage Tickets",
      url: "/dashboard/admin/manage-tickets",
      icon: Settings,
    },
    {
      title: "Manage Users",
      url: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      title: "Advertise Tickets",
      url: "/dashboard/admin/advertise-tickets",
      icon: Megaphone,
    },
  ],
};

export default function SidebarNav({ currentRole, handleLogout }) {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2">
            {/* Regular menu items */}
            {sidebarRoutes[currentRole]?.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={` ${isActive ? "bg-primary text-white hover:bg-primary/80 hover:text-white" : "hover:bg-secondary/45 hover:text-secondary-foreground"}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup className="mt-auto">
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Sign Out"}>
                <div>
                  <LogOut className="h-4 w-4" />
                  <span className="cursor-pointer" onClick={handleLogout}>
                    Sign Out
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
