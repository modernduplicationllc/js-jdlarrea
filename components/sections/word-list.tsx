import Link from "next/link";
import { SectionHeader } from '@/lib/definitions';

export default function WordList({
	sectionHeader,
	words,
}: {
	sectionHeader: SectionHeader,
	words: string[]
}) {
	const { eyebrow, header, description, sectionLink } = sectionHeader;

	return (
		<section className="component bg-bg-dark-100">
			<div className="wrapper">
				{ header && (
					<div className="mb-11 flex flex-wrap items-end justify-between gap-6">
						<div>
							{ eyebrow && (
								<div className="super-header with-dash">{eyebrow}</div>
							)}

							{ header && (
								<div className="!mt-0 h2">{header}</div>
							)}
						</div>

						{ description && (
							<p className="max-w-95 text-sm text-body-500">{description}</p>
						)}
					</div>
				)}

				<div className="mb-7 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-bdr-500 bg-bdr-500 brm57:grid-cols-3 brm10:grid-cols-6">
					{words.map((word) => (
						<div
							key={word}
							className="bg-bg-dark-300 px-4 py-5.5 text-center font-mono text-[13px] text-body-300 transition-colors hover:bg-bg-mid-500 hover:text-accent-alt-300"
						>
							{word}
						</div>
					))}
				</div>

				{ sectionLink && (
					<Link
						href={sectionLink.url}
						target={sectionLink.new_tab ? "_blank" : undefined}
						className="inline-flex items-center gap-1.5 text-sm text-accent-alt-300 hover:text-accent-alt-100"
					>
						{sectionLink.text} →
					</Link>
				)}
			</div>
		</section>
	);
}
