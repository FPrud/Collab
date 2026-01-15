"use client";

import { signUpAction } from "@/app/actions/connection/signUpAction";

export const SignUpForm = () => {

    return (
        <form action={signUpAction} id="signUpForm">
            <label htmlFor="name">Nom d'artiste / nom de groupe</label>
            <input name="name" type="text" required />
            <label htmlFor="email">E-mail</label>
            <input name="email" type="email" required />
            <label htmlFor="password">Choisissez un mot de passe</label>
            <input name="password" type="password" required/>
            <button type="submit">S'incrire</button>
        </form>
    );
};