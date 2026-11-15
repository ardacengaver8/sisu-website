/** Technical-drawing caption: "FIG. 02 — TITLE" with a short accent rule. */
export function Fig({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`label flex items-center gap-3 text-accent ${className}`}>
      <span className="h-px w-8 bg-accent" />
      {children}
    </div>
  );
}
