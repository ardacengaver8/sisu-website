import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

export default function Hero({ t }: { t: Dict["hero"] }) {
  return (
    <section id="hero" className="relative min-h-[100svh]">
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-rows-[1fr_auto] px-4 pt-24 pb-8 sm:px-8">
        <div className="flex flex-col justify-end pb-10 md:justify-center md:pb-0">
          <Fig className="rv">{t.fig}</Fig>
          <h1 className="display rv mt-6 text-[clamp(56px,10.5vw,176px)] md:max-w-[58%]">
            <span className="block">{t.title[0]}</span>
            <span className="block text-cobalt">{t.title[1]}</span>
          </h1>
          <p className="rv mt-6 max-w-[44ch] text-base leading-relaxed text-ink-2 sm:mt-8 sm:text-lg">{t.lead}</p>
          <div className="rv mt-8 flex flex-wrap gap-3 sm:mt-10">
            <a href="#contact" className="btn btn-solid">
              {t.ctaPrimary} <span className="arr">→</span>
            </a>
            <a href="#expertise" className="btn btn-line">
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        {/* title block, like the corner of an engineering drawing */}
        <div className="label hidden grid-cols-4 border-t border-line text-muted md:grid">
          <div className="border-r border-line py-3 pr-3">{t.eyebrow}</div>
          <div className="py-3 pl-3 md:border-r md:border-line md:pr-3">41°03′N · 28°59′E</div>
          <div className="hidden border-r border-line py-3 pl-3 md:block">↓ {t.scroll}</div>
          <div className="hidden py-3 pl-3 text-cobalt md:block md:text-right">◎ {t.hint}</div>
        </div>
      </div>
    </section>
  );
}
