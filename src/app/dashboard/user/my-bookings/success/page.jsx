import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  ArrowRight,
  Home,
  Calendar,
  Hash,
  Tag,
  Layers,
} from "lucide-react";
import { stripe } from "@/lib/stripe";
import { fetchBookedTicketsStatus } from "@/lib/api-action";

export default async function Success({ searchParams }) {
  const { session_id, ticketId } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  // ১. সম্পূর্ণ সেশন অবজেক্টটি রিট্রিভ করা হলো
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const {
    status,
    customer_details,
    line_items,
    amount_total,
    payment_intent,
    created,
  } = session;

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

  // ২. ডাইনামিক ডেটাগুলো সেফলি এক্সট্রাক্ট করা হলো
  const firstItem = line_items?.data?.[0];
  const productName = firstItem?.description || "Ticket Route";
  const quantity = firstItem?.quantity || 1;
  const totalPrice = (amount_total || 0) / 100;
  const transactionId =
    typeof payment_intent === "object" ? payment_intent?.id : payment_intent;

  // ডেট ও টাইম ফরম্যাট করা
  const paymentDateTime = created
    ? new Date(created * 1000).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  if (status === "complete") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background p-4 md:p-6">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-600 shadow-2xl shadow-slate-100/60 dark:shadow-slate-800/60 rounded-3xl p-6 md:p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 dark:text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-12 h-12" strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
              We appreciate your business!
            </p>
          </div>

          {/* 🌟 নতুন যোগ করা ডাইনামিক পেমেন্ট রিসিট সেকশন */}
          <div className="bg-slate-50/60 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-left text-xs space-y-3">
            <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100 dark:border-slate-700 pb-1.5">
              Payment Summary
            </p>

            <div className="flex items-start justify-between gap-4">
              <span className="text-slate-400 flex items-center gap-1 shrink-0">
                <Tag className="w-3.5 h-3.5" /> Product:
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200 text-right line-clamp-1">
                {productName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Quantity:
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {quantity} {quantity > 1 ? "Tickets" : "Ticket"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                ৳ Price Paid:
              </span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                ৳ {totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-dashed border-slate-200 dark:border-slate-700 pt-2.5">
              <span className="text-slate-400 flex items-center gap-1 shrink-0">
                <Hash className="w-3.5 h-3.5" /> Txn ID:
              </span>
              <span className="font-mono font-bold text-slate-600 dark:text-slate-300 select-all break-all text-[11px]">
                {transactionId || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date & Time:
              </span>
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {paymentDateTime}
              </span>
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/dashboard/user/my-bookings"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#6367FF] hover:bg-[#5054e6] text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-lg active:scale-95"
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
