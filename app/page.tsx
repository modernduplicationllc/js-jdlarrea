import HeroHome from "@/components/sections/hero-home";
import StatsRibbon from "@/components/sections/stats-ribbon";
import FeaturedCards from "@/components/sections/featured-cards";
import WordList from "@/components/sections/word-list";
import Content5050Grid from "@/components/sections/content-5050-grid";
import CtaBanner from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
			<HeroHome />
			<StatsRibbon />
			<FeaturedCards />
			<WordList />
			<Content5050Grid />

			<CtaBanner />
    </>
  );
}
