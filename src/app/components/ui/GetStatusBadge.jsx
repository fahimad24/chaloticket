import { Badge } from "@/components/ui/badge";

export const GetStatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    accepted: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    rejected: "bg-rose-100 text-rose-700 hover:bg-rose-100",
    paid: "bg-[#FFDBFD] text-[#6367FF] border border-[#6367FF]/20 hover:bg-[#FFDBFD]",
  };
  return (
    <Badge
      className={`capitalize px-3 py-1 rounded-full font-medium ${styles[status]}`}
    >
      {status}
    </Badge>
  );
};
