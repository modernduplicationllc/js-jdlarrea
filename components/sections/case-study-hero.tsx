import Image from "next/image";
import Link from "next/link";
import type { ProjectMetadata } from "@/lib/definitions";

export default function CaseStudyHero({ project }: { project: ProjectMetadata }) {
	return (
		<section className="pt-10 brm10:pt-14">
			<div className="wrapper">
				<div className="mb-6 flex items-center gap-2 font-mono text-[12.5px] text-body-500">
					<Link href="/work" className="hover:text-accent-alt-300">Work</Link>
					<span className="text-bdr-700">/</span>
					<span className="text-body-300">{project.title}</span>
				</div>

				<div className="mb-9 flex flex-wrap items-start justify-between gap-8">
					<div>
						<h1 className="!mt-0 max-w-160">{project.title}</h1>
						<p className="max-w-130 text-base text-body-300">{project.summary}</p>
					</div>

					<div className="flex flex-shrink-0 flex-wrap gap-3">
						{project.liveUrl && (
							<a
								href={project.liveUrl}
								className="inline-flex items-center gap-2 rounded-md bg-btn-primary-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-btn-primary-700"
							>
								Visit live site
							</a>
						)}
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								className="inline-flex items-center gap-2 rounded-md border border-bdr-500 px-5 py-3 text-sm text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100"
							>
								Browse repo on GitHub
							</a>
						)}
					</div>
				</div>

				<div className="relative aspect-[16/7.2] w-full overflow-hidden rounded-lg border border-bdr-500">
					<Image
						src={project.thumbnail}
						alt={`${project.title} website screenshot`}
						fill
						sizes="100vw"
						priority
						className="object-cover saturate-[.88]"
					/>
				</div>

				<div className="mt-4 rounded-lg border border-bdr-500 bg-bg-dark-100 p-4 text-[12.5px] leading-relaxed text-body-500">
					<strong className="text-body-300">Note:</strong> screenshot and site link
					reflect this project as delivered. Client sites are sometimes redesigned or
					updated after handoff, which is outside my control — the live site may look
					different today.
				</div>
			</div>
		</section>
	);
}
