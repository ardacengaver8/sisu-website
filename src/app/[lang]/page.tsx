import { getDict, type Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import CompassStage from "@/components/compass/CompassStage";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Expertise from "@/components/sections/Expertise";
import Numbers from "@/components/sections/Numbers";
import Founder from "@/components/sections/Founder";
import Team from "@/components/sections/Team";
import Approach from "@/components/sections/Approach";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDict(lang);
  const posts = getPosts(lang);

  return (
    <>
      <CompassStage label={t.compass.label} sub={t.compass.sub} />
      <main className="relative z-10">
        <Hero t={t.hero} />
        <Manifesto t={t.manifesto} />
        <Expertise t={t.expertise} />
        <Numbers t={t.numbers} />
        <Founder t={t.founder} />
        <Team t={t.team} />
        <Approach t={t.approach} />
        <Journal posts={posts} lang={lang} t={t.journal} />
        <Contact t={t.contact} />
      </main>
    </>
  );
}
