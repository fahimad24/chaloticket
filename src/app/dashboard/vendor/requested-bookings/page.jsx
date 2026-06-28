import RequestedBookingTable from "@/app/components/table/RequestedBookingTable";
import { fetchBookedTicketsByVendorId, getSession } from "@/lib/api-action";
import { Inbox } from "lucide-react";

// ─── ১. ডেমো বুকিং রিকোয়েস্ট ডাটা ───

export default async function RequestedBookings() {
  const { userId } = await getSession();
  let bookingRequests = [];
  try {
    const result = await fetchBookedTicketsByVendorId(userId);
    bookingRequests = result || [];
  } catch (error) {
    console.error("Error fetching booking requests:", error);
  }

  console.log("Fetched booking requests:", bookingRequests);
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-primary tracking-tight flex items-center gap-2">
          <Inbox className="w-7 h-7 text-[#6367FF]" /> Requested Bookings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review, accept, or decline passenger booking requests for your listed
          active routes.
        </p>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-600 shadow-sm overflow-hidden">
        <RequestedBookingTable bookingRequests={bookingRequests} />
      </div>
    </div>
  );
}
