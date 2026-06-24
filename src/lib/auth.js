import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.DATABASE_URL);
const db = client.db('userInfo');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
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