import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProjectMetadata } from "@/lib/definitions";

export default function ProjectCard({ project }: { project: ProjectMetadata }) {
	return (
		<Link
			href={`/work/${project.slug}`}
			className="group flex flex-col overflow-hidden rounded-lg border border-bdr-500 bg-bg-dark-100 transition-colors hover:border-accent-500"
		>
			<div className="relative aspect-[4/2.7] w-full overflow-hidden border-b border-bdr-500">
				<Image
					src={project.thumbnail}
					alt=""
					fill
					sizes="(min-width: 1024px) 33vw, 100vw"
					className="object-cover saturate-[.85]"
				/>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-6">
				<div className="font-sans-alt text-lg font-semibold text-hdr-main-100">
					{project.title}
				</div>

				<p className="text-sm leading-relaxed text-body-300">{project.summary}</p>

				<div className="mt-auto flex flex-wrap gap-2 pt-2">
					{project.stack.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							className="rounded-md border-accent-alt-700/30 bg-accent-alt-900/20 font-mono text-[11px] font-normal text-accent-alt-300"
						>
							{tag}
						</Badge>
					))}
					<Badge
						variant="outline"
						className="rounded-md border-bdr-500 bg-white/4 font-mono text-[11px] font-normal text-body-300"
					>
						{project.industry}
					</Badge>
				</div>
			</div>
		</Link>
	);
}
