import SearchBar from "@/app/(main)/components/SearchBar";
import Image from "next/image";
import { redirect } from "next/navigation";

export function HeroSection() {
  // Server Action: এটি সরাসরি সার্ভারে রান করবে এবং ক্লায়েন্ট সাইড জাভাস্ক্রিপ্ট ছাড়াই কাজ করতে পারবে
  async function handleSearch(formData) {
    "use server";

    const transportType = formData.get("transportType") || "bus";
    const from = formData.get("from") || "";
    const to = formData.get("to") || "";
    const date = formData.get("date") || "";

    // সার্চ কুয়েরি সহ রেজাল্ট পেজে রিডাইরেক্ট করবে (সার্ভার সাইড সার্চ ট্রিগার হবে)
    // এনকোডিং ঠিক রেখে নাম বড় রাখতে চাইলে এভাবে লিখতে পারেন:
    redirect(
      `/search?transportType=${transportType}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`,
    );
  }

  return (
    <section className="relative w-full bg-white px-4 py-101">
      {/* ব্যাকগ্রাউন্ড ব্যানার ও গ্লো ইফেক্ট */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply filter blur-3xl">
        <div className="absolute top-[-10%] left-[5%] w-100 h-100 rounded-full bg-[#FFDBFD]" />
        <div className="absolute bottom-[-20%] right-[10%] w-125 h-125 rounded-full bg-[#C9BEFF]/50" />
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-90">
        <div className="relative w-full h-full">
          <Image
            src="/Images/Bannar.png"
            alt="Hero Banner"
            fill
            sizes=" "
            loading="eager"
            className="w-auto hidden lg:block h-48 md:h-64 object-cover"
          />
          <Image
            src="/Images/Bannar-tablet.png"
            alt="Hero Banner"
            fill
            sizes=" "
            loading="eager"
            className="w-auto lg:hidden max-md:hidden h-48 md:h-64 object-cover"
          />
          <Image
            src="/Images/Bannar-mobile.png"
            alt="Hero Banner"
            fill
            sizes=" "
            loading="eager"
            className="w-auto md:hidden h-48 md:h-64 object-cover"
          />
        </div>
      </div>

      {/* <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 bg-[#FFDBFD] text-[#6367FF] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
          Safe & Fast Ticket Booking
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          Find Your Next Journey with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6367FF] to-[#8494FF]">
            ChaloTicket
          </span>
        </h1>
        <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto mb-12">
          Book your bus, train, or plane tickets with ease. Fast, reliable, and
          secure ticketing for all your travel needs.
        </p>
      </div> */}

      {/* সার্ভার-সাইড সার্চ ফর্ম কন্টেইনার */}
      <div className="mx-auto max-w-5xl absolute left-1/2 transform -translate-x-1/2 w-full px-4 bottom-48 translate-y-1/2">
        <SearchBar handleSearch={handleSearch} />
      </div>
    </section>
  );
}
