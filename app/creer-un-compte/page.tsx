"use client";

import { SignUpForm } from "@/app/components/connectionForms/SignUpForm";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
    const searchParams = useSearchParams();
    const emailFromParams = searchParams.get("email") || "";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl mb-8">Créer un compte</h1>
            <SignUpForm emailFromParams={emailFromParams} />
        </div>
    );
}