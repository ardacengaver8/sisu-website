import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

/** Text stays in the left half — the compass occupies the right half here (desktop). */
export default function Manifesto({ t }: { t: Dict["manifesto"] }) {
  return (
    <section id="manifesto" className="relative py-[clamp(96px,14vw,200px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="md:max-w-[50%]">
          <Fig className="rv">{t.fig}</Fig>
          <div className="rv mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="display text-[clamp(96px,15vw,240px)] italic">{t.word}</span>
            <span className="label text-muted">
              {t.phon} · {t.pos}
            </span>
          </div>
          <div className="dim rv mt-6 w-full" />
          <p className="rv mt-10 max-w-[22ch] text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.08] tracking-[-0.02em]">
            {t.definition}
          </p>
          <p className="rv mt-10 max-w-[52ch] text-lg leading-relaxed text-ink-2">{t.body}</p>
        </div>
      </div>
    </section>
  );
}
