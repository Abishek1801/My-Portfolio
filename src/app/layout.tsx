import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { IntroProvider } from "@/contexts/intro-context";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
});

export const metadata: Metadata = {
  title: "Abi (Abishek) — Portfolio",
  description:
    "Portfolio for Abishek Prakash Nagaram (Abi) — ML, Agentic AI, and full-stack systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${shareTechMono.variable}`}>
        <ThemeProvider>
          <IntroProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="mx-auto max-w-6xl px-4 pb-16 pt-[4.5rem] sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
