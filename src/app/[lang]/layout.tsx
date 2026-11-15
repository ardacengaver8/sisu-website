import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { archivo, plexMono } from "@/lib/fonts";
import { getDict, isLocale, locales } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: `%s — Sisu` },
    description: t.meta.description,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])) },
    openGraph: { title: t.meta.title, description: t.meta.description, type: "website", locale: lang },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <html lang={lang} className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-screen">
        <SmoothScroll />
        <Nav lang={lang} t={t.nav} />
        {children}
        <Footer t={t} />
      </body>
    </html>
  );
}
