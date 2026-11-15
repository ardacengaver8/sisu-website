import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

/**
 * Core team cards. Photos are placeholders until portraits arrive —
 * drop an <img> into the frame (path via process.env.NEXT_PUBLIC_BASE_PATH).
 */
export default function Team({ t }: { t: Dict["team"] }) {
  return (
    <section id="team" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-6 mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display rv text-[clamp(44px,6vw,96px)] lg:col-span-6">{t.title}</h2>
          <p className="rv max-w-[46ch] text-lg text-ink-2 lg:col-span-5 lg:col-start-8">{t.intro}</p>
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.members.map((m, i) => (
            <li key={m.name} className="rv bg-paper">
              <div className="crop hatch relative m-5 flex aspect-[4/5] items-center justify-center border border-line bg-panel/60">
                <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-accent/25" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="0" y1="0" x2="100" y2="125" stroke="currentColor" strokeWidth=".3" />
                  <line x1="100" y1="0" x2="0" y2="125" stroke="currentColor" strokeWidth=".3" />
                </svg>
                <span className="label relative bg-panel px-3 py-2 text-accent">{t.photo}</span>
                <span className="label absolute top-3 right-3 text-accent">T.{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-line px-5 py-5">
                <h3 className="wide text-2xl font-semibold tracking-[-0.02em]">{m.name}</h3>
                <span className="label text-right text-accent">{m.role}</span>
              </div>
              {m.note && <p className="px-5 pb-5 text-[15px] text-ink-2">{m.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
