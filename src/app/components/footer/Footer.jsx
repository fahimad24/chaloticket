import Link from "next/link";
import { Mail, Phone, CreditCard } from "lucide-react";
import { LogoFacebook } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="text-white font-black text-xl tracking-tight">
            Ticket<span className="text-[#6367FF]">Bari</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Book bus, train, launch & flight tickets easily
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/tickets"
                className="hover:text-white transition-colors"
              >
                All Tickets
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            Contact Info
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6367FF]" />
              <a
                href="mailto:support@ticketbari.com"
                className="hover:text-white transition-colors"
              >
                support@ticketbari.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#6367FF]" />
              <a
                href="tel:+880123456789"
                className="hover:text-white transition-colors"
              >
                +880 1234-56789
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LogoFacebook className="w-4 h-4 text-[#6367FF]" />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                TicketBari Page
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            Payment Methods
          </h4>
          <div className="flex flex-wrap gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-xs text-slate-200">
              <CreditCard className="w-4 h-4 text-[#6367FF]" />
              <span className="font-medium">Stripe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/20 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center md:text-left text-xs text-slate-500">
          <p>&copy; {currentYear} TicketBari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
