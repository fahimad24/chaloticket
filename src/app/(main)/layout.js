import { Button } from "@heroui/react";
import Link from "next/link";
import { Navbar } from "../components/navbar/Navbar";
import Logo from "../components/ui/Logo";

export const metadata = {
  title: "ChaloTicket",
  description: "A ticketing system for events and support.",
};

const Mainlayout = ({ children }) => {
  return <div>
    <Navbar
      brand={
        <Link href="/" className="flex items-center gap-1.5 text-4xl font-black tracking-tight text-primary"> <Logo />
          <p className="text-primary font-bold tracking-tight">
            Chalo<span className="text-[#8494FF]">Ticket</span>
          </p>
        </Link>
      }
      items={[
        { label: "Home", href: "/" },
        { label: "All Tickets", href: "/tickets" },
        { label: "Dashboard", href: "/dashboard" },
      ]}
      rightContent={
        <>
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-primary hover:text-[#8494FF] transition-colors px-3 py-2"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="bg-primary hover:bg-[#8494FF] text-white font-bold text-sm px-5 py-2 rounded-xl shadow-md shadow-primary/10 transition-all"
          >
            Sign Up
          </Link>
        </>
      }
    />
    {children}</div>;
};

export default Mainlayout;
