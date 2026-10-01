import "./globals.css";
import { Special_Elite, Courier_Prime } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const titulo = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-titulo", display: "swap" });
const texto = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-texto", display: "swap" });

export const metadata = { title: "Redator de e-mails corporativos" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${texto.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
