import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Novoriq | CSV/Excel Reconciliation Workflows", template: "%s | Novoriq" },
  description: siteConfig.description,
  openGraph: { type: "website", siteName: siteConfig.name, title: "Novoriq", description: siteConfig.description, url: siteConfig.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
