import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collab'",
  description: "Collab est un site qui vise les musiciens amateurs pour leur permettre de se constituer un réseau. La fonction principale de cette plateforme est la possibilité de poster une annonce pour chercher un.e musicien.ne avec leaquel.le collaborer sur un projet de titre, EP commun ou même de se constituer en groupe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col antialiased bg-zinc-50 font-sans dark:bg-black">
        <nav id="navbar" className="flex m-5 justify-center">
          <Link href="/"><h2 className="text-4xl">Collab'</h2></Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
