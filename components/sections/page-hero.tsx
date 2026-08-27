export default function PageHero({
	eyebrow,
	header,
	description,
}: {
	eyebrow: string;
	header: string;
	description?: string;
}) {
	return (
		<section className="component page-hero">
			<div className="wrapper thin">
				<div className="super-header with-dash">{eyebrow}</div>
				<h1>{header}</h1>
				{description && (
					<p className="max-w-150 text-lg text-body-300">{description}</p>
				)}
			</div>
		</section>
	);
}
