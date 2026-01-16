"use server";

import { redirect } from "next/navigation";
import { auth } from "@/src/auth";

export const signUpAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name && !email && !password) {
        throw Error("Artist name, email and password are required");
    }

    const response = await auth.api.signUpEmail({
        body: {
            name: name,
            email: email,
            password: password,
        },
        asResponse: true,
    });
    if (!response.ok) {
        console.error("Sign in failed:", await response.json());
        redirect("/auth/signup?error=true");
    }
};
