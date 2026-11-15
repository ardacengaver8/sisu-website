"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { compass } from "@/lib/compass-store";

const CompassCanvas = dynamic(() => import("./CompassCanvas"), { ssr: false });

type Props = { label: string; sub: string };

const INTERACTIVE = "a,button,input,textarea,select,label,[data-no-compass]";

/**
 * Fixed WebGL layer behind the page plus everything that drives it:
 * scroll → compass state, and pointer → needle / drag / click.
 */
export default function CompassStage(props: Props) {
  const wrap = useRef<HTMLDivElement>(null);

  /* scroll choreography */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    compass.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // lines draw themselves on load
      gsap.fromTo(compass, { draw: 0 }, { draw: 1, duration: compass.reduced ? 0 : 2.4, ease: "power2.inOut", delay: 0.2 });

      // as the expertise section scrolls in, glide from the right to the left half
      ScrollTrigger.create({
        trigger: "#expertise",
        start: "top bottom",
        end: "top top",
        onUpdate: (s) => (compass.travel = s.progress),
      });
      // on phones the manifesto text runs full width, so dim the compass behind it
      const mobile = matchMedia("(max-width: 767px)");
      let dim = 0;
      const paint = () => {
        if (!wrap.current) return;
        const o = (1 - compass.exit) * (mobile.matches ? 1 - 0.88 * dim : 1);
        wrap.current.style.opacity = String(o);
        wrap.current.style.visibility = o <= 0.001 ? "hidden" : "visible";
      };
      ScrollTrigger.create({
        trigger: "#manifesto",
        start: "top 85%",
        end: "bottom 60%",
        onUpdate: (s) => {
          dim = Math.min(1, s.progress * 5, (1 - s.progress) * 5);
          paint();
        },
      });
      // expertise end: scroll the compass away
      ScrollTrigger.create({
        trigger: "#expertise",
        start: "bottom bottom",
        end: "bottom 15%",
        onUpdate: (s) => {
          compass.exit = s.progress;
          paint();
        },
      });
    });
    return () => ctx.revert();
  }, []);

  /* pointer: needle follows, drag rotates, click snaps north */
  useEffect(() => {
    const root = document.documentElement;
    let down: { x: number; y: number; t: number } | null = null;
    let last = { x: 0, y: 0 };

    const inside = (x: number, y: number) => {
      const { screen } = compass;
      return Math.hypot(x - screen.x, y - screen.y) < screen.r && compass.exit < 0.5;
    };
    const blocked = (t: EventTarget | null) => t instanceof Element && !!t.closest(INTERACTIVE);

    const move = (e: PointerEvent) => {
      compass.pointer.x = e.clientX;
      compass.pointer.y = e.clientY;
      compass.pointer.active = e.pointerType === "mouse";
      if (compass.drag.active) {
        compass.drag.yaw += (e.clientX - last.x) * 0.012;
        compass.drag.pitch = Math.max(-0.9, Math.min(0.9, compass.drag.pitch + (e.clientY - last.y) * 0.008));
        last = { x: e.clientX, y: e.clientY };
        return;
      }
      if (e.pointerType === "mouse") {
        root.classList.toggle("compass-hover", inside(e.clientX, e.clientY) && !blocked(e.target));
      }
    };
    const pdown = (e: PointerEvent) => {
      if (e.button !== 0 || blocked(e.target) || !inside(e.clientX, e.clientY)) return;
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
      last = { x: e.clientX, y: e.clientY };
      if (e.pointerType === "mouse") {
        compass.drag.active = true;
        root.classList.add("compass-drag");
        e.preventDefault();
      }
    };
    const up = (e: PointerEvent) => {
      if (down) {
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
        if (moved < 6 && performance.now() - down.t < 500) compass.spinAt = performance.now();
      }
      down = null;
      compass.drag.active = false;
      root.classList.remove("compass-drag");
    };
    const leave = () => {
      compass.pointer.active = false;
      root.classList.remove("compass-hover");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", pdown);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", pdown);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.removeEventListener("pointerleave", leave);
      root.classList.remove("compass-hover", "compass-drag");
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <CompassCanvas {...props} />
    </div>
  );
}
