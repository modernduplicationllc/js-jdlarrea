import Image from "next/image";

export default function AboutIntro() {
	return (
		<section className="component">
			<div className="wrapper grid grid-cols-1 items-center gap-12 brm10:grid-cols-[1.15fr_0.85fr] brm10:gap-16">
				<div>
					<div className="super-header with-dash">about</div>
					<h1 className="!mt-0">A senior developer, expanding by design.</h1>

					<p className="max-w-130 text-base leading-relaxed text-body-300">
						I&apos;m J.D. — a senior web developer based in Tampa Bay, FL. Over the
						past 10+ years I&apos;ve built and led custom web projects at marketing
						and digital agencies and through independent client work — mostly on
						WordPress, along with Shopify and HubSpot CMS, across law firms,
						healthcare groups, SaaS startups, and beyond.
					</p>
					<p className="max-w-130 text-base leading-relaxed text-body-300">
						In 2026 I made a deliberate shift toward{" "}
						<strong className="font-semibold text-hdr-main-100">
							full-stack development with Next.js and TypeScript
						</strong>{" "}
						— deepening my range rather than replacing what I know. It&apos;s the
						same instinct for problem-solving and clean architecture, applied to a
						broader, more modern stack.
					</p>
					<p className="max-w-130 text-base leading-relaxed text-body-300">
						This site is where that transition lives in public: real projects, real
						code, and the occasional experiment that didn&apos;t need a client to
						justify building it.
					</p>
				</div>

				<div className="relative aspect-[4/4.6] w-full max-w-85 overflow-hidden rounded-lg border border-bdr-500 justify-self-center brm10:max-w-none brm10:justify-self-auto">
					<Image
						src="https://picsum.photos/seed/portrait/640/760"
						alt="Portrait of J.D. Larrea"
						fill
						sizes="(min-width: 1024px) 340px, 340px"
						className="object-cover saturate-[.9]"
					/>
					<div className="absolute right-3.5 bottom-3.5 left-3.5 rounded-md border border-bdr-500 bg-bg-dark-900/82 px-3.5 py-2.5 font-mono text-xs text-body-300 backdrop-blur-sm">
						{"// Tampa Bay, FL"}
					</div>
				</div>
			</div>
		</section>
	);
}
