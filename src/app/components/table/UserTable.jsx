"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  ShieldAlert,
  Shield,
  Star,
  Mail,
  Ban,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { updateUserRole } from "@/lib/api-action";

const UserTable = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);

  const handleMakeAdmin = async (id, name) => {
    const result = await updateUserRole(id, { role: "admin" });
    console.log("Update result:", result);
    if (result) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: "admin" } : user,
        ),
      );
      toast.success(`${name} is now an Admin`);
    }
  };

  const handleMakeVendor = async (id, name) => {
    const result = await updateUserRole(id, { role: "vendor" });
    if (result) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: "vendor" } : user,
        ),
      );
      toast.success(`${name} is now a Vendor`);
    }
  };

  const handleMarkAsFraud = async (id, name, role) => {
    const result = await updateUserRole(id, { isFraud: true });
    if (result) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isFraud: true } : user,
        ),
      );
      toast.error(`${name} marked as FRAUD!`, {
        description: `This account's actions are now blocked and blacklisted.`,
      });
    }
  };

  const handleUnmarkFraud = async (id, name) => {
    const result = await updateUserRole(id, { isFraud: false });
    if (result) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isFraud: false } : user,
        ),
      );
      toast.success(`Fraud status removed for ${name}`, {
        description: "Account access privileges restored.",
      });
    }
  };

  const renderAvatar = (name, isFraud) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    return (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border select-none
        ${
          isFraud
            ? "bg-rose-100 text-rose-700 border-rose-200"
            : "bg-indigo-50 text-[#6367FF] border-indigo-100"
        }`}
      >
        {initials}
      </div>
    );
  };

  const getRoleBadge = (role, isFraud) => {
    if (isFraud)
      return (
        <Badge
          variant="destructive"
          className="bg-rose-600 text-white gap-1 animate-pulse"
        >
          <Ban className="w-3.5 h-3.5" /> Fraud Locked
        </Badge>
      );

    const badges = {
      admin: (
        <Badge className="bg-purple-50 text-purple-700 border border-purple-200 gap-1">
          <Shield className="w-3 h-3 text-purple-600" /> Admin
        </Badge>
      ),
      vendor: (
        <Badge className="bg-indigo-50 text-[#6367FF] border border-indigo-200 gap-1">
          <Star className="w-3 h-3 text-[#6367FF]" /> Vendor
        </Badge>
      ),
      traveler: (
        <Badge className="bg-slate-100 text-slate-600 border border-slate-200 gap-1">
          <UserCheck className="w-3 h-3 text-slate-500" /> User
        </Badge>
      ),
    };
    return badges[role];
  };

  return (
    <div>
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-600 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70 dark:bg-slate-700">
            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-600">
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 pl-6">
                Profile & Identity
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4">
                Account Type
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300 py-4 text-right pr-6">
                Access Control Options
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  className={`hover:bg-slate-50/40 transition-colors border-slate-100 dark:border-slate-600 ${user?.isFraud ? "bg-rose-50/20 dark:bg-rose-900/20" : ""}`}
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      {renderAvatar(user.name, user.isFraud)}
                      <div className="space-y-0.5">
                        <p
                          className={`text-sm font-bold ${user?.isFraud ? "text-rose-700 line-through dark:text-rose-400" : "text-slate-800 dark:text-slate-300"}`}
                        >
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-300 font-mono flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-300" />{" "}
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    {getRoleBadge(user.role, user?.isFraud)}
                  </TableCell>

                  <TableCell className="py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      {user?.isFraud ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnmarkFraud(user._id, user.name)}
                          className="border-slate-200 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 h-8 px-3 rounded-xl font-bold text-xs flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Unmark Fraud
                        </Button>
                      ) : (
                        <>
                          {user.role !== "admin" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleMakeAdmin(user._id, user.name)
                              }
                              className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-3 rounded-xl font-bold text-xs"
                            >
                              Make Admin
                            </Button>
                          )}

                          {user.role !== "vendor" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                handleMakeVendor(user._id, user.name)
                              }
                              className="bg-[#6367FF] hover:bg-[#5054E3] text-white h-8 px-3 rounded-xl font-bold text-xs"
                            >
                              Make Vendor
                            </Button>
                          )}

                          {user.role == "vendor" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleMarkAsFraud(
                                  user._id,
                                  user.name,
                                  user.role,
                                )
                              }
                              className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-8 px-3 rounded-xl font-bold text-xs flex items-center gap-1"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" /> Mark as
                              Fraud
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-slate-500 py-6"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="block md:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card
              key={user._id}
              className={`rounded-xl border-slate-100 dark:border-slate-600 shadow-sm overflow-hidden ${user.isFraud ? "bg-rose-50/30 border-rose-100" : "bg-white"}`}
            >
              <CardContent className="p-4 space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 max-w-[70%]">
                    {renderAvatar(user.name, user.isFraud)}
                    <div className="space-y-0.5 min-w-0">
                      <p
                        className={`text-sm font-bold ${user.isFraud ? "text-rose-700 line-through" : "text-slate-800"} truncate`}
                      >
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div>{getRoleBadge(user.role, user.isFraud)}</div>
                </div>

                <div className="pt-2 border-t border-slate-50 flex flex-col gap-2 w-full">
                  {user.isFraud ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUnmarkFraud(user._id, user.name)}
                      className="border-slate-200 text-slate-600 w-full h-9 font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />{" "}
                      Unmark Fraud Account
                    </Button>
                  ) : (
                    <>
                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          onClick={() => handleMakeAdmin(user._id, user.name)}
                          className="bg-purple-600 hover:bg-purple-700 text-white w-full h-9 font-bold text-xs"
                        >
                          Make Admin
                        </Button>
                      )}

                      {user.role !== "vendor" && (
                        <Button
                          size="sm"
                          onClick={() => handleMakeVendor(user._id, user.name)}
                          className="bg-[#6367FF] text-white w-full h-9 font-bold text-xs"
                        >
                          Make Vendor
                        </Button>
                      )}

                      {user.role !== "admin" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleMarkAsFraud(user._id, user.name, user.role)
                          }
                          className="border-rose-200 text-rose-600 hover:bg-rose-50 w-full h-9 font-bold text-xs"
                        >
                          Mark as Fraud
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-slate-500 py-6">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
