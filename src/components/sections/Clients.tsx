import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

/**
 * Client list. Names only for now, set as wordmarks in the display face; when the
 * client logos arrive, add them to public/logos/ and render them on white plates
 * the same way as the career table in Founder.tsx.
 */
export default function Clients({ t }: { t: Dict["clients"] }) {
  return (
    <section id="clients" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-6 mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display rv text-[clamp(44px,6vw,96px)] lg:col-span-6">{t.title}</h2>
          <p className="rv max-w-[46ch] text-lg text-ink-2 lg:col-span-5 lg:col-start-8">{t.intro}</p>
        </div>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((c) => (
            <li key={c.name} className="rv crop flex min-h-[160px] items-center justify-center bg-paper px-6 py-10 text-center">
              <span className="wide text-[clamp(22px,2vw,28px)] font-semibold leading-tight tracking-[-0.01em]">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
