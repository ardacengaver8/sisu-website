"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fig } from "../Fig";
import { compass, stepHeading } from "@/lib/compass-store";
import type { Dict } from "@/lib/i18n";

/**
 * Tall section with a sticky panel. Scroll progress picks the active expertise,
 * and the 3D compass needle swings to that item's heading.
 */
export default function Expertise({ t }: { t: Dict["expertise"] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const n = t.items.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => {
        const i = Math.min(n - 1, Math.floor(s.progress * n));
        compass.step = i;
        setActive(i);
      },
      onLeave: () => (compass.step = -1),
      onLeaveBack: () => (compass.step = -1),
      onEnter: () => (compass.step = 0),
      onEnterBack: () => (compass.step = n - 1),
    });
    return () => {
      st.kill();
      compass.step = -1;
    };
  }, [n]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / n), behavior: "smooth" });
  };

  const item = t.items[active];
  const hdg = String(Math.round(stepHeading(active))).padStart(3, "0");

  return (
    <section id="expertise" ref={ref} className="relative" style={{ height: `${n * 75 + 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1440px] px-4 pt-20 pb-6 sm:px-8 md:grid-cols-12">
          {/* left half reserved for the 3D compass on desktop; top half on mobile */}
          <div className="flex flex-col justify-end md:col-span-6 md:col-start-7 md:justify-center">
            <Fig>{t.fig}</Fig>
            <h2 className="display mt-4 text-[clamp(36px,4.6vw,72px)]">{t.title}</h2>

            <div className="mt-6 grid grid-cols-[auto_1fr] items-end gap-6 border-t border-line pt-6 md:mt-10">
              <div className="label text-accent">
                <div className="text-muted">{t.heading}</div>
                <div className="display mt-1 text-[clamp(44px,5vw,80px)] text-accent tabular-nums" style={{ fontStretch: "100%" }}>
                  {hdg}°
                </div>
              </div>
              <div className="label pb-2 text-right text-muted">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </div>
            </div>

            <div key={active} className="swap-in mt-4 min-h-[190px] md:min-h-[220px]">
              <h3 className="wide text-[clamp(24px,2.4vw,36px)] font-semibold leading-[1.1] tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-2 md:text-base">{item.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="label border border-line bg-panel/70 px-2.5 py-1.5 text-ink-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* index of all seven */}
            <ol className="mt-4 grid grid-cols-7 gap-1.5 md:mt-8">
              {t.items.map((it, i) => (
                <li key={it.title}>
                  <button
                    onClick={() => jump(i)}
                    className="group block w-full text-left"
                    aria-label={it.title}
                    aria-current={i === active ? "step" : undefined}
                  >
                    <span className={`block h-[3px] transition-colors ${i === active ? "bg-accent" : i < active ? "bg-ink/40" : "bg-line-strong/60 group-hover:bg-ink/40"}`} />
                    <span className={`label mt-2 block ${i === active ? "text-accent" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
