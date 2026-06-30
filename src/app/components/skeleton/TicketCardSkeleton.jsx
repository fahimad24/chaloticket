import { Skeleton } from "@/components/ui/skeleton";

export default function TicketCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-slate-100 dark:border-slate-700 bg-accent overflow-hidden shadow-sm">
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        <div className="py-0.5">
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-6">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>

        <div className="border-t border-dashed border-slate-100 dark:border-slate-700 pt-3 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          <Skeleton className="w-28 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
