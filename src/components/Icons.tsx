/** Line icons drawn to match the blueprint line-work (stroke = currentColor). */
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MailIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3.5h3.2l1.6 4.3-2.1 1.4a11 11 0 0 0 5.1 5.1l1.4-2.1 4.3 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}
