"use client";
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

import { useSession } from "./auth-client";

export const useUserInfo = () => {
    const { data, isPending, refetch, error, update } = useSession();
    const session = data?.user || null;
    return { session, isPending, refetch, error, update };
};

export const uploadImageToImgbb = async (setImageUrl, formData, toast) => {
    if (IMGBB_API_KEY && IMGBB_API_KEY !== "YOUR_IMGBB_API_KEY") {
        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                },
            );
            const imgData = await response.json();

            if (imgData.success) {
                setImageUrl(imgData.data.url);
            } else {
                console.warn("Imgbb upload failed, using fallback image.");
            }
        } catch (imgError) {
            // ইমেজ আপলোড ফেইল করলেও যেন অ্যাপ ক্র্যাশ না করে ফলব্যাক ইমেজ নিয়ে সাবমিট হয়
            console.error("Imgbb Fetch Error:", imgError);
            toast.warning("Hosting limit / network issue", {
                description:
                    "Using default fallback vehicle image for this ticket.",
            });
        }
    } else {
        console.log(
            "No valid Imgbb key found. Proceeding with fallback image.",
        );
    }
}