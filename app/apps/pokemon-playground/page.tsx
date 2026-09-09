import { spriteSize } from "./_lib/utils";
import TerrainObjects from "./_components/terrain-objects";
import Character from "./_components/character";
import AreaLake from "./_components/area-lake";
import AreaGrass from "./_components/area-grass";
import AreaHouse from "./_components/area-house";
import AreaTreeCluster from "./_components/area-tree-cluster";

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
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
						backgroundSize: `${spriteSize(16)}% ${spriteSize(16)}%`,
					}}
				/>

				<Character />

				<TerrainObjects />
				<AreaLake />
				<AreaGrass />
				<AreaHouse />
				<AreaTreeCluster />
				</div>
			</section>
	)
}
