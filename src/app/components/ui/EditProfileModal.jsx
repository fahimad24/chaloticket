"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

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
import { fetchUserProfile, uploadImage } from "@/lib/api-action";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function EditProfileDialog({ session, refetch }) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    session?.image ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.id) return;

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const image = formData.get("image");

    setIsUpdating(true);
    try {
      let imageUploadUrl = imagePreview;

      if (image.size > 0) {
        imageUploadUrl = await uploadImage(image);
      }

      const { error } = await authClient.updateUser({
        name: name,
        image: imageUploadUrl,
      });

      if (error) {
        toast.error("Profile update failed. Please try again.");
        throw new Error(error.message);
      }
      toast.success("Profile updated successfully!");
      await refetch();
      setOpen(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isUpdating && setOpen(val)}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile Settings</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup className="items-center gap-4">
            <Field className="flex flex-col items-center justify-center gap-2 pb-2 w-50 h-60">
              <div className="relative w-50 h-50 rounded-xl overflow-hidden ring-4 ring-primary/10 group cursor-pointer">
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  className="object-cover"
                />
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isUpdating}
                  />
                </label>
              </div>
              <span className="text-[11px] text-muted-foreground text-center font-medium">
                Click to change avatar
              </span>
            </Field>

            <Field>
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                name="name"
                defaultValue={session?.name || ""}
                disabled={isUpdating}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                name="email"
                type="email"
                value={session?.email || ""}
                readOnly
                className="bg-muted text-muted-foreground cursor-not-allowed border-dashed focus-visible:ring-0"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <button
                type="button"
                variant="outline"
                disabled={isUpdating}
                className="min-w-27.5 px h-10 px-4 py-2 rounded-md bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isUpdating}
              className="min-w-27.5 px h-10 px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
