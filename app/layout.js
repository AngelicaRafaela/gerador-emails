import "./globals.css";
import { Fraunces, DM_Sans } from "next/font/google";

const titulo = Fraunces({ subsets: ["latin"], variable: "--font-titulo", display: "swap" });
const texto = DM_Sans({ subsets: ["latin"], variable: "--font-texto", display: "swap" });

export const metadata = { title: "Redator de e-mails corporativos" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${texto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
