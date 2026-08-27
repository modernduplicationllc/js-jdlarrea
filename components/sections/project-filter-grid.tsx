"use client";

import { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProjectCard from "@/components/sections/project-card";
import { INDUSTRIES, type ProjectMetadata } from "@/lib/definitions";

const PILL_CLASS =
	"rounded-full border border-bdr-500 bg-transparent px-4 py-1.5 text-sm text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100 data-pressed:border-accent-500 data-pressed:bg-accent-500 data-pressed:text-white";

const CHIP_CLASS =
	"rounded-md border border-accent-alt-700/30 bg-accent-alt-900/20 px-3 py-1.5 font-mono text-xs text-accent-alt-300 transition-colors hover:border-accent-alt-500 data-pressed:border-accent-500 data-pressed:bg-accent-500 data-pressed:text-white";

export default function ProjectFilterGrid({
	projects,
}: {
	projects: ProjectMetadata[];
}) {
	// Industry: single-select, empty array = "All"
	const [industryFilter, setIndustryFilter] = useState<string[]>([]);
	// Tech stack: multi-select, matches a project if it has ANY selected tag; empty array = no filter
	const [stackFilter, setStackFilter] = useState<string[]>([]);

	const stackOptions = useMemo(
		() => Array.from(new Set(projects.flatMap((project) => project.stack))),
		[projects]
	);

	const filtered = useMemo(() => {
		return projects.filter((project) => {
			const matchesIndustry =
				industryFilter.length === 0 || industryFilter.includes(project.industry);
			const matchesStack =
				stackFilter.length === 0 ||
				project.stack.some((tag) => stackFilter.includes(tag));
			return matchesIndustry && matchesStack;
		});
	}, [projects, industryFilter, stackFilter]);

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

					<div className="flex flex-col gap-2.5">
						<span className="font-mono text-[11px] tracking-widest text-body-500 uppercase">
							Tech stack (multi-select)
						</span>
						<ToggleGroup
							multiple
							value={stackFilter}
							onValueChange={setStackFilter}
							className="flex max-w-160 flex-wrap gap-2"
						>
							{stackOptions.map((tag) => (
								<ToggleGroupItem key={tag} value={tag} className={CHIP_CLASS}>
									{tag}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>

					<div className="pt-6 font-mono text-[12.5px] whitespace-nowrap text-body-500">
						{`// showing ${filtered.length} of ${projects.length}`}
					</div>
				</div>
			</section>

			<section className="component grid-section">
				<div className="wrapper">
					{filtered.length === 0 ? (
						<p className="text-body-300">No projects match those filters yet.</p>
					) : (
						<div className="grid grid-cols-1 gap-6 brm76:grid-cols-2 brd12:grid-cols-3">
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
