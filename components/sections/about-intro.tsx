const PARAGRAPH_CLASS = "mb-8 max-w-200 text-base leading-relaxed text-body-300";

export default function AboutIntro() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="super-header with-dash">about</div>
				<h1 className="max-w-150">A senior developer, expanding by design.</h1>

				<p className={PARAGRAPH_CLASS}>
					I'm J.D. — a senior web developer based in Tampa Bay, FL. Over the past 10+ years I've built and led custom web projects at marketing and digital agencies and through independent client work — mostly on WordPress, along with Shopify and HubSpot CMS, across SaaS startups, Professional Services, Law Firms, Nonprofits, and beyond.
				</p>
				<p className={PARAGRAPH_CLASS}>
					Along the way I've also scoped project proposals with sales and account teams and trained both clients and junior developers — the parts of the job that don't show up in a stack list but shape how I actually build things.
				</p>
				<p className={PARAGRAPH_CLASS}>
					In 2026 I started expanding into full-stack development with Next.js, TypeScript, and PostgreSQL — not to leave WordPress behind, but to widen what I can build and who I can build it for.
				</p>
				<p className={PARAGRAPH_CLASS}>
					This site tracks that shift as it happens: real projects, real code, and a few things I built just because I wanted to see how they worked.
				</p>
			</div>
		</section>
	);
}
