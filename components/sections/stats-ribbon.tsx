type Stat = {
	id: string;
	statNum: string;
	description: string;
}

export default function StatsRibbon( { items }: { items: Stat[] } ) {
	return (
		<div className="stats-ribbon bg-blue-800">
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
	);
}
