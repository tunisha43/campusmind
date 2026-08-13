import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusMind — Your AI Academic Assistant",
  description: "Study smarter. Write better. Stay organized."
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
