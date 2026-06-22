import { KanbanSquare } from "lucide-react";

import TicketTable from "@/app/components/table/TicketTable";
import { fetchAllTickets } from "@/lib/api-action";

export default async function ManageTickets() {
  let tickets = [];
  try {
    const data = await fetchAllTickets("");
    tickets = data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
  console.log("Fetched tickets:", tickets); // Log the fetched tickets for debugging
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <KanbanSquare className="w-7 h-7 text-[#6367FF]" /> Manage Tickets
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review transport listings submitted by registered vendors. Approved
          routes go live instantly.
        </p>
      </div>

      {/* TICKET MODERATION TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-270">
        <TicketTable allTickets={tickets} />
      </div>
    </div>
  );
}
