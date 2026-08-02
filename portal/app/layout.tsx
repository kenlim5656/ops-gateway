import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Ops Gateway — Mission Control",
  description:
    "Enterprise AI Operations Gateway & Observability Stack. Centralized API key management, budget enforcement, model routing, and deep prompt tracing.",
};

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/architecture", label: "Architecture" },
  { href: "/quickstart", label: "Quick Start" },
  { href: "/configuration", label: "Configuration" },
  { href: "/api-reference", label: "API Reference" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-background font-bold text-sm">
                OG
              </div>
              <span className="font-semibold tracking-tight text-foreground">
                Ops Gateway
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-card transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href="https://github.com/kelim19/ops-gateway"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 text-center text-sm text-muted">
          <div className="mx-auto max-w-7xl px-6">
            Ops Gateway — Open-Source Enterprise AI Operations Platform
          </div>
        </footer>
      </body>
    </html>
  );
}
