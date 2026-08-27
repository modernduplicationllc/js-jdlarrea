type TimelineItem = {
	year: string;
	title: string;
	description: string;
	current?: boolean;
};

const TIMELINE: TimelineItem[] = [
	{
		year: "2014",
		title: "First agency role",
		description:
			"Started building WordPress sites for small business clients — learned PHP, theme structure, and how to translate a design comp into working code.",
	},
	{
		year: "2017",
		title: "Senior Developer, digital agency",
		description:
			"Took ownership of front-end and back-end delivery across a growing client roster — custom themes, ACF, WooCommerce, performance and security hardening.",
	},
	{
		year: "2020",
		title: "Led cross-functional builds",
		description:
			"Moved into a lead role coordinating design, dev, and strategy on larger accounts — started specializing in complex WordPress + marketing-stack integrations (HubSpot, Gravity Forms).",
	},
	{
		year: "2024",
		title: "Started consulting independently",
		description:
			"Began taking on direct client work and technical consulting — platform recommendations, project scoping, and strategy alongside hands-on builds.",
	},
	{
		year: "2026",
		title: "Expanding into full-stack development",
		description:
			"Deep-diving TypeScript, the Next.js App Router, and Neon Postgres — expanding into full-stack development while continuing WordPress, Shopify, and HubSpot work.",
		current: true,
	},
];

export default function Timeline() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="mb-13">
					<div className="super-header with-dash">the path here</div>
					<h2 className="!mt-0">How I got here</h2>
				</div>

				<div className="relative max-w-190 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-px before:bg-bdr-500 brm57:before:left-22">
					{TIMELINE.map((item, index) => (
						<div
							key={item.year}
							className={`relative grid grid-cols-1 gap-1.5 brm57:grid-cols-[88px_1fr] brm57:gap-7 ${
								index === TIMELINE.length - 1 ? "" : "pb-11"
							}`}
						>
							<div className="font-mono text-[13px] text-body-500 brm57:pt-0.5 brm57:text-right">
								{item.year}
							</div>
							<div
								className={`relative pl-5 before:absolute before:top-1.5 before:left-[-5px] before:size-2.5 before:rounded-full before:border-2 before:border-accent-500 ${
									item.current
										? "before:bg-accent-500 before:shadow-[0_0_0_4px_rgba(53,104,214,0.2)]"
										: "before:bg-bg-dark-900"
								}`}
							>
								<div className="mb-2 font-sans-alt text-lg font-semibold text-hdr-main-100">
									{item.title}
								</div>
								<p className="max-w-130 text-sm leading-relaxed text-body-300">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
