"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Award,
  ChartNoAxesCombined,
  ChevronDown,
  Code,
  FileCode,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  User,
  Ticket,
  Mail,
  NotebookPen,
  Send,
  Settings,
  Users,
  Video,
  History,
  Store,
  PlusCircle,
  ClipboardList,
  DollarSign,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";

const sidebarRoutes = {
  traveler: [
    { title: "User Profile", url: "/dashboard/user/profile", icon: User },
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
    { title: "Vendor Profile", url: "/dashboard/vendor/profile", icon: Store },
    {
      title: "Add Ticket",
      url: "/dashboard/vendor/add-ticket",
      icon: PlusCircle,
    },
    {
      title: "My Added Tickets",
      url: "/dashboard/vendor/my-tickets",
      icon: Ticket,
    },
    {
      title: "Requested Bookings",
      url: "/dashboard/vendor/requested-bookings",
      icon: ClipboardList,
    },
    {
      title: "Revenue Overview",
      url: "/dashboard/vendor/revenue",
      icon: DollarSign,
    },
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

export default function SidebarNav({ currentRole }) {
  const pathname = usePathname();
  const [projectsOpen, setProjectsOpen] = useState(false);

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
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Sign Out"}>
                <div>
                  <LogOut className="h-4 w-4" />
                  <span className="cursor-pointer" onClick={() => signOut()}>
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
