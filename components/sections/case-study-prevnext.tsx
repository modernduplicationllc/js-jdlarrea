import Link from "next/link";
import type { ProjectMetadata } from "@/lib/definitions";

function PrevNextLink({
	project,
	direction,
}: {
	project: ProjectMetadata;
	direction: "prev" | "next";
}) {
	const isNext = direction === "next";

	return (
		<Link
			href={`/work/${project.slug}`}
			className={`flex flex-col gap-2 border-bdr-500 px-8 py-11 transition-colors hover:bg-bg-dark-100 ${
				isNext ? "items-end text-right" : "items-start text-left border-r"
			}`}
		>
			<span className="font-mono text-[11.5px] text-body-500">
				{isNext ? "Next" : "Previous"}
			</span>
			<span className="font-sans-alt text-xl font-semibold">{project.title}</span>
		</Link>
	);
}

export default function CaseStudyPrevNext({
	previous,
	next,
}: {
	previous: ProjectMetadata | null;
	next: ProjectMetadata | null;
}) {
	if (!previous && !next) return null;

	return (
		<section className="border-t border-bdr-500">
			<div className="wrapper !px-0 grid grid-cols-1 brm76:grid-cols-2">
				{previous ? <PrevNextLink project={previous} direction="prev" /> : <div />}
				{next ? <PrevNextLink project={next} direction="next" /> : <div />}
			</div>
		</section>
	);
}
