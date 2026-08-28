const STATS = [
	{ statNum: "10+", description: "years experience" },
	{ statNum: "30+", description: "projects shipped" },
	{ statNum: "8+", description: "industries served" },
	{ statNum: "100%", description: "mobile responsive" },
];

export default function StatsRibbon() {
	return (
		<section className="border-y border-bdr-500">
			<div className="wrapper grid grid-cols-2 brm76:grid-cols-4">
				{STATS.map((item, index) => (
					<div
						className={`border-bdr-500 px-4 py-8 brm76:px-8 ${
							index % 2 === 0 ? "border-r" : ""
						} ${index < STATS.length - 1 ? "brm76:border-r" : "brm76:border-r-0"}`}
						key={item.statNum}
					>
						<div className="font-sans-alt text-3xl font-semibold text-hdr-main-100">
							{item.statNum}
						</div>
						<div className="mt-1.5 font-mono text-[12.5px] text-body-500">
							{`// ${item.description}`}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
