import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000" || "https://chaloticket.vercel.app",
    plugins: [
        jwtClient()
    ]
})

export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google",
    });
    return data;
};

export const { signIn, signUp, useSession, signOut } = createAuthClient()