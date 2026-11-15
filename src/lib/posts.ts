import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { defaultLocale, type Locale } from "./i18n";

/**
 * Blog posts live in src/content/posts/<lang>/<slug>.md with a small front-matter block:
 *
 * ---
 * title: Post title
 * date: 2026-11-15
 * excerpt: One-sentence summary
 * sample: true          # optional — shows a "sample content" badge
 * ---
 *
 * A post missing in a language falls back to the Turkish version.
 */
const ROOT = path.join(process.cwd(), "src/content/posts");

export type Post = {
  slug: string;
  lang: Locale;
  title: string;
  date: string;
  excerpt: string;
  sample: boolean;
  minutes: number;
  html: string;
};

function parse(file: string, slug: string, lang: Locale): Post {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = m ? m[2] : raw;
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    lang,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    excerpt: meta.excerpt ?? "",
    sample: meta.sample === "true",
    minutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(body, { async: false }) as string,
  };
}

function slugsIn(lang: Locale) {
  const dir = path.join(ROOT, lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export function allSlugs() {
  return slugsIn(defaultLocale);
}

/** Returns the post in `lang`, or the Turkish original (with `lang` = "tr") if not translated. */
export function getPost(slug: string, lang: Locale): Post | null {
  for (const l of [lang, defaultLocale]) {
    const f = path.join(ROOT, l, `${slug}.md`);
    if (fs.existsSync(f)) return parse(f, slug, l);
  }
  return null;
}

export function getPosts(lang: Locale): Post[] {
  return allSlugs()
    .map((s) => getPost(s, lang)!)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(d: string, lang: Locale) {
  if (!d) return "";
  const loc = lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-GB";
  return new Date(d).toLocaleDateString(loc, { year: "numeric", month: "short", day: "2-digit" });
}
