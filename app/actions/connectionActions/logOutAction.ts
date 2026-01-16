"use server";

import { auth } from "@/src/auth";
import { headers } from "next/headers";

export const signOutAction = async () => {
    await auth.api.signOut({ headers: await headers() });
};