export type ResultStat = {
	num: string;
	label: string;
	reported?: boolean;
};

export function ResultStrip({ results }: { results: ResultStat[] }) {
	return (
		<div className="my-6 grid max-w-170 grid-cols-1 gap-px overflow-hidden rounded-lg border border-bdr-500 bg-bdr-500 brm57:grid-cols-3">
			{results.map((result) => (
				<div key={result.label} className="bg-bg-dark-100 p-5">
					<div
						className={`font-sans-alt text-2xl font-semibold ${
							result.reported ? "text-hdr-main-100" : "text-accent-alt-300"
						}`}
					>
						{result.num}
					</div>
					<div className="mt-1 font-mono text-[11.5px] text-body-500">
						{result.label}
					</div>
				</div>
			))}
		</div>
	);
}
