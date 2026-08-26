type Stat = {
	id: string;
	statNum: string;
	description: string;
}

export default function StatsRibbon( { items }: { items: Stat[] } ) {
	return (
		<section className="component stats-ribbon">
			<div className="wrapper">
				{
					items.map((item) => (
						<div
							className="stats-item"
							key={item.id}
						>
							<div className="statNum">{item.statNum}</div>
							<div className="description">{item.description}</div>
						</div>
					))
				}
			</div>
		</section>
	);
}
