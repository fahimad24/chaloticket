import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight, Home } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { fetchBookedTicketsStatus } from "@/lib/api-action";

export default async function Success({ searchParams }) {
  const { session_id, ticketId } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, customer_details } = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ["line_items", "payment_intent"],
    },
  );

  if (status === "complete") {
    const result = await fetchBookedTicketsStatus(ticketId, "paid");
    if (result) {
      console.log("Booking status updated to 'paid' for session:", ticketId);
    } else {
      console.error(
        "Failed to update booking status to 'paid' for session:",
        ticketId,
      );
    }
  }

  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background p-4 md:p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-600 shadow-2xl shadow-slate-100/60 dark:shadow-slate-800/60 rounded-3xl p-6 md:p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 dark:text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
            </div>
          </div>

          {/* Header Typography */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
              We appreciate your business!
            </p>
          </div>

          {/* Confirmation Box */}
          <div className="bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-2xl p-4 flex items-start gap-3 text-left">
            <Mail className="w-5 h-5 text-[#6367FF] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Confirmation Email Sent
              </p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 break-all">
                {customerEmail || "your email address"}
              </p>
            </div>
          </div>

          {/* Support Information */}
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-[#6367FF] font-semibold hover:underline transition-all"
            >
              orders@example.com
            </a>
          </p>

          <hr className="border-slate-100 dark:border-slate-600" />

          {/* Call to Actions (CTA) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/dashboard/user/my-bookings"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#6367FF] hover:bg-[#5054e6] text-white  text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-lg active:scale-95"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
