import { Skeleton } from "@/components/ui/skeleton";

export default function TicketDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 md:px-6 mt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* BREADCRUMB SKELETON */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
          <Skeleton className="h-4 w-12" />
          <div className="h-1.5 w-1.5 bg-slate-300 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* MAIN LAYOUT SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              {/* IMAGE PLACEHOLDER */}
              <Skeleton className="h-64 md:h-96 w-full rounded-none" />

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  {/* Transport Type Badge */}
                  <Skeleton className="h-6 w-24 rounded-md" />
                  {/* Title */}
                  <Skeleton className="h-8 w-3/4 rounded-xl mt-4" />
                </div>

                {/* FROM / TO ROUTE BOX */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-200/60 pt-3 md:pt-0 md:pl-4">
                    <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* AMENITIES */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-7 w-28 rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WIDGET */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 space-y-6">
              {/* PRICE & AVAILABILITY */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-7 w-24" />
                </div>
                <div className="space-y-2 flex flex-col items-end">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>

              {/* COUNTDOWN */}
              <div className="space-y-2.5">
                <Skeleton className="h-3 w-28" />
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="rounded-xl h-14 w-full" />
                  ))}
                </div>
              </div>

              {/* DATE & TIME BOX */}
              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* BUTTON PLACEHOLDER */}
              <Skeleton className="w-full h-12 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
