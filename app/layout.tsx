import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/src/auth";
import { headers } from "next/headers";
import { RootLayoutClient } from "./layout.client";

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
    <html lang="fr">
      <body className="flex flex-col antialiased bg-white font-sans dark:bg-black">
        <nav id="navbar" className="flex flex-col m-5 justify-center">
          <Link href="/" className="flex self-center">
            <div id="logo" className="border border-white justify-center p-5">
              <h2 className="text-4xl">Collab'</h2>
            </div>
          </Link>
          <RootLayoutClient
          isAuthenticated={!!session}
          userEmail={session?.user?.email}
          userName={session?.user.name}
          userSession={session}/>
        </nav>
        {children}
      </body>
    </html>
  );
}