// Custom types
export type SectionHeader = {
	eyebrow?: string;
	header?: string;
	description?: string;
	sectionLink?: {
		text: string,
		url: string,
		new_tab?: boolean
	}
}

// The fixed industry list — shown as single-select filter pills on /work.
// Keep this list in sync with the `industry` value used in each project's metadata.
export const INDUSTRIES = [
	"Professional Services",
	"Nonprofits",
	"Technology & SaaS",
	"Home Services",
	"Law Firms",
	"Engineering & Construction",
	"Healthcare",
	"Accounting & Finance",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export type ProjectStat = {
	num: string;
	label: string;
	reported?: boolean;
};

export type ProjectMetadata = {
	title: string;
	slug: string;
	order: number;
	industry: Industry;
	stack: string[];
	summary: string;
	thumbnail: string;

	// Reserved for the /work/[slug] case-study page (priority 2) — optional for now.
	role?: string;
	client?: string;
	timeline?: string;
	liveUrl?: string;
	githubUrl?: string;
	stats?: ProjectStat[];
	gallery?: string[];
};
