import { PlusCircle } from "lucide-react";

import { toast } from "sonner";
import { fetchTicketById } from "@/lib/api-action";
import TicketForm from "@/app/components/form/TicketForm";

export default async function UpdateTicketPage({ params }) {
  const { ticketId } = await params;

  let ticketData = null;
  try {
    ticketData = await fetchTicketById(ticketId);
  } catch (error) {
    toast.error("Error fetching ticket data:", error);
    // Handle error state if needed
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <PlusCircle className="w-7 h-7 text-[#6367FF]" /> Update Ticket Route
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update your transport ticket listing. It will be live on the platform
          once approved by administrators.
        </p>
      </div>
      <div>
        {!ticketData ? (
          <p className="text-slate-700">Ticket data not found.</p>
        ) : (
          <TicketForm ticketData={ticketData} />
        )}
      </div>
    </div>
  );
}
