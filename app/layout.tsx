import type { Metadata } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://www.zanoni.dev.br";
const SITE_NAME = "Felipe Zanoni da Rosa";
const SITE_DESCRIPTION =
  "Portfólio de Felipe Zanoni da Rosa, desenvolvedor de software — projetos, artigos, currículo e contato.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zanoni - Portifolio",
    template: "%s — Zanoni - Portifolio",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Felipe Zanoni da Rosa",
    "desenvolvedor de software",
    "software engineer",
    "portfólio",
    "projetos",
  ],
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Portfólio`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Portfólio`,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "en" ? "en" : "pt-BR";

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
