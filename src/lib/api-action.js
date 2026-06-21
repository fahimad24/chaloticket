"use server";
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;


// ========== Image Upload API Action Functions ==========

export const uploadImageToImgbb = async (imageUrl, formData, toast) => {
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
                imageUrl = imgData.data.url;
            } else {
                console.warn("Imgbb upload failed, using fallback image.");
            }
        } catch (imgError) {
            // ইমেজ আপলোড ফেইল করলেও যেন অ্যাপ ক্র্যাশ না করে ফলব্যাক ইমেজ নিয়ে সাবমিট হয়
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


// ========= GET API functions ==========

// Fetch all tickets
export const fetchAllTickets = async (email) => {
    const res = await fetch(`${API_BASE_URL}/api/tickets?email=${email}`);
    const tickets = await res.json();
    return tickets;
};


// ========== POST API functions ==========


// Create a new ticket
export const createTicket = async (ticketData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error("Failed to create ticket");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

// ========== DELETE API functions ==========

// Delete a ticket by ID
export const deleteTicket = async (ticketId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete ticket");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting ticket:", error);
        throw error;
    }
}