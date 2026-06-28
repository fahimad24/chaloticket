import { Ticket } from "lucide-react";
import MyBookingCard from "@/app/components/ui/MyBookingCard";
import { fetchBookedTicketsByUserId, getSession } from "@/lib/api-action";

export default async function MyBookedTickets() {
  const { userId } = await getSession();
  let bookings = [];
  try {
    bookings = await fetchBookedTicketsByUserId(userId);
  } catch (error) {
    console.error("Error fetching booked tickets:", error);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-primary tracking-tight flex items-center gap-2">
          <Ticket className="w-7 h-7 text-[#6367FF]" /> My Booked Tickets
        </h1>
        <p className="text-sm dark:text-slate-300 text-slate-500 mt-1">
          Manage, track count-downs, and make secure payments for your booked
          trips.
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((ticket) => {
            const isDeparturePassed =
              new Date(ticket.departureTime) < new Date();
            const canPay = ticket.status === "accepted" && !isDeparturePassed;

            return (
              <MyBookingCard
                key={ticket._id}
                ticket={ticket}
                isDeparturePassed={isDeparturePassed}
                canPay={canPay}
                session
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Ticket className="w-12 h-12 text-slate-400" />
          <p className="text-slate-500 dark:text-slate-300 text-sm">
            You haven&apos;t booked any tickets yet.
          </p>
        </div>
      )}
    </div>
  );
}
