import Link from "next/link";

export default function HeroHome() {
	return (
		<section className="pt-20 pb-16 brm10:pt-27 brm10:pb-24">
			<div className="wrapper">
				<div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[12.5px] text-accent-alt-300 before:h-px before:w-4 before:bg-accent-500">
					TAMPA BAY, FL · AVAILABLE FOR SENIOR ROLES
				</div>

				<h1 className="!mt-0 max-w-190 !leading-[1.05]">
					Building durable web products, one{" "}
					<span className="text-accent-alt-100 not-italic">shipped project</span> at a
					time.
				</h1>

				<p className="mt-6 max-w-135 text-lg text-body-300">
					Senior developer with a decade in WordPress at marketing & digital agencies —
					now building custom web apps with Next.js, TypeScript, and Tailwind.
				</p>

				<p className="mt-3.5 font-mono text-[13.5px] text-body-500">
					{"// 10+ yrs shipping · 30+ projects · WordPress → Next.js"}
				</p>

				<div className="mt-10 flex flex-wrap items-center gap-3.5">
					<Link
						href="/work"
						className="inline-flex items-center gap-2 rounded-md bg-btn-primary-500 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-btn-primary-700"
					>
						View my work
					</Link>
					<a
						href="/resume-jdlarrea.pdf"
						download
						className="inline-flex items-center gap-2 rounded-md border border-bdr-500 px-6 py-3.5 text-[14.5px] font-medium text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100"
					>
						Download résumé
					</a>
				</div>
			</div>
		</section>
	);
}
