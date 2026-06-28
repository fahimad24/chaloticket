import { fetchAllTickets } from "@/lib/api-action";
import TicketCard from "../(main)/components/card/TicketCard";

export default async function TicketsContainer() {
  let advertisementTickets = [];
  let latestTickets = [];

  try {
    advertisementTickets = await fetchAllTickets("", "", true);

    latestTickets = await fetchAllTickets("", "approved", "");
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-8 md:px-6 xl:px-0 md:py-12 lg:py-16">
      <section className="space-y-10">
        <div className="border-l-4 border-[#6367FF] pl-3 space-y-3">
          <h2 className="text-xl md:text-4xl font-bold text-slate-900 dark:text-slate-200">
            Featured Services
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Premium choices recommended by admin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisementTickets.length > 0 ? (
            advertisementTickets
              .slice(0, 6)
              .map((ticket) => (
                <TicketCard
                  key={ticket._id || ticket.id}
                  ticket={ticket}
                  isAdvertisement={true}
                />
              ))
          ) : (
            <p className="text-slate-500 dark:text-slate-300">
              No advertisement tickets available.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-10 mt-28">
        <div className="border-l-4 border-emerald-500 pl-3 space-y-3">
          <h2 className="text-xl md:text-4xl font-bold text-slate-900 dark:text-slate-200">
            Recently Added Tickets
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Latest transport routes updated live
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTickets.length > 0 ? (
            latestTickets
              .slice(0, 8)
              .map((ticket) => (
                <TicketCard
                  key={ticket._id || ticket.id}
                  ticket={ticket}
                  isAdvertisement={false}
                />
              ))
          ) : (
            <p className="text-slate-500 dark:text-slate-300">
              No latest tickets available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
