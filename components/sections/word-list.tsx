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
		<section className="component word-list">
			<div className="wrapper">
				{ header && (
					<div className="section-header">
						{ eyebrow && (
							<div className="eyebrow">{eyebrow}</div>
						)}

						<div className="bottom-content">
							{ header && (
								<div className="header-text">{header}</div>
							)}

							{ description && (
								<div className="description">{description}</div>
							)}
						</div>
					</div>
				)}


				<div className="grid-list">
					<div className="grid-item">WordPress</div>
					<div className="grid-item">Next.js</div>
					<div className="grid-item">TypeScript</div>
					<div className="grid-item">Tailwind</div>
					<div className="grid-item">ACF</div>
					<div className="grid-item">Shopify</div>
					<div className="grid-item">Neon</div>
					<div className="grid-item">Supabase</div>
					<div className="grid-item">HubSpot</div>
					<div className="grid-item">Gravity Forms</div>
					<div className="grid-item">WooCommerce</div>
					<div className="grid-item">React</div>
					<div className="grid-item">Node.js</div>
				</div>

				<div className="section-footer">
					<div className="future-button">More on my background and stack</div>
				</div>
			</div>
		</section>
	);
}
