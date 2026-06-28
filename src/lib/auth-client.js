import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_URL || "https://chaloticket.vercel.app",
    plugins: [
        jwtClient()
    ]
})

export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
    });
};

export const { signIn, signUp, useSession, signOut } = createAuthClient()