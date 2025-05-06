import type { Metadata } from "next";
import "@/styles/global.scss";

export const metadata: Metadata = {
  title: "Create Next Template",
  description: "Check this solution",
  icons: "./logo.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
