import type { Metadata } from "next";
import { Fig } from "@/components/Fig";
import { PostList } from "@/components/sections/Journal";
import { getDict, type Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const t = getDict((await params).lang as Locale);
  return { title: t.journal.title, description: t.journal.intro };
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const lang = (await params).lang as Locale;
  const t = getDict(lang).journal;
  return (
    <main className="relative z-10 mx-auto min-h-[80vh] max-w-[1440px] px-4 pt-32 pb-24 sm:px-8">
      <Fig className="rv">{t.fig}</Fig>
      <h1 className="display rv mt-6 text-[clamp(56px,9vw,150px)]">{t.title}</h1>
      <p className="rv mt-6 mb-14 text-lg text-ink-2">{t.intro}</p>
      <PostList posts={getPosts(lang)} lang={lang} t={t} />
    </main>
  );
}
