"use client";

import { signInAction } from "@/app/actions/connectionActions/signInAction";
import { checkEmail } from "@/app/actions/connectionActions/checkEmail";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState("Connexion");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Valider le format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsButtonDisabled(!emailRegex.test(value));
        setButtonText("Connexion");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Vérifier si l'email existe
            const emailExists = await checkEmail(email);

            if (emailExists) {
                // Email existe, lancer la connexion
                const formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);
                await signInAction(formData);
            } else {
                // Email n'existe pas, rediriger vers inscription
                setButtonText("Créer un compte");
                router.push(`/creer-un-compte?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-3 m-3 gap-1 border border-white">
            <label htmlFor="email" hidden>E-mail</label>
            <input 
                id="email"
                name="email" 
                type="email" 
                placeholder="email" 
                value={email}
                onChange={handleEmailChange}
                required 
            />
            <label htmlFor="password" hidden>Mot de passe</label>
            <input 
                id="password"
                name="password" 
                type="password" 
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
            />
            <button 
                type="submit" 
                disabled={isButtonDisabled || isLoading}
                className="px-4 py-2 border border-white rounded disabled:opacity-50"
            >
                {isLoading ? "Vérification..." : buttonText}
            </button>
        </form>
    );
};