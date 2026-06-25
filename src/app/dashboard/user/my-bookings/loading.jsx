import { Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Ticket className="w-7 h-7 text-[#6367FF]" /> My Booked Tickets
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage, track count-downs, and make secure payments for your booked
          trips.
        </p>
      </div>

      {/* SKELETON LOADER (ডেটা লোড হওয়ার আগ পর্যন্ত এটি অটোমেটিক শো করবে) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="rounded-2xl overflow-hidden border-slate-100"
          >
            <Skeleton className="h-44 w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
