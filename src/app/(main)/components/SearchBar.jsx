import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="w-full  rounded-3xl shadow-[0_20px_50px_rgba(99,103,255,0.12)] border border-[#C9BEFF]/40 p-6 md:p-8 text-left backdrop-blur-lg bg-white/80">
      <form action={handleSearch} className="space-y-6">
        <div className="flex gap-4 border-b border-slate-100 pb-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="transportType"
              value="bus"
              defaultChecked
              className="w-4 h-4 text-[#6367FF] focus:ring-[#6367FF] border-[#C9BEFF]"
            />
            <span className="text-sm font-bold text-slate-700 group-hover:text-[#6367FF] transition-colors flex items-center gap-1">
              🚌 Bus
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="transportType"
              value="train"
              className="w-4 h-4 text-[#6367FF] focus:ring-[#6367FF] border-[#C9BEFF]"
            />
            <span className="text-sm font-bold text-slate-700 group-hover:text-[#6367FF] transition-colors flex items-center gap-1">
              🚄 Train
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="transportType"
              value="plane"
              className="w-4 h-4 text-[#6367FF] focus:ring-[#6367FF] border-[#C9BEFF]"
            />
            <span className="text-sm font-bold text-slate-700 group-hover:text-[#6367FF] transition-colors flex items-center gap-1">
              ✈️ Plane
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                name="from"
                placeholder="Enter departure city"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                name="to"
                placeholder="Enter destination"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Journey Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium focus:outline-none focus:border-[#6367FF] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-4 bg-[#6367FF] hover:bg-[#8494FF] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#6367FF]/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search Tickets
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
