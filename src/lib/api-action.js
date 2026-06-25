"use server";

import { toast } from "sonner";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getSession = async () => {
    const result = await auth.api.getSession({
        headers: await headers()
    })
    const session = result?.session;
    const { userId, token } = session || {};
    return { userId, token, session };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// ========= Upload API functions ==========
export const uploadImage = async (imageFile) => {
    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
            method: "POST",
            body: (() => {
                const imgForm = new FormData();
                imgForm.append("image", imageFile);
                return imgForm;
            })(),
        },
    );
    const data = await res.json();
    if (!res.ok) {
        toast.error(data.error.message || "Image upload failed");
    }
    return data.data.url;
}


// ========= GET API functions ==========

// Fetch all tickets
export const fetchAllTickets = async (email = "",
    verificationStatus = "", isAdvertisement = "") => {
    const res = await fetch(`${API_BASE_URL}/api/tickets?email=${email}&verificationStatus=${verificationStatus}&isAdvertised=${isAdvertisement}`);
    const tickets = await res.json();
    return tickets;
};

// Fetch single ticket by ID
export const fetchTicketById = async (ticketId) => {
    const res = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`);
    const ticket = await res.json();
    return ticket;
};

// Fetch all users
export const fetchAllUsers = async () => {
    const res = await fetch(`${API_BASE_URL}/api/users`);
    const users = await res.json();
    return users;
};

// Fetch all booked tickets for a specific user
export const fetchBookedTicketsByUserId = async (userId) => {
    const res = await fetch(`${API_BASE_URL}/api/booked-tickets/${userId}`, { cache: 'no-store' });
    const bookedTickets = await res.json();
    return bookedTickets;
};

// Fetch booked tickets for a specific ticket vendor  ID
export const fetchBookedTicketsByVendorId = async (vendorId) => {
    const res = await fetch(`${API_BASE_URL}/api/booked-tickets/vendor/${vendorId}`, { cache: 'no-store' });
    const bookedTickets = await res.json();
    return bookedTickets;
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



// ========== UPDATE API functions ==========

// Update a ticket by ID
export const updateTicket = async (ticketId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update ticket");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
};

// user Role Update API
export const updateUserRole = async (userId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("Failed to update user role");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw error;
    }
}

// fetch only user booked tickets
export const fetchUserBookedTickets = async (bookedData, ticketId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/booked/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bookedData }),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user booked tickets");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching user booked tickets:", error);
        throw error;
    }
};

// fetch user booked tickets status by ticketId
export const fetchBookedTicketsStatus = async (ticketId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/booked/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user booked tickets status");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching user booked tickets status:", error);
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