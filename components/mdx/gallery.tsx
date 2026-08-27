import Image from "next/image";

export function Gallery({ images }: { images: string[] }) {
	return (
		<div className="mt-5 grid max-w-170 grid-cols-1 gap-4 brm57:grid-cols-2">
			{images.map((src) => (
				<div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-bdr-500">
					<Image src={src} alt="" fill sizes="340px" className="object-cover saturate-[.88]" />
				</div>
			))}
		</div>
	);
}
