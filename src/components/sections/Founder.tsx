import { Fig } from "../Fig";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contact, type Dict, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/posts";

// Server component, evaluated at build time (static export).
const hasPhoto = existsSync(join(process.cwd(), "public", "founder.jpg"));

// Company logos for the career table, keyed by `org` (same in every language). Files in public/logos/.
const LOGOS: Record<string, string> = {
  Siemens: "siemens.svg",
  "Amcor Flexibles": "amcor.svg",
  "Etapak & Etap Enjeksiyon": "etapak.svg",
};

/** Logo on a small white plate so brand colours stay true on the blueprint background. */
function OrgLogo({ org }: { org: string }) {
  const file = LOGOS[org];
  if (!file) return null;
  return (
    <span className="mb-2 flex h-9 w-[120px] items-center justify-center rounded-[3px] bg-white px-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logos/${file}`}
        alt=""
        loading="lazy"
        className="max-h-5 w-auto max-w-full object-contain"
      />
    </span>
  );
}

export default function Founder({ t, lang }: { t: Dict["founder"]; lang: Locale }) {
  return (
    <section id="founder" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* portrait: shows public/founder.jpg when present at build time, otherwise the placeholder */}
          <figure className="rv lg:col-span-4">
            {hasPhoto ? (
              <div className="crop relative aspect-[4/5] border border-line bg-panel/70">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/founder.jpg`}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="crop hatch relative flex aspect-[4/5] items-center justify-center border border-line bg-panel/70">
                <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-accent/25" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="0" y1="0" x2="100" y2="125" stroke="currentColor" strokeWidth=".3" />
                  <line x1="100" y1="0" x2="0" y2="125" stroke="currentColor" strokeWidth=".3" />
                </svg>
                <span className="label relative bg-panel px-3 py-2 text-accent">{t.photo}</span>
              </div>
            )}
            <figcaption className="label mt-3 flex justify-between text-muted">
              <span>{t.name}</span>
              <span>4 : 5</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display rv text-[clamp(44px,6vw,96px)]">{t.name}</h2>
            <div className="label rv mt-3 text-accent">{t.role} — Sisu</div>
            <p className="rv mt-8 max-w-[56ch] text-lg leading-relaxed text-ink-2">{t.bio}</p>
            <a href={contact.linkedin} target="_blank" rel="noopener" className="btn btn-line rv mt-8">
              {t.linkedin} <span className="arr">↗</span>
            </a>

            {/* career as a drawing's revision table */}
            <div className="rv mt-14 border border-line bg-panel/70 backdrop-blur-sm">
              <div className="label grid grid-cols-[110px_1fr] border-b border-line text-muted sm:grid-cols-[140px_220px_1fr]">
                <div className="px-4 py-3">{t.cols[0]}</div>
                <div className="hidden border-l border-line px-4 py-3 sm:block">{t.cols[1]}</div>
                <div className="border-l border-line px-4 py-3">
                  <span className="sm:hidden">{t.cols[1]} / </span>
                  {t.cols[2]}
                </div>
              </div>
              {t.timeline.map((r, i) => (
                <div
                  key={r.org}
                  className={`grid grid-cols-[110px_1fr] sm:grid-cols-[140px_220px_1fr] ${i < t.timeline.length - 1 ? "border-b border-line" : ""}`}
                >
                  <div className="label px-4 py-4 text-accent">{r.yr}</div>
                  <div className="hidden border-l border-line px-4 py-4 font-semibold sm:block">
                    <OrgLogo org={r.org} />
                    {r.org}
                  </div>
                  <div className="border-l border-line px-4 py-4 text-[15px] text-ink-2">
                    <span className="block font-semibold text-ink sm:hidden">
                      <OrgLogo org={r.org} />
                      {r.org}
                    </span>
                    {r.role}
                  </div>
                </div>
              ))}
            </div>

            {/* press mentions — link out to the source, summary in our own words */}
            {t.press.length > 0 && (
              <div className="rv mt-14">
                <div className="label text-muted">{t.pressLabel}</div>
                <ul className="mt-4 border-t border-line">
                  {t.press.map((p) => (
                    <li key={p.url} className="border-b border-line">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener"
                        className="group grid gap-2 py-6 transition-colors hover:bg-panel/70 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-6 sm:px-3"
                      >
                        <span className="label text-accent">
                          {formatDate(p.date, lang)}
                          <span className="mt-1 block text-muted">{p.source}</span>
                        </span>
                        <span>
                          <span className="wide block text-xl font-semibold leading-snug tracking-[-0.01em] group-hover:text-accent">
                            {p.title}
                          </span>
                          <span className="mt-2 block max-w-[60ch] text-[15px] text-ink-2">{p.note}</span>
                        </span>
                        <span className="label text-ink">
                          {t.pressRead} <span className="arr inline-block transition-transform group-hover:translate-x-1">↗</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
