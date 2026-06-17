import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/footer"; // Ajuste le chemin avec "@/components/Footer" si tu as un alias configuré

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"], // Poids très gras pour l'impact brutaliste
  variable: "--font-syne",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Poids plus légers pour une lecture propre
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "qtn.raw | Portfolio",
  description: "Portfolio professionnel qtn.raw - Photographe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`scroll-smooth ${syne.variable} ${plusJakarta.variable}`}>
      <body className="font-body bg-background text-foreground antialiased selection:bg-lime selection:text-background flex flex-col min-h-screen">

        {/* Ton contenu principal (la grille, les photos, etc.) va grandir pour repousser le footer en bas */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Le Footer s'affiche sur toutes les pages */}
        <Footer />

      </body>
    </html>
  );
}
