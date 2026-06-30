import { getSession } from '@/lib/api-action';
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const { session, token } = await getSession();

    if (!session || !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }


}


export const config = {
    matcher: ['/dashboard/:path*', '/profile',],
}