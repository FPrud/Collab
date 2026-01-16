"use server";

import { db } from "@/src/db";
import { user } from "@/src/schema";
import { eq } from "drizzle-orm";

export const checkEmail = async (email: string): Promise<boolean> => {
    try {
        const result = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        return result.length > 0;
    } catch (error) {
        console.error("Erreur lors de la vérification d'email :", error);
        throw error;
    }
};