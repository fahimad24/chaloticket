"use client";
import { useState } from "react";
import { cn } from "@heroui/react"; // or your cn utility
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@heroui/react";
import { useUserInfo } from "@/lib/user-action";

import { Profile } from "../ui/profile";
const maxWidthClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
  "2xl": "max-w-[1536px]",
  full: "max-w-full",
};

export function Navbar({
  brand,
  items,
  rightContent,
  className,
  maxWidth = "xl",
  position = "fixed",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { session, isPending } = useUserInfo();

  return (
    <nav
      className={cn(
        "z-40 w-full bg-transparent ",
        position === "sticky" && "sticky top-6",
        position === "fixed" && "fixed top-6",
        className,
      )}
    >
      <header
        className={cn(
          "flex h-16 items-center justify-center px-6 rounded-full border-b border-accent/30 bg-surface/50 backdrop-blur-sm transition-all duration-300",
          maxWidth !== "full" && maxWidthClasses[maxWidth],
          "mx-auto",
        )}
      >
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-4 flex-1">
          <button
            className="text-slate-600 hover:text-primary transition-colors md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {brand}
        </div>

        {/* Center Side: Navigation Items */}
        <ul className="hidden items-center gap-2 flex-1 md:flex justify-center">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-600 hover:text-primary hover:bg-secondary/20",
                  item.href === pathname &&
                    "font-bold text-primary bg-secondary/50",
                )}
                aria-current={item.href === pathname ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Action Buttons / Avatar */}
        {rightContent && (
          <div className="hidden items-center justify-end gap-4 md:flex flex-1">
            {isPending ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-gray-400" />
              </div>
            ) : session ? (
              <Profile session={session} />
            ) : (
              rightContent
            )}
          </div>
        )}
      </header>

      {/* Mobile Responsive Drawer */}
      {isMenuOpen && (
        <div className="border-t border-accent/20 bg-white md:hidden animate-fade-in">
          <ul className="flex flex-col gap-1 p-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-2.5 rounded-xl text-base font-medium text-slate-600 transition-all",
                    item.href === pathname &&
                      "font-bold text-primary bg-surface/50",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {rightContent && (
              <li className="mt-4 flex flex-col gap-2 border-t border-accent/20 pt-4 px-2">
                {rightContent}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
