import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/src/auth";
import { headers } from "next/headers";
import { signUpAction } from "./actions/connectionActions/signUpAction";
import { signInAction } from "./actions/connectionActions/signInAction";

export const metadata: Metadata = {
  title: "Collab'",
  description: "Collab est un site qui vise les musiciens amateurs pour leur permettre de se constituer un réseau. La fonction principale de cette plateforme est la possibilité de poster une annonce pour chercher un.e musicien.ne avec leaquel.le collaborer sur un projet de titre, EP commun ou même de se constituer en groupe.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html lang="en">
      <body className="flex flex-col antialiased bg-white font-sans dark:bg-black">
        <nav id="navbar" className="flex flex-col m-5 justify-center">

          <Link href="/" className="flex self-center"><div id="logo" className="border border-white justify-center p-5"><h2 className="text-4xl">Collab'</h2></div></Link>

          <div id="logOptions" className="flex justify-center">{session ? <><button>Se déconnecter</button></> : (
            <>
              <form action={signInAction} id="signUpForm" className="flex flex-col p-3 m-3 gap-1 border boder-white">
                <label htmlFor="email" hidden>E-mail</label>
                <input name="email" type="email" placeholder="email" required />
                <label htmlFor="password" hidden>Mot de passe</label>
                <input name="password" type="password" placeholder="mot de passe" required />
                <button type="submit">Connexion</button>
              </form>
            </>
          )}</div>
        </nav>
        {children}
      </body>
    </html>
  );
}
