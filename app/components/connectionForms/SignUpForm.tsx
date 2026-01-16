"use client";

import { signUpAction } from "@/app/actions/connectionActions/signUpAction";
import { useState } from "react";

interface SignUpFormProps {
    emailFromParams?: string;
}

export const SignUpForm = ({ emailFromParams = "" }: SignUpFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            await signUpAction(formData);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-3 m-3 gap-1 border border-white">
            <label htmlFor="name">Nom d'artiste / nom de groupe</label>
            <input name="name" type="text" required />
            <label htmlFor="email">E-mail</label>
            <input 
                name="email" 
                type="email" 
                defaultValue={emailFromParams}
                required 
            />
            <label htmlFor="password">Mot de passe</label>
            <input name="password" type="password" required />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
        </form>
    );
};