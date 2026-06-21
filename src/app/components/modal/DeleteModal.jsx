import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export function DeleteModal({ ticket, isRejected, handleDelete }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isRejected} // 👈 Rejected হলে ডিজেবলড থাকবে
          variant="destructive"
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 h-9 transition-all disabled:opacity-40 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this{" "}
            <span className="font-bold">{ticket.title}</span> ticket? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleDelete(ticket._id)} type="submit">
            <Trash2 className="w-3.5 h-3.5" /> Confirm delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
