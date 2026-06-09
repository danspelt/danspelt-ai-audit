import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SparkleBackground } from "@/components/sparkle-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuditSpark — AI Website Audit That Wins More Clients",
  description:
    "Get a stunning AI-powered website audit in 2 minutes. Find conversion leaks, fix your homepage, and turn more visitors into paying customers.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "AuditSpark — AI Website Audit",
    description: "Your website is losing you money every day. Get a free AI audit and fix it.",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-slate-950 font-sans text-white">
        <SparkleBackground />
        <SiteHeader />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
