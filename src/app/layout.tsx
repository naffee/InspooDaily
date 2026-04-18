import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "InspoDaily | Premium Fashion, Lifestyle & Beauty",
  description: "Your daily source for curated fashion, skincare, makeup, travel and lifestyle.",
  verification: {
    other: {
      "p:domain_verify": "4a74d0a7206d59b6cd323b4119341043",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body className="min-h-full flex flex-col font-manrope selection:bg-primary/20 bg-surface" suppressHydrationWarning>
        <SearchProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <BottomNav />
        </SearchProvider>
      </body>
    </html>
  );
}
