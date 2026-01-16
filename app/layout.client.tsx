"use client";

import { signOutAction } from "./actions/connectionActions/logOutAction";
import { SignInForm } from "./components/connectionForms/SignInForm";
import { useEffect, useState } from "react";

interface RootLayoutClientProps {
    isAuthenticated: boolean;
    userEmail?: string;
    userName?: string;
    userSession?: any;

}

export const RootLayoutClient = ({ isAuthenticated, userEmail, userName, userSession }: RootLayoutClientProps) => {
    const [mounted, setMounted] = useState(false);
    const [isAuth, setIsAuth] = useState(isAuthenticated);

    useEffect(() => {
        setMounted(true);
        setIsAuth(isAuthenticated);
    }, [isAuthenticated]);

    if (!mounted) {
        return null;
    }

    return (
        <div id="logOptions" className="flex justify-center">
            {isAuth ? (
                <form action={signOutAction}>
                    <button type="submit" className="px-4 py-2 border border-white rounded">
                        Déconnexion
                    </button>
                </form>
            ) : (
                <SignInForm />
            )}
        </div>
    );
};