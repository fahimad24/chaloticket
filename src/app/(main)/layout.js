import { Button } from "@heroui/react";
import Link from "next/link";
import { Navbar } from "../components/navbar/Navbar";
import Logo from "../components/ui/Logo";
import Footer from "../components/footer/Footer";

export const metadata = {
  title: "ChaloTicket",
  description: "A ticketing system for events and support.",
};

const Mainlayout = ({ children }) => {
  return <div>
    <Navbar
      brand={<Logo />}
      items={[
        { label: "Home", href: "/" },
        { label: "All Tickets", href: "/tickets" },
        { label: "About", href: "/about" },
      ]}
      rightContent={
        <div className="flex items-center gap-2 flex-1 justify-end">
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
        </div>
      }
    />
    {children}
    <Footer />
  </div>;
};

export default Mainlayout;
