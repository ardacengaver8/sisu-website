import Link from "next/link";
import { Fig } from "../Fig";
import { formatDate, type Post } from "@/lib/posts";
import type { Dict, Locale } from "@/lib/i18n";

/** Index-style list of posts (used on the home page and on /blog). */
export function PostList({ posts, lang, t }: { posts: Post[]; lang: Locale; t: Dict["journal"] }) {
  if (!posts.length) return <p className="label mt-10 text-muted">{t.empty}</p>;
  return (
    <ul className="border-t border-line">
      {posts.map((p, i) => (
        <li key={p.slug} className="rv border-b border-line">
          <Link
            href={`/${lang}/blog/${p.slug}/`}
            className="group grid gap-3 py-7 transition-colors hover:bg-ice-0/70 sm:grid-cols-[80px_160px_1fr_auto] sm:items-baseline sm:gap-6 sm:px-3"
          >
            <span className="label text-cobalt">{String(i + 1).padStart(2, "0")}</span>
            <span className="label text-muted">{formatDate(p.date, lang)}</span>
            <span>
              <span className="wide block text-[clamp(22px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.02em] group-hover:text-cobalt">
                {p.title}
              </span>
              <span className="mt-2 block max-w-[64ch] text-ink-2">{p.excerpt}</span>
              <span className="label mt-3 flex flex-wrap gap-3 text-muted">
                <span>
                  {p.minutes} {t.minutes}
                </span>
                {p.lang !== lang && <span>· TR</span>}
                {p.sample && <span className="text-cobalt">· {t.sample}</span>}
              </span>
            </span>
            <span className="label hidden text-ink sm:block">
              {t.read} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Journal({ posts, lang, t }: { posts: Post[]; lang: Locale; t: Dict["journal"] }) {
  return (
    <section id="journal" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-6 mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display rv text-[clamp(44px,6vw,96px)]">{t.title}</h2>
            <p className="rv mt-4 text-ink-2">{t.intro}</p>
          </div>
          <Link href={`/${lang}/blog/`} className="btn btn-line rv">
            {t.all} <span className="arr">→</span>
          </Link>
        </div>
        <PostList posts={posts.slice(0, 3)} lang={lang} t={t} />
      </div>
    </section>
  );
}
