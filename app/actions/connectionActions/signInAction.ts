"use server";

import { redirect } from "next/navigation";
import { auth } from "@/src/auth";

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email && !password) {
        throw Error("email and password are required");
    }
    const response = await auth.api.signInEmail({
        body: {
            email,
            password
        },
        asResponse: true
    })
    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/creer-un-compte");
    }
}