import { Fig } from "../Fig";
import { contact, type Dict } from "@/lib/i18n";

export default function Founder({ t }: { t: Dict["founder"] }) {
  return (
    <section id="founder" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* portrait slot — replace with <img src="/founder.jpg"> once the photo arrives */}
          <figure className="rv lg:col-span-4">
            <div className="crop hatch relative flex aspect-[4/5] items-center justify-center border border-line bg-ice-0/70">
              <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full text-cobalt/25" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="0" x2="100" y2="125" stroke="currentColor" strokeWidth=".3" />
                <line x1="100" y1="0" x2="0" y2="125" stroke="currentColor" strokeWidth=".3" />
              </svg>
              <span className="label relative bg-ice-0 px-3 py-2 text-cobalt">{t.photo}</span>
            </div>
            <figcaption className="label mt-3 flex justify-between text-muted">
              <span>{t.name}</span>
              <span>4 : 5</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display rv text-[clamp(44px,6vw,96px)]">{t.name}</h2>
            <div className="label rv mt-3 text-cobalt">{t.role} — Sisu</div>
            <p className="rv mt-8 max-w-[56ch] text-lg leading-relaxed text-ink-2">{t.bio}</p>
            <a href={contact.linkedin} target="_blank" rel="noopener" className="btn btn-line rv mt-8">
              {t.linkedin} <span className="arr">↗</span>
            </a>

            {/* career as a drawing's revision table */}
            <div className="rv mt-14 border border-line bg-ice-0/70 backdrop-blur-sm">
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
                  <div className="label px-4 py-4 text-cobalt">{r.yr}</div>
                  <div className="hidden border-l border-line px-4 py-4 font-semibold sm:block">{r.org}</div>
                  <div className="border-l border-line px-4 py-4 text-[15px] text-ink-2">
                    <span className="block font-semibold text-ink sm:hidden">{r.org}</span>
                    {r.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
