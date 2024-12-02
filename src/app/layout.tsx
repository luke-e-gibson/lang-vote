import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import UserTracking from "@/app/_components/UserTracking";

export const metadata: Metadata = {
  title: "Language Vote",
  description: "Vote for you favorite language",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <UserTracking/>
        {children}
      </body>
    </html>
  );
}
