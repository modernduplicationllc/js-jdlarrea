import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import shrub from "../_assets/shrub.png";
import tree from "../_assets/tree.png";
import sunflower from "../_assets/sunflower.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'outline outline-black/15';

const shrubSize = spriteSize(32);
const treeSize = spriteSize(32);
const sunflowerSize = spriteSize(32);

const TERRAIN_PARTS = [
	{ src: shrub, size: shrubSize, x: 10, y: 50 },
	{ src: shrub, size: shrubSize, x: 48, y: 9 },
	{ src: shrub, size: shrubSize, x: 40, y: 16 },
	{ src: shrub, size: shrubSize, x: 29, y: 23 },
	{ src: shrub, size: shrubSize, x: 22, y: 30 },
	{ src: shrub, size: shrubSize, x: 25, y: 40 },
	{ src: shrub, size: shrubSize, x: 30, y: 44 },
	{ src: shrub, size: shrubSize, x: 70, y: 42 },
	{ src: shrub, size: shrubSize, x: 85, y: 51 },
	{ src: shrub, size: shrubSize, x: 50, y: 78 },
	{ src: shrub, size: shrubSize, x: 55, y: 93 },
	{ src: shrub, size: shrubSize, x: 91, y: 93 },
	{ src: sunflower, size: sunflowerSize, x: 10, y: 66 },
	{ src: sunflower, size: sunflowerSize, x: 11, y: 81 },
	{ src: sunflower, size: sunflowerSize, x: 31, y: 87 },
	{ src: sunflower, size: sunflowerSize, x: 41, y: 67 },
	// { src: tree, size: treeSize, x: 50, y: 15 },
	// { src: tree, size: treeSize, x: 70, y: 60 },
];

export default function TerrainObjects() {
	return (
		<>
			{
				TERRAIN_PARTS.map( (terrainPart) => (
					<Image
						key={`${terrainPart.x}-${terrainPart.y}`}
						src={terrainPart.src}
						alt=""
						style={{
							width: `${terrainPart.size}%`,
							top: `${terrainPart.y}%`,
							left: `${terrainPart.x}%`,
						}}
						className={cn(
							// guideClass,
							spriteClass,
						)}
						unoptimized
					/>
				))
			}
		</>
	)
}