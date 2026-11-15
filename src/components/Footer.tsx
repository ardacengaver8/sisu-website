import { contact, type Dict } from "@/lib/i18n";

export default function Footer({ t }: { t: Dict }) {
  return (
    <footer className="relative z-10 border-t border-line bg-panel/70 backdrop-blur-sm">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 pb-8 sm:px-8">
        <div className="display select-none text-[22vw] leading-[0.8] text-ink sm:text-[19vw] lg:text-[15.5rem]" aria-hidden="true">
          SİSU<span className="text-accent">.</span>
        </div>
        <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
          <p className="max-w-[28ch] text-ink-2">{t.footer.tagline}</p>
          <div className="label space-y-2 text-muted">
            <a className="block hover:text-accent" href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className="block hover:text-accent" href={contact.phoneHref}>{contact.phone}</a>
            <a className="block hover:text-accent" href={contact.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
          <div className="label space-y-2 text-muted sm:text-right">
            <div>41°03′N · 28°59′E</div>
            <div>© {new Date().getFullYear()} Sisu — {t.footer.rights}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
