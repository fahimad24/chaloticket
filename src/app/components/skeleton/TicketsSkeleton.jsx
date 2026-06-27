import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketsSkeleton() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8 text-center space-y-8">
        <div className="space-y-3 flex flex-col items-center">
          <Skeleton className="h-10 w-64 sm:h-12 sm:w-80 rounded-2xl" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>

        <div className="w-full rounded-3xl border border-slate-100 p-6 space-y-6 bg-white shadow-sm">
          <div className="flex gap-2 border-b border-slate-50 pb-4 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-xl shrink-0" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-10 rounded" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-10 rounded" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
            <div className="pt-5 md:pt-0">
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="h-10 w-full sm:w-44 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card
              key={index}
              className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-white"
            >
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-6 w-20 rounded-xl" />
                  <Skeleton className="h-6 w-24 rounded-xl" />
                </div>

                <Skeleton className="h-6 w-5/6 rounded-lg" />

                <div className="flex flex-wrap gap-1.5 min-h-6">
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>

                <div className="border-t border-dashed border-slate-100 pt-3 flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-6 w-20 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-28 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
