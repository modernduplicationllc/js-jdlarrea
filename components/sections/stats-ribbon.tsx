type Stat = {
	number: string,
	description: string
}

export default function StatsRibbon( { items }: { items: Stat[] } ) {
	return (
		<div className="stats-ribbon">
			{
				items.map((item: Stat) => (
					<div className="stats-item">
						<div className="number">{item.number}</div>
						<div className="description">{item.description}</div>
					</div>
				))
			}
		</div>
	);
}
