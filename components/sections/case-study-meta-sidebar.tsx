import { Badge } from "@/components/ui/badge";
import type { ProjectMetadata } from "@/lib/definitions";

function MetaBlock({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
	return (
		<div>
			<div className="mb-2.5 font-mono text-[11px] tracking-widest text-body-500 uppercase">
				{label}
			</div>
			<div className={`text-[14.5px] ${muted ? "font-normal text-body-300" : "font-medium text-hdr-main-100"}`}>
				{value}
			</div>
		</div>
	);
}

export default function CaseStudyMetaSidebar({ project }: { project: ProjectMetadata }) {
	return (
		<aside className="flex flex-col gap-7 brm10:sticky brm10:top-30">
			{project.role && <MetaBlock label="Role" value={project.role} />}
			{project.client && <MetaBlock label="Client" value={project.client} muted />}
			<MetaBlock label="Industry" value={project.industry} muted />
			{project.timeframe && <MetaBlock label="Timeframe" value={project.timeframe} muted />}

			<div>
				<div className="mb-2.5 font-mono text-[11px] tracking-widest text-body-500 uppercase">
					Stack
				</div>
				<div className="flex flex-wrap gap-1.5">
					{project.stack.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							className="rounded-md border-accent-alt-700/30 bg-accent-alt-900/20 font-mono text-[11px] font-normal text-accent-alt-300"
						>
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</aside>
	);
}
