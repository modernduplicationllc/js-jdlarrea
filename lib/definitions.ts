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

export type ProjectMetadata = {
	title: string;
	slug: string;
	order: number;
	industry: Industry;
	stack: string[];
	summary: string;
	thumbnail: string;

	// Case-study page (/work/[slug]) sidebar + hero fields.
	role?: string;
	client?: string;
	timeframe?: string;
	liveUrl?: string;
	githubUrl?: string;
};
