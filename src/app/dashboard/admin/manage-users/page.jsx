import UserTable from "@/app/components/table/UserTable";
import { fetchAllUsers } from "@/lib/api-action";
import { Users } from "lucide-react";

export default async function ManageUsers() {
  const users = await fetchAllUsers();
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Users className="w-7 h-7 text-[#6367FF]" /> Manage Users
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor user accounts, manage vendor roles, and enforce global fraud
          protection policies.
        </p>
      </div>
      {/* USER TABLE */}

      <UserTable users={users} />
    </div>
  );
}
