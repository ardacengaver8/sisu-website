import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { allSlugs, formatDate, getPost } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => allSlugs().map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug, lang as Locale);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const post = getPost(slug, lang);
  if (!post) notFound();
  const t = getDict(lang).journal;

  return (
    <main className="relative z-10 mx-auto max-w-[1440px] px-4 pt-32 pb-24 sm:px-8">
      <Link href={`/${lang}/blog/`} className="label text-muted hover:text-accent">
        ← {t.back}
      </Link>
      <article className="mt-10 grid gap-10 lg:grid-cols-12">
        <aside className="label space-y-3 text-muted lg:col-span-3">
          <div className="text-accent">{t.fig}</div>
          <div>{formatDate(post.date, lang)}</div>
          <div>
            {post.minutes} {t.minutes}
          </div>
          {post.sample && <div className="text-accent">{t.sample}</div>}
          {post.lang !== lang && <div className="normal-case tracking-normal">{t.fallback}</div>}
        </aside>
        <div className="lg:col-span-8">
          <h1 lang={post.lang} className="display text-[clamp(40px,5.5vw,88px)]">{post.title}</h1>
          {post.excerpt && <p lang={post.lang} className="mt-6 max-w-[48ch] text-xl text-ink-2">{post.excerpt}</p>}
          <div className="dim my-12 w-full max-w-[720px]" />
          <div lang={post.lang} className="prose-sisu max-w-[68ch]" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    </main>
  );
}
