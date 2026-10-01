import "./globals.css";

export const metadata = { title: "Redator de e-mails corporativos" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
