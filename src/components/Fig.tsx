/** Technical-drawing caption: "FIG. 02 — TITLE" with a short cobalt rule. */
export function Fig({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`label flex items-center gap-3 text-cobalt ${className}`}>
      <span className="h-px w-8 bg-cobalt" />
      {children}
    </div>
  );
}

/** Small compass-rose logomark. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 3.5 19 16h-6z" fill="var(--cobalt)" />
      <path d="M16 28.5 13 16h6z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}
