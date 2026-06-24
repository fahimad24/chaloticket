import { fetchAllTickets } from "@/lib/api-action";
import TicketCard from "../(main)/components/card/TicketCard";

export default async function TicketsContainer() {
  let advertisementTickets = [];
  let latestTickets = [];

  // Fetch tickets from the API
  try {
    advertisementTickets = await fetchAllTickets("", "", true);

    latestTickets = await fetchAllTickets("", "approved", "");
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }

  console.log("Advertisement Tickets:", advertisementTickets);
  console.log("Latest Tickets:", latestTickets);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
      {/* 1. ADVERTISEMENT SECTION */}
      <section className="space-y-4">
        <div className="border-l-4 border-[#6367FF] pl-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Featured Services
          </h2>
          <p className="text-xs text-slate-500">
            Premium choices recommended by admin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisementTickets.slice(0, 6).map((ticket) => (
            <TicketCard
              key={ticket._id || ticket.id}
              ticket={ticket}
              isAdvertisement={true} // এডভারটাইজমেন্ট অন করা হলো
            />
          ))}
        </div>
      </section>

      {/* 2. LATEST TICKETS SECTION */}
      <section className="space-y-4">
        <div className="border-l-4 border-emerald-500 pl-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Recently Added Tickets
          </h2>
          <p className="text-xs text-slate-500">
            Latest transport routes updated live
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTickets.slice(0, 8).map((ticket) => (
            <TicketCard
              key={ticket._id || ticket.id}
              ticket={ticket}
              isAdvertisement={false} // সাধারণ লেটেস্ট টিকিট কার্ড
            />
          ))}
        </div>
      </section>
    </div>
  );
}
