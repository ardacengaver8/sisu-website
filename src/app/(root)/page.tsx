import type { Metadata } from "next";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Sisu Danışmanlık",
  robots: { index: false },
};

/**
 * Static hosting has no server-side redirects, so "/" picks a language in the browser:
 * German or English browser → /de or /en, everything else → /tr.
 */
export default function RootRedirect() {
  const script = `(function(){var l=(navigator.languages&&navigator.languages[0]||navigator.language||'tr').slice(0,2).toLowerCase();var t=l==='de'?'de':l==='en'?'en':'tr';location.replace('${base}/'+t+'/'+location.hash);})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${base}/tr/`} />
      </noscript>
      <p style={{ fontFamily: "monospace", padding: 24 }}>
        <a href={`${base}/tr/`}>Türkçe</a> · <a href={`${base}/en/`}>English</a> · <a href={`${base}/de/`}>Deutsch</a>
      </p>
    </>
  );
}
