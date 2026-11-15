import "../globals.css";

// Root layout for "/" only — it just forwards visitors to their language.
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
