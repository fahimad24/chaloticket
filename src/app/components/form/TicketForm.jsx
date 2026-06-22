"use client";

import React, { useState } from "react";
import {
  MapPin,
  Layers,
  Calendar,
  CheckSquare,
  UploadCloud,
  User,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  createTicket,
  updateTicket,
  uploadImage,
  uploadImageToImgbb,
} from "@/lib/api-action";
import { cn } from "@/lib/utils";

const AVAILABLE_PERKS = [
  { id: "ac", label: "Air Conditioned (AC)" },
  { id: "breakfast", label: "Complimentary Breakfast" },
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "blanket", label: "Pillow & Blanket" },
  { id: "charging", label: "USB Charging Port" },
];

const TicketForm = ({ ticketData }) => {
  const [imageFile, setImageFile] = useState(null);
  const [selectedPerks, setSelectedPerks] = useState(ticketData?.perks || []);

  const [isPending, setIsPending] = useState(ticketData ? false : true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handlePerkChange = (perkLabel) => {
    setSelectedPerks((prev) =>
      prev.includes(perkLabel)
        ? prev.filter((item) => item !== perkLabel)
        : [...prev, perkLabel],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const fromLocation = formData.get("from");
    const toLocation = formData.get("to");
    const image = formData.get("image");
    const transportType = formData.get("transportType");
    const price = formData.get("price");
    const quantity = formData.get("quantity");
    const departureDateTime = formData.get("departure");

    setIsSubmitting(true);
    setUploadProgress("Uploading image to Imgbb...");

    let imageUrl = null;

    try {
      // অ্যাকচুয়াল আপলোড কোড ব্লক (API key থাকলে আনকমেন্ট করবেন)
      console.log("Image file to upload:", image.size);
      if (image.size) {
        const imagedata = await uploadImage(image);
        if (imagedata) {
          imageUrl = imagedata;
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Image upload failed. Please try again.");
        }
      }
      setUploadProgress("Saving ticket to database...");

      // ২. ফাইনাল পে-লোড যা ডাটাবেজে সেভ হবে
      const ticketPayload = {
        title,
        from: fromLocation,
        to: toLocation,
        transportType,
        price: Number(price),
        quantity: Number(quantity),
        departureTime: departureDateTime,
        perks: selectedPerks,
        image: imageUrl || ticketData?.image,
      };

      const result = await updateTicket(ticketData._id, ticketPayload);

      if (result) {
        setUploadProgress("");
        setIsSubmitting(false);
        toast.success(
          "Ticket updated successfully! Redirecting to My Tickets page...",
        );
      } else {
        toast.error("Failed to update ticket. Please try again.");
      }
      console.log("Final ticket payload:", imageUrl);
    } catch (error) {
      toast.error("Upload error:", error);
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <Skeleton className="h-10 w-1/3 rounded-lg" />
        <Card className="border-slate-100">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden bg-linear-to-r from-primary/25 to-secondary p-0">
        <CardHeader className="bg-surface/70 border-b border-slate-50 p-6">
          <CardTitle className="text-lg text-slate-800">
            Ticket Information Form
          </CardTitle>
          <CardDescription>
            Fill out details carefully. Fields marked with state lock cannot be
            edited.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* ─── READONLY VENDOR SECTIONS ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#6367FF]/20 border border-[#6367FF]/10">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <User className="w-3 h-3" /> Vendor Creator (Read-Only)
              </Label>
              <Input
                value={ticketData?.vendorName || ""}
                name="vendorName"
                readOnly
                className="bg-gray-100/80 font-medium text-neutral-500 cursor-not-allowed border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Mail className="w-3 h-3" /> Vendor Email (Read-Only)
              </Label>
              <Input
                value={ticketData?.vendorEmail || ""}
                name="vendorEmail"
                readOnly
                className="bg-gray-100/80 font-medium text-neutral-500 cursor-not-allowed border-slate-200"
              />
            </div>
          </div>

          {/* ─── TICKET TITLE ─── */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold text-slate-700">
              Ticket Title / Route Name
            </Label>
            <div className="relative flex items-center">
              <Sparkles className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                id="title"
                name="title"
                defaultValue={ticketData?.title || ""}
                required
                placeholder="e.g., Hanif Enterprise - Dhaka to Cox's Bazar Multi-Axle Sleeper"
                className="pl-9 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
              />
            </div>
          </div>

          {/* ─── FROM & TO LOCATIONS ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from" className="font-semibold text-slate-700">
                From (Departure Location)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-rose-500" />
                <Input
                  id="from"
                  name="from"
                  defaultValue={ticketData?.from || ""}
                  required
                  placeholder="e.g., Dhaka"
                  className="pl-9 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to" className="font-semibold text-slate-700">
                To (Destination Location)
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-emerald-500" />
                <Input
                  id="to"
                  defaultValue={ticketData?.to || ""}
                  required
                  placeholder="e.g., Cox's Bazar"
                  name="to"
                  className="pl-9 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* ─── TRANSPORT TYPE, PRICE, QUANTITY ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="transportType"
                className="font-semibold text-slate-700"
              >
                Transport Type
              </Label>
              <select
                id="transportType"
                name="transportType"
                defaultValue={ticketData?.transportType || ""}
                className="flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#6367FF] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Bus">🚌 Bus</option>
                <option value="Train">🚂 Train</option>
                <option value="Ship">🚢 Launch/Ship</option>
                <option value="Air">✈️ Air/Flight</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="font-semibold text-slate-700">
                Price (Per Unit ৳)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">
                  ৳
                </span>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  required
                  min="1"
                  placeholder="1200"
                  defaultValue={ticketData?.price || ""}
                  className="pl-7 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="quantity"
                className="font-semibold text-slate-700"
              >
                Ticket Quantity
              </Label>
              <div className="relative">
                <Layers className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="quantity"
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  placeholder="40"
                  className="pl-9 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
                  defaultValue={ticketData?.quantity || ""}
                />
              </div>
            </div>
          </div>

          {/* ─── DEPARTURE DATE & TIME ─── */}
          <div className="space-y-2 w-full">
            <Label htmlFor="departure" className="font-semibold text-slate-700">
              Departure Date & Time
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[#6367FF]" />
              <Input
                id="departure"
                type="datetime-local"
                name="departure"
                required
                className="pl-9 bg-white/80 focus-visible:ring-[#6367FF] rounded-xl"
                defaultValue={ticketData?.departureTime}
              />
            </div>
          </div>

          {/* ─── PERKS (CHECKBOXES) ─── */}
          <div className="space-y-3 pt-2">
            <Label className="font-semibold text-slate-700 flex items-center gap-1">
              <CheckSquare className="w-4 h-4 text-[#6367FF]" /> Select Trip
              Perks / Amenities
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_PERKS.map((perk) => (
                <div
                  key={perk.id}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors bg-white/80"
                >
                  <Checkbox
                    id={perk.id}
                    name="perks"
                    checked={selectedPerks.includes(perk.label)}
                    onCheckedChange={() => handlePerkChange(perk.label)}
                    className="data-[state=checked]:bg-[#6367FF] data-[state=checked]:border-[#6367FF] border-primary"
                  />
                  <label
                    htmlFor={perk.id}
                    className="text-xs font-medium text-slate-600 cursor-pointer select-none"
                  >
                    {perk.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* ─── IMAGE UPLOAD (IMGBB SELECTOR) ─── */}
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Route / Transport Image
            </Label>
            <div className="border-2 border-dashed border-slate-200 hover:border-[#6367FF]/50 rounded-2xl p-6 transition-colors text-center bg-slate-50/50 relative">
              <Input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
                <div className="text-sm font-medium text-slate-700">
                  {imageFile ? (
                    <span className="text-[#6367FF] font-semibold">
                      {imageFile.name}
                    </span>
                  ) : (
                    "Click to upload transport image"
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Supports PNG, JPG or WEBP. Image automatically hosted via
                  Imgbb API.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        {/* ─── FOOTER SUBMIT ACTIONS ─── */}
        <CardFooter className="bg-slate-50/50 border-t border-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium text-center sm:text-left">
            {uploadProgress || "Ready to submit route to verification process."}
          </span>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#6367FF] hover:bg-[#8494FF] text-white px-8 py-5 rounded-xl font-semibold shadow-md shadow-[#6367FF]/20 flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Update Ticket <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TicketForm;
