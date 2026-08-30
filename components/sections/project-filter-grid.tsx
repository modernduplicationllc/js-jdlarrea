"use client";

import { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProjectCard from "@/components/sections/project-card";
import { INDUSTRIES, type ProjectMetadata } from "@/lib/definitions";

const PILL_CLASS =
	"rounded-full border border-bdr-500 bg-transparent px-4 py-1.5 text-sm text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100 data-pressed:border-accent-500 data-pressed:bg-accent-500 data-pressed:text-white";

export default function ProjectFilterGrid({
	projects,
}: {
	projects: ProjectMetadata[];
}) {
	// Industry: single-select, empty array = "All"
	const [industryFilter, setIndustryFilter] = useState<string[]>([]);

	const filtered = useMemo(() => {
		if (industryFilter.length === 0) return projects;
		return projects.filter((project) => industryFilter.includes(project.industry));
	}, [projects, industryFilter]);

	return (
		<>
			<section className="border-b border-bdr-500 py-5">
				<div className="wrapper flex flex-wrap items-start justify-between gap-8">
					<div className="flex flex-col gap-2.5">
						<span className="font-mono text-[11px] tracking-widest text-body-500 uppercase">
							Industry
						</span>
						<div className="flex max-w-160 flex-wrap gap-2">
							<button
								type="button"
								onClick={() => setIndustryFilter([])}
								data-pressed={industryFilter.length === 0 ? "" : undefined}
								aria-pressed={industryFilter.length === 0}
								className={PILL_CLASS}
							>
								All
							</button>
							<ToggleGroup
								value={industryFilter}
								onValueChange={setIndustryFilter}
								className="flex flex-wrap gap-2"
							>
								{INDUSTRIES.map((industry) => (
									<ToggleGroupItem
										key={industry}
										value={industry}
										className={PILL_CLASS}
									>
										{industry}
									</ToggleGroupItem>
								))}
							</ToggleGroup>
						</div>
					</div>

					<div className="pt-6 font-mono text-[12.5px] whitespace-nowrap text-body-500">
						{`// showing ${filtered.length} of ${projects.length}`}
					</div>
				</div>
			</section>

			<section className="component grid-section">
				<div className="wrapper">
					<p className="mb-8 max-w-160 text-sm text-body-500">
						* Live links reflect each site as it exists today — clients update and redesign
						independently, so a site may look different from when I worked on it.
					</p>

					{filtered.length === 0 ? (
						<p className="text-body-300">No projects match those filters yet.</p>
					) : (
						<div className="grid grid-cols-1 gap-5 brm76:grid-cols-2 brd12:grid-cols-3">
							{filtered.map((project) => (
								<ProjectCard key={project.slug} project={project} />
							))}
						</div>
					)}
				</div>
			</section>
		</>
	);
}
