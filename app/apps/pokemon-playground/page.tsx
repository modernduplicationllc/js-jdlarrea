import Image from "next/image";
import shrub from "./_assets/terrain/shrub.png";
import { spriteSize } from "./_lib/utils";

export default function Page() {
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
				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className="h-auto
					absolute top-[10%] left-[10%]
					-translate-x-1/2
					-translate-y-1/2
					pointer-events-none"
					unoptimized
				/>
				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className="h-auto
					absolute top-[15%] left-[10%]
					-translate-x-1/2
					-translate-y-1/2
					pointer-events-none"
					unoptimized
				/>
				<Image
					src={shrub}
					alt=""
					style={{width: `${spriteSize(28)}%`}}
					className="h-auto
					absolute top-[10%] left-[15%]
					-translate-x-1/2
					-translate-y-1/2
					pointer-events-none"
					unoptimized
				/>
			</div>
		</section>
	)
}
