import Link from "next/link";

const WORDS = [
	"React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "PostgreSQL", "Neon", "Node.js", "NextAuth/Auth.js", "WordPress", "ACF", "Shopify", "HubSpot", "WooCommerce", "Supabase"
];

export default function WordList() {
	return (
		<section className="component bg-bg-dark-100">
			<div className="wrapper">
				<div className="mb-11 flex flex-wrap items-end justify-between gap-6">
					<div>
						<div className="super-header with-dash">tech stack</div>
						<h2 className="mt-0">What I build with</h2>
					</div>

					<p className="max-w-95 text-sm text-body-500">
						Filter the full project archive by any of these — most projects use several together.
					</p>
				</div>

				<div className="mb-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-bdr-500 bg-bdr-500 brm57:grid-cols-3 brm10:grid-cols-6">
					{WORDS.map((word) => (
						<div
							key={word}
							className="bg-bg-dark-300 px-4 py-5.5 text-center font-mono text-[13px] text-body-300 transition-colors hover:bg-bg-mid-500 hover:text-accent-alt-300"
						>
							{word}
						</div>
					))}
				</div>

				<Link
					href="/about"
					className="inline-flex items-center gap-1.5 text-sm text-accent-alt-300 hover:text-accent-alt-100"
				>
					More on my background and stack →
				</Link>
			</div>
		</section>
	);
}
