"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, type Dict, type Locale } from "@/lib/i18n";
import { LogoMark } from "./Logo";

export default function Nav({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const home = `/${lang}/`;
  const links = [
    { href: `${home}#manifesto`, label: t.manifesto, n: "01" },
    { href: `${home}#expertise`, label: t.expertise, n: "02" },
    { href: `${home}#team`, label: t.team, n: "05" },
    { href: `${home}#approach`, label: t.approach, n: "06" },
    { href: `/${lang}/blog/`, label: t.journal, n: "07" },
  ];
  // swap the locale segment of the current path
  const swap = (l: Locale) => (pathname ? pathname.replace(/^\/(tr|en|de)(?=\/|$)/, `/${l}`) : `/${l}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-paper/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        <Link href={home} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark id="nav" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-[-0.01em]" style={{ fontStretch: "118%" }}>Sisu</span>
          <span className="label hidden text-muted sm:inline">/ {lang === "tr" ? "Danışmanlık" : lang === "de" ? "Beratung" : "Consulting"}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="group label flex gap-1.5 text-ink-2 transition-colors hover:text-accent">
              <span className="text-accent/60">{l.n}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="label flex items-center gap-1" aria-label="Language">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-line-strong">/</span>}
                <Link
                  href={swap(l)}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={l === lang ? "text-accent" : "text-muted hover:text-ink"}
                >
                  {l.toUpperCase()}
                </Link>
              </span>
            ))}
          </div>
          <Link href={`${home}#contact`} className="btn btn-solid hidden h-10 sm:inline-flex">
            {t.contact} <span className="arr">→</span>
          </Link>
          <button
            className="label flex h-10 items-center border border-ink px-3 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav className="h-[calc(100svh-64px)] border-t border-line bg-paper px-4 py-8 lg:hidden" aria-label="Mobile">
          {[...links, { href: `${home}#contact`, label: t.contact, n: "08" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-5"
            >
              <span className="label text-accent">{l.n}</span>
              <span className="display text-4xl">{l.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
