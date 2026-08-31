"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItem = {
	year: string;
	title: string;
	description: string;
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
	},
];

export default function Timeline() {
	// -1 = nothing active yet (all dots start outline-only)
	const [activeIndex, setActiveIndex] = useState(-1);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
					if (index !== -1) setActiveIndex(index);
				}
			},
			// A single-pixel-tall trigger zone at the vertical center of the
			// viewport — an item is only "intersecting" while it overlaps that
			// line. We only ever act on isIntersecting:true, so the previously
			// active item naturally stays active through the gap between items
			// until the next one crosses center, in either scroll direction.
			{ rootMargin: "-50% 0px -50% 0px", threshold: 0 }
		);

		for (const el of itemRefs.current) {
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section className="component">
			<div className="wrapper">
				<div className="mb-13">
					<div className="super-header with-dash">the path here</div>
					<h2 className="mt-0">How I got here</h2>
				</div>

				<div className="relative max-w-190 before:absolute before:top-1.5 before:bottom-1.5 before:left-1.25 before:w-px before:bg-bdr-500">
					{TIMELINE.map((item, index) => (
						<div
							key={item.year}
							ref={(el) => {
								itemRefs.current[index] = el;
							}}
							className={`flex flex-col gap-2 brm57:flex-row brm57:items-start brm57:gap-6 ${
								index === TIMELINE.length - 1 ? "" : "pb-11"
							}`}
						>
							<div className="flex items-center gap-3">
								<span className="relative flex size-2.5 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 bg-bg-dark-900">
									<span
										className={`absolute inset-0 rounded-full bg-accent-500 transition-opacity duration-500 ${
											index === activeIndex ? "opacity-100" : "opacity-0"
										}`}
									/>
								</span>
								<span className="font-mono text-[13px] text-body-500">{item.year}</span>
							</div>

							<div className="pl-5.75 brm57:pl-0">
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
