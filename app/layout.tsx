import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juego para Grupos - Preguntas y Desafíos",
  description: "Juego picante de preguntas y desafíos para grupos de amigos",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
