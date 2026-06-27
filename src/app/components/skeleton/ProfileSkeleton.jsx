"use client";

import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased pb-24">
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full md:w-auto">
            <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
            <div className="space-y-3 w-full sm:w-64 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="h-7 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse" />
              </div>
              <div className="h-4 w-48 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </div>

          <div className="w-full md:w-44 shrink-0">
            <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              </div>
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
              >
                <div className="space-y-2 w-full sm:w-auto">
                  <div className="h-5 w-full sm:w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                  <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                  <div className="h-6 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
