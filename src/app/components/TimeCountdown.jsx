"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function TicketCountdown({ departureTime, status }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // যদি রিজেক্টেড হয়, টাইমার রেন্ডারই হবে না (Requirement Rule)
    if (status === "rejected") return;

    const calculateTime = () => {
      const difference = +new Date(departureTime) - +new Date();

      if (difference <= 0) {
        setTimeLeft("Departure Passed");
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [departureTime, status]);

  if (status === "rejected") return null;

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 justify-center
      ${isExpired ? "text-rose-500 bg-rose-50" : "text-[#6367FF] bg-[#6367FF]/5"}`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>{timeLeft}</span>
    </div>
  );
}
