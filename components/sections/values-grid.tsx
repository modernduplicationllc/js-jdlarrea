const VALUES = [
	{
		num: "01",
		title: "Honest scope, honest timelines",
		description:
			"I'd rather tell you a project takes longer than promise a date I can't hit. Scope gets defined before numbers do.",
	},
	{
		num: "02",
		title: "Accessible by default",
		description:
			"WCAG AA contrast, semantic markup, and keyboard navigation get checked before a design ships — not patched in after.",
	},
	{
		num: "03",
		title: "Code that outlives the project",
		description:
			"Clean, documented, maintainable — built so the next developer (or future me) isn't cursing my name.",
	},
];

export default function ValuesGrid() {
	return (
		<section className="component border-b-0">
			<div className="wrapper">
				<div className="mb-13">
					<div className="super-header with-dash">how I work</div>
					<h2>Principles I don&apos;t compromise on</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 brm76:grid-cols-3">
					{VALUES.map((value) => (
						<div
							key={value.num}
							className="rounded-lg border border-bdr-500 bg-bg-dark-100 p-7"
						>
							<div className="mb-3.5 font-mono text-xs text-accent-alt-300">
								{value.num}
							</div>
							<div className="mb-2.5 font-sans-alt text-[17px] font-semibold text-hdr-main-100">
								{value.title}
							</div>
							<p className="text-[13.5px] leading-relaxed text-body-500">
								{value.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
