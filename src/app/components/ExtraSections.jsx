import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Clock,
  Percent,
  Headphones,
  Search,
  CreditCard,
} from "lucide-react";

export default function ExtraSections() {
  return (
    <div className="space-y-24 py-16 bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold text-[#6367FF] tracking-wider px-3 py-1 bg-indigo-50 rounded-md inline-block">
            Core Features
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-200 tracking-tight">
            Why Choose Chalo Ticket?
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We provide the ultimate ticketing experience with modern security
            and lightning-fast processing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow dark:bg-accent bg-slate-50/50 rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#6367FF]">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">
                  Secure Checkout
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your profile and transactions are protected with
                  industry-standard secure authentication.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow dark:bg-accent bg-slate-50/50 rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">
                  Instant Booking
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  No more waiting in long counter lines. Get your digital ticket
                  instantly in less than a minute.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow dark:bg-accent bg-slate-50/50 rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Percent className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">
                  Zero Hidden Fees
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  What you see is what you pay. Transparent pricing with no
                  extra middleman charges.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow dark:bg-accent bg-slate-50/50 rounded-3xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">
                  24/7 Support
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  Our dedicated customer care center is always active to assist
                  your journey issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50  dark:bg-linear-120 from-primary to-secondary py-16 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase font-extrabold text-[#6367FF] tracking-wider px-3 py-1 bg-indigo-50 rounded-md inline-block">
              Easy Process
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-200 tracking-tight">
              How To Book Your Ticket
            </h2>
            <p className="text-sm dark:text-slate-300 text-slate-500 max-w-md mx-auto">
              Follow these three simple steps to secure your destination seat
              effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200/60 shadow-sm flex items-center justify-center text-xl font-black text-[#6367FF]">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1 px-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  1. Search Route
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enter your departure point, destination, preferred date, and
                  choose your transport type.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200/60 shadow-sm flex items-center justify-center text-xl font-black text-[#6367FF]">
                <span className="text-base font-bold">02</span>
              </div>
              <div className="space-y-1 px-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  2. Select Your Seat
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-300 leading-relaxed">
                  Pick your preferred available seats from the live fleet layout
                  widget and verify quantity.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white border border-slate-200/60 shadow-sm flex items-center justify-center text-xl font-black text-[#6367FF]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="space-y-1 px-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                  3. Pay & Download
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-300 leading-relaxed">
                  Complete the payment gateway seamlessly and download your
                  digital ticket instantly.
                </p>
              </div>
            </div>

            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 border-t border-dashed border-slate-300 z-0" />
          </div>
        </div>
      </section>
    </div>
  );
}
