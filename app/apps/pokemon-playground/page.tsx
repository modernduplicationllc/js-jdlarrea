import Image from "next/image";
import shrub from "./_assets/terrain/shrub.png";
import { spriteSize } from "./_lib/utils";
import { cn } from "cn"

export default function Page() {
	const cls_shrub = 'h-auto absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none';
	const cls_guides = 'border border-1 border-black/15';

	return (
		<section className="canvas-container
		flex justify-center
		mt-10 p-wrapper-gutter-mobile brm76:p-wrapper-gutter-desktop
		border-t">
			<div className="canvas-main
			w-full max-w-160 h-auto
			aspect-square
			bg-wa-pp-grass
			relative"
			>
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
						backgroundSize: `${spriteSize(16)}% ${spriteSize(16)}%`,
					}}
				/>

				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className={cn(
						cls_guides,
						cls_shrub,
						'top-[10%] left-[10%]',
					)}
					unoptimized
				/>
				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className={cn(
						cls_guides,
						cls_shrub,
						'top-[15%] left-[10%]',
					)}
					unoptimized
				/>
				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className={cn(
						cls_guides,
						cls_shrub,
						'top-[10%] left-[15%]',
					)}
					unoptimized
				/>
			</div>
		</section>
	)
}
