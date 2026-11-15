/**
 * Sisu logo mark: the four-point puzzle star from the original logo, redrawn.
 * Tips (N/S blue, E/W green) lock into four centre pieces with puzzle tabs.
 * Gaps between pieces are cut with a mask, so the mark sits on any background.
 *
 * Colours come from --logo-blue / --logo-green (see globals.css). Heritage values
 * for print and light backgrounds: blue #1D5BE0, green #1F8A3B.
 */

const TIPS = {
  N: "M60 4 L80 40 H65 A6.5 6.5 0 1 1 55 40 H40 Z",
  E: "M116 60 L80 80 V65 A6.5 6.5 0 1 1 80 55 V40 Z",
  S: "M60 116 L40 80 H55 A6.5 6.5 0 1 1 65 80 H80 Z",
  W: "M4 60 L40 40 V55 A6.5 6.5 0 1 1 40 65 V80 Z",
};
const BLUE = "var(--logo-blue)";
const GREEN = "var(--logo-green)";

// [x, y, colour] of the four 20×20 centre pieces
const CENTRE: [number, number, string][] = [
  [40, 40, GREEN],
  [60, 40, BLUE],
  [60, 60, GREEN],
  [40, 60, BLUE],
];
const TIP_COLOURS: [keyof typeof TIPS, string][] = [
  ["N", BLUE],
  ["S", BLUE],
  ["E", GREEN],
  ["W", GREEN],
];

/** `id` must be unique per page (it names the SVG mask). */
export function LogoMark({ id, className = "" }: { id: string; className?: string }) {
  const mask = `sisu-gaps-${id}`;
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Sisu">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
          <rect width="120" height="120" fill="#fff" />
          {/* seams = tip outlines + the centre cross between the tabs (the tabs bridge it) */}
          <g fill="none" stroke="#000" strokeWidth="2.6" strokeLinejoin="round">
            <path d="M60 50.7 V69.3 M50.7 60 H69.3" />
            {Object.values(TIPS).map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        {CENTRE.map(([x, y, fill]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="20" height="20" fill={fill} />
        ))}
        {TIP_COLOURS.map(([k, fill]) => (
          <path key={k} d={TIPS[k]} fill={fill} />
        ))}
      </g>
    </svg>
  );
}

/** Mark + "Sisu" wordmark, sized by the parent's font-size. */
export function Logo({ id, className = "", sub }: { id: string; className?: string; sub?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] leading-none ${className}`}>
      <LogoMark id={id} className="h-[1.5em] w-[1.5em] shrink-0" />
      <span className="flex flex-col gap-[0.22em]">
        <span className="font-bold tracking-[-0.01em]" style={{ fontStretch: "118%" }}>
          Sisu
        </span>
        {sub && <span className="label text-[0.32em] leading-none tracking-[0.3em] text-muted">{sub}</span>}
      </span>
    </span>
  );
}
