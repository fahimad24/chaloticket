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
  SidebarMenuSkeleton,
  useSidebar, // 👈 ১. Skeleton ইম্পোর্ট করা হলো
} from "@/components/ui/sidebar";
import Logo from "./ui/Logo";
import { useUserInfo } from "@/lib/user-action";
import { Button } from "@heroui/react";
import SidebarNav from "./sidebar/SideNav";
import Image from "next/image";

export function AppSidebar() {
  const router = useRouter();
  const { state } = useSidebar();

  const { session, isPending } = useUserInfo();

  const currentRole = session?.role;

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
      className="border-r border-slate-200 dark:border-slate-600 bg-primary/5 transition-all duration-300"
    >
      {/* ─── SIDEBAR HEADER ─── */}
      <SidebarHeader className="border-b border-slate-100 dark:border-slate-600">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! h-10!"
              asChild
              tooltip={"Home"}
            >
              <Link href={"/"}>
                <Image
                  src={"/Images/logo.png"}
                  alt="logo-admin"
                  width={80}
                  height={80}
                  className={`transition-all duration-200 ${
                    state === "collapsed" ? "size-5" : "size-10"
                  }`}
                />
                <span className="text-base font-semibold">Chalo Ticket</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ─── SIDEBAR CONTENT ─── */}
      <SidebarNav currentRole={currentRole} handleLogout={handleLogout} />

      {/* ─── SIDEBAR FOOTER ─── */}
      <SidebarFooter className="border-t border-slate-100 dark:border-slate-600">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full rounded-xl bg-slate-50 dark:bg-slate-600 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <SidebarMenuButton
                  className="data-[slot=sidebar-menu-button]:p-1! h-10!"
                  asChild
                  tooltip={"Home"}
                >
                  <div>
                    <div
                      className={`${state === "collapsed" ? "size-6" : "size-8"} rounded-full flex items-center justify-center font-bold text-sm shrink-0 
                  ${isPending ? "bg-slate-200 dark:bg-slate-500 animate-pulse" : "text-[#FFDBFD] bg-[#6367FF]"}`}
                    >
                      {!isPending &&
                        (session?.name?.charAt(0).toUpperCase() || "U")}
                    </div>
                    <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                      {isPending ? (
                        <>
                          <div className="h-3 w-20 bg-slate-200 dark:bg-slate-500 animate-pulse rounded-full mb-1"></div>
                          <div className="h-2 w-12 bg-slate-200 dark:bg-slate-500 animate-pulse rounded-full"></div>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate capitalize">
                            {session?.name}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-300 truncate">
                            {session?.email}
                          </span>
                        </>
                      )}
                    </div>
                    {!isPending && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onPress={() => handleLogout()}
                        className="p-1.5 rounded-lg text-slate-400 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-500 hover:text-rose-500 dark:hover:text-slate-300 transition-colors group-data-[collapsible=icon]:hidden"
                        title="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </SidebarMenuButton>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
