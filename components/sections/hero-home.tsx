import Link from "next/link";
import { RESUME_HREF } from "@/lib/nav";

export default function HeroHome() {
	return (
		<section className="pt-20 pb-16 brm10:pt-27 brm10:pb-24">
			<div className="wrapper">
				<div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[12.5px] text-accent-alt-300 before:h-px before:w-4 before:bg-accent-500">
					TAMPA BAY, FL • AVAILABLE FOR SENIOR ROLES
				</div>

				<h1 className="mt-0 max-w-190 leading-[1.05]">
					Senior web developer — a decade in WordPress, now building <span className="text-accent-alt-100 not-italic">full-stack</span>.
				</h1>

				<p className="mt-6 max-w-180 text-lg text-body-300">
					I've spent 10+ years building custom WordPress sites for marketing and digital agencies. In 2026 I started expanding into full-stack development — React, Next.js, TypeScript, and PostgreSQL — to build complete, interactive web applications.
				</p>

				<p className="mt-3.5 font-mono text-[13.5px] text-body-500">
					// from first client call to post-launch support
				</p>

				<div className="mt-10 flex flex-wrap items-center gap-3.5">
					<Link
						href="/work"
						className="inline-flex items-center gap-2 rounded-md bg-btn-primary-500 px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-btn-primary-700"
					>
						View my work
					</Link>
					<a
						href={RESUME_HREF}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md border border-bdr-500 px-6 py-3.5 text-[14.5px] font-medium text-body-300 transition-colors hover:border-accent-500 hover:text-hdr-main-100"
					>
						View résumé
					</a>
				</div>
			</div>
		</section>
	);
}
