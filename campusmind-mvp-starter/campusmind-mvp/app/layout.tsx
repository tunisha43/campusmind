import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusMind — Your Academic Workspace",
  description: "Study, write, organize and create academic work from one intelligent workspace."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}