type TimelineItem = {
	year: string;
	title: string;
	description: string;
	current?: boolean;
};

const TIMELINE: TimelineItem[] = [
	{
		year: "2016",
		title: "Where it all started",
		description:
			"Landed my first web developer role at a marketing agency, coding custom WordPress themes from design mockups and wiring up CRM integrations. Picked up the trade fast.",
	},
	{
		year: "2018",
		title: "Employee of the Month",
		description:
			"Grateful for the recognition — a welcome sign I was on the right track. Almost as sweet as winning the company costume contest later that year!",
	},
	{
		year: "2019",
		title: "Leveled up to Senior",
		description:
			"Same agency, bigger responsibility — multi-platform launches, DNS, and building the onboarding docs that helped new devs ramp up faster.",
	},
	{
		year: "2020",
		title: "Freelancing on the side",
		description:
			"Picked up side projects for friends, family, and small businesses trying to stay afloat during a tough stretch for everyone.",
	},
	{
		year: "2022",
		title: "Scoping projects, still coding",
		description:
			"Moved to a digital agency and started sitting in on design reviews and budget conversations before a project ever reached my desk — mentoring newer developers along the way, while staying hands-on with the code.",
	},
	{
		year: "2026",
		title: "Expanding into full-stack",
		description:
			"Shifted my primary stack to React, Next.js, TypeScript, and Postgres — building complete applications instead of just the front end.",
		current: true,
	},
];

export default function Timeline() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="mb-13">
					<div className="super-header with-dash">the path here</div>
					<h2 className="mt-0">How I got here</h2>
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
