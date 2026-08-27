import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";

export type DemoApp = {
	title: string;
	status: "live" | "in-progress" | "planned";
	why: string;
	description: string;
	tags: string[];
	thumbnail: string;
	liveUrl?: string;
	githubUrl?: string;
};

const STATUS_LABEL: Record<DemoApp["status"], string> = {
	live: "live",
	"in-progress": "in progress",
	planned: "planned",
};

const STATUS_DOT: Record<DemoApp["status"], string> = {
	live: "bg-accent-500",
	"in-progress": "bg-accent-alt-500",
	planned: "bg-body-700",
};

export default function DemoAppGrid({ apps }: { apps: DemoApp[] }) {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="grid grid-cols-1 gap-6 brm76:grid-cols-2">
					{apps.map((app) => (
						<div
							key={app.title}
							className="flex flex-col overflow-hidden rounded-lg border border-bdr-500 bg-bg-dark-100"
						>
							<div className="relative aspect-[7/4] w-full overflow-hidden border-b border-bdr-500">
								<Image
									src={app.thumbnail}
									alt=""
									fill
									sizes="(min-width: 768px) 50vw, 100vw"
									className="object-cover saturate-[.85]"
								/>
								<span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-bdr-500 bg-bg-dark-900/85 px-2.5 py-1 font-mono text-[11px] text-body-300 backdrop-blur-sm">
									<span className={`size-1.5 rounded-full ${STATUS_DOT[app.status]}`} />
									{STATUS_LABEL[app.status]}
								</span>
							</div>

							<div className="flex flex-1 flex-col gap-2.5 p-6">
								<div className="font-sans-alt text-lg font-semibold text-hdr-main-100">
									{app.title}
								</div>
								<div className="font-mono text-[12px] text-accent-alt-300">
									Why: {app.why}
								</div>
								<p className="text-sm leading-relaxed text-body-300">
									{app.description}
								</p>

								<div className="mt-1 flex flex-wrap gap-2">
									{app.tags.map((tag) => (
										<Badge
											key={tag}
											variant="outline"
											className="rounded-md border-accent-alt-700/30 bg-accent-alt-900/20 font-mono text-[11px] font-normal text-accent-alt-300"
										>
											{tag}
										</Badge>
									))}
								</div>

								<div className="mt-auto flex gap-5 pt-4">
									{app.liveUrl && (
										<a
											href={app.liveUrl}
											className="text-sm text-accent-alt-300 hover:text-accent-alt-100"
										>
											Visit site →
										</a>
									)}
									{app.githubUrl && (
										<a
											href={app.githubUrl}
											className="inline-flex items-center gap-1.5 text-sm text-body-300 hover:text-hdr-main-100"
										>
											<GithubIcon size={13} />
											GitHub
										</a>
									)}
									{!app.liveUrl && !app.githubUrl && (
										<span className="font-mono text-xs text-body-700">
											not started yet
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
