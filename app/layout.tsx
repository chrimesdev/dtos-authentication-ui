import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Screening - NHS England",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="js-enabled">{children}</body>
    </html>
  );
}
