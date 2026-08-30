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
	// Sort key only, format YYYYMMDD — never rendered client-side. Higher
	// (more recent) sorts first. A date rather than a plain index so new
	// projects can be inserted anywhere without renumbering everything else.
	dateAdded: number;
	industry: Industry;
	// Not currently shown on the card or filterable — most projects share a
	// stack (WordPress/ACF), so it wasn't a useful differentiator. Kept as
	// data in case that changes later.
	stack: string[];
	summary: string;
	thumbnail: string;
	liveUrl?: string;

	// Optional per-project code snippet, shown in a dialog from the card's
	// "Featured Code" button. Use whatever language/stack the project
	// actually used — that's the point, not uniformity.
	codeSnippet?: {
		filename: string;
		code: string;
	};
};
