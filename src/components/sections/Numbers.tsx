import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

export default function Numbers({ t }: { t: Dict["numbers"] }) {
  return (
    <section className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-10 grid grid-cols-2 border-t border-l border-line bg-ice-0/60 backdrop-blur-sm lg:grid-cols-4">
          {t.items.map((it, i) => (
            <div key={i} className="rv relative border-r border-b border-line p-5 sm:p-8">
              <span className="label absolute top-3 right-3 text-cobalt/70">{String.fromCharCode(65 + i)}</span>
              <div className="display text-[clamp(56px,7vw,112px)]">
                {it.v}
                <span className="text-cobalt">{it.suffix}</span>
              </div>
              <div className="dim mt-5 w-full" />
              <p className="mt-4 max-w-[26ch] text-sm text-ink-2 sm:text-[15px]">{it.k}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
