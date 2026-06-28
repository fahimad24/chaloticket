import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Clock } from "lucide-react";

export const GetStatusBadges = ({ status }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200 gap-1",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200 gap-1",
    rejected: "bg-rose-50 text-rose-700 border-rose-200 gap-1",
  };

  const icons = {
    pending: <Clock className="w-3 h-3 animate-spin text-amber-500" />,
    approved: <CheckCircle2 className="w-3 h-3 text-emerald-500" />,
    rejected: <XCircle className="w-3 h-3 text-rose-500" />,
  };

  if (status || styles[status]) {
    return (
      <Badge
        variant="outline"
        className={`capitalize px-2.5 py-1 rounded-md font-semibold text-xs ${styles[status]}`}
      >
        {icons[status]} {status}
      </Badge>
    );
  }
};
