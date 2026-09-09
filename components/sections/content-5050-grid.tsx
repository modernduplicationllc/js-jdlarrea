import Link from "next/link";

const DEMO_APPS = [
	{ title: "Food Tracker", tag: "Next.js · Neon" },
	{ title: "Pokémon Playground", tag: "Next.js · PokéAPI · Neon" },
	{ title: "Movie Diary", tag: "Next.js · Neon" },
	{ title: "Component Sandbox", tag: "React · Tailwind · shadcn/ui" },
];

export default function Content5050Grid() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="grid grid-cols-1 overflow-hidden rounded-lg border border-bdr-500 brm10:grid-cols-2">
					<div className="flex flex-col justify-center bg-bg-dark-100 p-8 brm10:p-12">
						<div className="super-header with-dash">demo-apps</div>
						<div className="mb-3.5 font-sans-alt text-[26px] font-semibold tracking-tight text-hdr-main-100">
							Small builds. No client brief — just me shipping something new.
						</div>
						<p className="mb-6.5 max-w-105 text-sm leading-relaxed text-body-500">
							A sandbox of experiments outside client work: a place to learn Next.js, Postgres, and full-stack patterns by actually building things, not just tutorials.
						</p>

						<Link
							href="/apps"
							className="inline-flex w-fit items-center gap-1.5 text-sm text-accent-alt-300 hover:text-accent-alt-100"
						>
							Explore demo apps →
						</Link>
					</div>

					<div className="grid grid-cols-2 gap-3.5 bg-bg-dark-300 p-7">
						{DEMO_APPS.map((app) => (
							<div
								key={app.title}
								className="rounded-lg border border-bdr-500 bg-bg-dark-900 p-4"
							>
								<div className="text-[12.5px] font-semibold text-body-100">
									{app.title}
								</div>
								<div className="mt-0.5 font-mono text-[10.5px] text-body-500">
									{app.tag}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
