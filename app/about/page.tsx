import type { Metadata } from "next";
import AboutIntro from "@/components/sections/about-intro";
import Timeline from "@/components/sections/timeline";
import Toolbox from "@/components/sections/toolbox";
import ValuesGrid from "@/components/sections/values-grid";
import CtaBanner from "@/components/sections/cta-banner";

export const metadata: Metadata = {
	title: "About | JD Larrea",
	description: "A senior developer, expanding by design.",
};

export default function AboutPage() {
	return (
		<>
			<AboutIntro />
			<Timeline />
			<Toolbox />
			<ValuesGrid />
			<CtaBanner
				header="Want to see the work behind the story?"
				description="// 30+ projects, filterable by stack and industry"
				actions={[
					{ href: "/work", label: "Browse projects", variant: "primary" },
					{ href: "https://www.linkedin.com/in/jdlarrea/", label: "Connect on LinkedIn", variant: "ghost", icon: "linkedin" },
				]}
			/>
		</>
	);
}
