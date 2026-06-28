import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { action, ticketUpdated, deleteTicket, isAdvertised, verificationStatus } = await request.json().catch((error) => {
            console.error("Error parsing JSON:", error);
            throw new Error("Invalid JSON");
        });

        console.log("Revalidation request received:", { action, });

        if (action === "added-ticket") {
            revalidatePath("/dashboard/admin/manage-tickets");
            revalidatePath("/dashboard/vendor/my-added-tickets");
            return NextResponse.json({ message: "Revalidation successful." });
        }


        if (deleteTicket === "delete-ticket" || ticketUpdated === "ticket-updated" || verificationStatus === "success") {
            revalidatePath("/");
            revalidatePath("/dashboard/profile");
            revalidatePath("/tickets");
            revalidatePath("/dashboard/admin/manage-tickets");
            revalidatePath("/dashboard/vendor/my-added-tickets");
            revalidatePath("/dashboard/admin/advertise-tickets");
            return NextResponse.json({ message: "Revalidation successful." });
        }

        if (isAdvertised === "isAdvertised") {
            revalidatePath("/");
            revalidatePath("/tickets");
            return NextResponse.json({ message: "Revalidation successful." });
        }

        if (verificationStatus === "success") {
            revalidatePath("/");
            revalidatePath("/dashboard/admin/manage-tickets");
            revalidatePath("/dashboard/vendor/my-added-tickets");
            revalidatePath("/tickets");
            revalidatePath("/dashboard/profile");
            return NextResponse.json({ message: "Revalidation successful." });
        }

        return NextResponse.json({
            revalidated: true,
            action: action,
            ticketUpdated: ticketUpdated,
            deleteTicket: deleteTicket,
            isAdvertised: isAdvertised,
            verificationStatus: verificationStatus,
        });
    } catch (error) {
        console.error("Error during revalidation:", error);
        return NextResponse.json(
            { message: "Unknown action." },
            { status: 400 }
        );
    }
}   