/**
 * Sisu logo mark (approved concept "M4 — shaded rose"): a four-point compass rose,
 * descended from the original puzzle-star logo. Each arm is split lengthwise like the
 * shading on a real compass rose — the clockwise half blue, the other half green —
 * which gives the mark a turning, pinwheel motion.
 *
 * Colours: --logo-blue #1D5BE0, --logo-green #1F8A3B (globals.css), used unchanged everywhere.
 */

const C = "60 60"; // centre
// [tip, clockwise corner, counter-clockwise corner] for N, E, S, W
const ARMS: [string, string, string][] = [
  ["60 4", "80 40", "40 40"],
  ["116 60", "80 80", "80 40"],
  ["60 116", "40 80", "80 80"],
  ["4 60", "40 40", "40 80"],
];

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Sisu">
      {ARMS.map(([tip, cw, ccw]) => (
        <g key={tip}>
          <path d={`M${tip} L${cw} L${C} Z`} fill="var(--logo-blue)" />
          <path d={`M${tip} L${ccw} L${C} Z`} fill="var(--logo-green)" />
        </g>
      ))}
    </svg>
  );
}

/** Mark + "Sisu" wordmark, sized by the parent's font-size. */
export function Logo({ className = "", sub }: { className?: string; sub?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] leading-none ${className}`}>
      <LogoMark className="h-[1.5em] w-[1.5em] shrink-0" />
      <span className="flex flex-col gap-[0.22em]">
        <span className="font-bold tracking-[-0.01em]" style={{ fontStretch: "118%" }}>
          Sisu
        </span>
        {sub && <span className="label text-[0.32em] leading-none tracking-[0.3em] text-muted">{sub}</span>}
      </span>
    </span>
  );
}
