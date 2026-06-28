import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';


export async function POST(request) {
    const formData = await request.formData();
    const ticketId = formData.get('ticketId');
    const email = formData.get('email');

    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1TmGPNAEa8rxGhlnBbGf9Kqu',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/dashboard/user/my-bookings/success?session_id={CHECKOUT_SESSION_ID}&ticketId=${ticketId}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}