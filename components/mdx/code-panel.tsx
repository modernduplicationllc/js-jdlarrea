export function CodePanel({
	filename,
	code,
	repoUrl,
}: {
	filename: string;
	code: string;
	repoUrl?: string;
}) {
	return (
		<div className="mt-2 max-w-170 overflow-hidden rounded-lg border border-bdr-500 bg-bg-dark-900">
			<div className="flex items-center justify-between border-b border-bdr-500 bg-bg-dark-100 px-4 py-3">
				<span className="font-mono text-[12.5px] text-body-300">{filename}</span>
				{repoUrl && (
					<a
						href={repoUrl}
						className="font-mono text-xs text-accent-alt-300 hover:text-accent-alt-100"
					>
						View in repo
					</a>
				)}
			</div>
			<pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-body-300">
				<code>{code}</code>
			</pre>
		</div>
	);
}
