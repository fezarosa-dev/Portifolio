import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { getSiteContent } from "@/lib/supabase/queries";
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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
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
    ...(content.site_icon ? { icons: { icon: "/api/site-icon" } } : {}),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerList, cookieStore] = await Promise.all([headers(), cookies()]);
  const locale = headerList.get("x-locale") === "en" ? "en" : "pt-BR";
  const dark = cookieStore.get("theme")?.value === "dark";

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased${dark ? " dark" : ""}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
