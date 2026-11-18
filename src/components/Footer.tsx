import { contact, type Dict } from "@/lib/i18n";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Footer({ t }: { t: Dict }) {
  return (
    <footer className="relative z-10 border-t border-line bg-panel/70 backdrop-blur-sm">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 pb-8 sm:px-8">
        <Logo className="select-none text-[17vw] text-ink sm:text-[15vw] lg:text-[11rem]" />
        <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <div className="label text-muted">{t.footer.contact}</div>
            <div className="mt-4 space-y-3">
              <a className="flex items-center gap-3 break-all text-ink hover:text-accent" href={`mailto:${contact.email}`}>
                <MailIcon className="h-5 w-5 shrink-0 text-accent" />
                {contact.email}
              </a>
              <a className="flex items-center gap-3 text-ink hover:text-accent" href={contact.phoneHref}>
                <PhoneIcon className="h-5 w-5 shrink-0 text-accent" />
                {contact.phone}
              </a>
            </div>
          </div>
          <div>
            <div className="label text-muted">{t.footer.address}</div>
            <a className="mt-4 flex items-start gap-3 text-ink-2 hover:text-accent" href={contact.mapHref} target="_blank" rel="noopener">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              {contact.address}
            </a>
            <a className="label mt-4 block text-muted hover:text-accent" href={contact.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
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
