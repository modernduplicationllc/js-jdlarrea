import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { ProjectMetadata } from "@/lib/definitions";

const ACTION_CLASS =
	"inline-flex items-center gap-1.5 rounded-md border border-bdr-500 px-3.5 py-2 text-sm text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100";

export default function ProjectCard({ project }: { project: ProjectMetadata }) {
	return (
		<div className="flex flex-col overflow-hidden rounded-lg border border-bdr-500 bg-bg-dark-100">
			<div className="relative aspect-[16/8] w-full overflow-hidden border-b border-bdr-500">
				<Image
					src={project.thumbnail}
					alt=""
					fill
					sizes="(min-width: 1024px) 50vw, 100vw"
					className="object-cover saturate-[.85]"
				/>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-7">
				<Badge
					variant="outline"
					className="w-fit rounded-md border-bdr-500 bg-white/4 font-mono text-[11px] font-normal text-body-300"
				>
					{project.industry}
				</Badge>

				<div className="font-sans-alt text-xl font-semibold text-hdr-main-100">
					{project.title}
				</div>

				<p className="text-sm leading-relaxed text-body-300">{project.summary}</p>

				<div className="mt-auto flex flex-wrap gap-2.5 pt-4">
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={ACTION_CLASS}
						>
							Visit Site
							<ArrowUpRight size={15} />
						</a>
					)}

					{project.codeSnippet && (
						<Dialog>
							<DialogTrigger className={ACTION_CLASS}>
								Featured Code
								<Code2 size={15} />
							</DialogTrigger>

							<DialogContent className="max-w-2xl bg-bg-dark-100 ring-bdr-500">
								<DialogHeader>
									<DialogTitle className="font-mono text-sm text-body-300">
										{project.codeSnippet.filename}
									</DialogTitle>
								</DialogHeader>
								<pre className="max-h-[70vh] overflow-auto rounded-md border border-bdr-500 bg-bg-dark-900 p-5 font-mono text-[12.5px] leading-relaxed text-body-300">
									<code>{project.codeSnippet.code}</code>
								</pre>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
		</div>
	);
}
