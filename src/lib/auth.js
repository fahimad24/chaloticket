import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db('userInfo');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 1, // 1 days
        },
    },
    plugins: [
        jwt()
    ],
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: true,
                defaultValue: "traveler",
            },
            isFraud: {
                type: "boolean",
            }
        }
    }, hooks: {
        before: async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const body = ctx.body;

                const userRole = body.role || "traveler";

                if (userRole === "vendor") {
                    body.isFraud = false;
                } else if (userRole === "traveler") {
                    delete body.isFraud;
                }
            }
            return ctx;
        }
    }
});