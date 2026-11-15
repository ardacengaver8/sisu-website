import { Fig } from "../Fig";
import type { Dict } from "@/lib/i18n";

const icons = [
  // field experience: bar chart
  <path key="a" d="M4 20h16M7 16V10m5 6V5m5 11v-4" />,
  // team: two circles
  <g key="b">
    <circle cx="9" cy="9" r="3.2" />
    <circle cx="16.5" cy="10" r="2.4" />
    <path d="M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6M15 15c2.4-.3 4.5 1 5.5 4" />
  </g>,
  // tailored: crosshair
  <g key="c">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
  </g>,
  // network: nodes
  <g key="d">
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 11l8-4M8 13l8 4" />
  </g>,
];

export default function Approach({ t }: { t: Dict["approach"] }) {
  return (
    <section id="approach" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <h2 className="display rv mt-6 max-w-[14ch] text-[clamp(44px,6vw,96px)]">{t.title}</h2>
        <div className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it, i) => (
            <div key={it.t} className="rv group relative border-r border-b border-line bg-ice-0/60 p-6 backdrop-blur-sm transition-colors hover:bg-ice-0 sm:p-8">
              <div className="flex items-start justify-between">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-cobalt" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  {icons[i]}
                </svg>
                <span className="label text-muted">P.{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="wide mt-16 text-2xl font-semibold tracking-[-0.02em]">{it.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{it.b}</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-cobalt transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
