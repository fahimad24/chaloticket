"use server";

import { toast } from "sonner";
import { headers } from "next/headers";
import { auth } from "./auth";

export const getSession = async () => {
    const result = await auth.api.getSession({
        headers: await headers()
    })
    const session = result?.session;
    const { userId, token } = session || {};
    return { userId, token, session };

}

export const getApiToken = async () => {
    const { token } = await auth.api.getToken(
        {
            headers: await headers()
        }
    );
    return token;
};




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

export const fetchAllTicketsSearch = async (from = "", to = "", transportType = "", sort = "") => {
    try {
        const baseUrl = `${API_BASE_URL}/api/tickets-search`;
        const params = new URLSearchParams();

        if (from) params.append("from", from);
        if (to) params.append("to", to);
        if (transportType) params.append("transportType", transportType);
        if (sort) params.append("sort", sort);

        const response = await fetch(`${baseUrl}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }

        return await response.json();
    } catch (error) {
        return [];
    }
};

// Fetch single ticket by ID
export const fetchTicketById = async (ticketId) => {
    const res = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`);
    const ticket = await res.json();
    return ticket;
};

// Fetch all users
export const fetchAllUsers = async () => {
    const token = await getApiToken();
    console.log("API Token:", token); // Log the token for debugging
    const res = await fetch(`${API_BASE_URL}/api/users`, { headers: { "Authorization": `Bearer ${token}` } });
    const users = await res.json();
    return users;
};

// Fetch all booked tickets for a specific user
export const fetchBookedTicketsByUserId = async (userId) => {
    const token = await getApiToken();
    const res = await fetch(`${API_BASE_URL}/api/booked-tickets/${userId}`, { headers: { "Authorization": `Bearer ${token}` }, cache: 'no-store' });
    const bookedTickets = await res.json();
    return bookedTickets;
};

// Fetch booked tickets for a specific ticket vendor  ID
export const fetchBookedTicketsByVendorId = async (vendorId) => {
    const token = await getApiToken();
    const res = await fetch(`${API_BASE_URL}/api/booked-tickets/vendor/${vendorId}`, { headers: { "Authorization": `Bearer ${token}` }, cache: 'no-store' });
    const bookedTickets = await res.json();
    return bookedTickets;
};

// ========== POST API functions ==========


// Create a new ticket
export const createTicket = async (ticketData) => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedData),
        });

        console.log("Update ticket response status:", response.status); // Log the response status for debugging

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw error;
    }
};

// user Role Update API
export const updateUserRole = async (userId, updatedData) => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/booked/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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

// Fetch total booked and tickets quantity for a specific ticket
export const fetchTotalTicketsQuantity = async () => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/total-qty`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch total booked and tickets quantity");
        }
        const result = await response.json();
        return result.ticketTotalQty;
    } catch (error) {
        console.error("Error fetching total booked and tickets quantity:", error);
        throw error;
    }
};

export const fetchTotalTicketsSold = async () => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/total-sold`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch total tickets sold");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching total tickets sold:", error);
        throw error;
    }
};

export const fetchTotalRevenue = async () => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/total-revenue`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch total revenue");
        }
        const result = await response.json();
        return result.totalRevenue;
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        throw error;
    }
};

// fetch monthly report data
export const fetchMonthlyReport = async () => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/monthly-report`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch monthly report");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching monthly report:", error);
        throw error;
    }
};

// fetch user booked tickets status by ticketId
export const fetchBookedTicketsStatus = async (ticketId, status) => {
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/booked/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    const token = await getApiToken();
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
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