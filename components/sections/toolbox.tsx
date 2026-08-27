const TOOL_COLUMNS = [
	{
		label: "Platforms",
		items: ["WordPress & ACF", "Shopify", "HubSpot CMS", "WooCommerce", "Gravity Forms"],
	},
	{
		label: "Design",
		items: ["Figma (primary)", "Photoshop", "Adobe XD"],
	},
	{
		label: "Current stack",
		items: ["Next.js & TypeScript", "Tailwind CSS", "Neon Postgres", "NextAuth / Auth.js", "Vercel"],
	},
	{
		label: "Workflow",
		items: ["Cursor AI & VS Code", "GitHub Actions", "Notion", "LocalWP"],
	},
];

export default function Toolbox() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="mb-13">
					<div className="super-header with-dash">toolbox</div>
					<h2 className="!mt-0">What I reach for</h2>
				</div>

				<div className="grid grid-cols-1 gap-8 brm57:grid-cols-2 brm10:grid-cols-4">
					{TOOL_COLUMNS.map((column) => (
						<div key={column.label}>
							<div className="mb-4.5 border-b border-bdr-500 pb-3.5 font-mono text-[11px] tracking-widest text-body-500 uppercase">
								{column.label}
							</div>
							<ul className="flex flex-col gap-3">
								{column.items.map((item) => (
									<li
										key={item}
										className="flex items-center gap-2.5 text-sm text-body-300"
									>
										<span className="size-1.5 shrink-0 rounded-[1px] bg-accent-500" />
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
