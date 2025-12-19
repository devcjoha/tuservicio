import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { InstitutionProvider } from "@/context/InstitutionsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuServicio.com",
  description: "Plataforma SaaS para gestión de instituciones y servicios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <InstitutionProvider>
          {children}
          </InstitutionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
