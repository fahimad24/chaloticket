import { ArrowRight, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CTAAction() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-16 shadow-xl rounded-3xl sm:px-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-900),var(--color-slate-950))] opacity-80" />
        <div
          className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-1200/600 w-240 bg-linear-to-tr from-[#6367FF] to-[#80caff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="max-w-xl text-center lg:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-slate-300 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-[#6367FF]" />
            <span>100% Verified Digital Tickets</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ready to Book Your <br />
            Next Journey?
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-400">
            Get instant access to thousands of routes across the country. Secure
            your seats today with our hassle-free booking system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
          <Link
            href="/tickets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6367FF] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-[#5054e3] transition-all active:scale-[0.98]"
          >
            <span>Book Ticket Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/tickets"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-6 py-4 text-sm font-bold text-slate-200 hover:bg-slate-700 border border-slate-700/50 transition-all active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>View Schedule</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
