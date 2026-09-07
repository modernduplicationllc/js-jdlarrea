import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import shrub from "../_assets/terrain/shrub.png";
import tree from "../_assets/terrain/tree.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const shrubSize = spriteSize(32);
const treeSize = spriteSize(32);

const TERRAIN_PARTS = [
	{ src: shrub, size: shrubSize, x: 7.5, y: 7.5 },
	{ src: shrub, size: shrubSize, x: 15, y: 15 },
	{ src: shrub, size: shrubSize, x: 30, y: 30 },
	{ src: tree, size: treeSize, x: 10, y: 50 },
	{ src: tree, size: treeSize, x: 50, y: 15 },
	{ src: tree, size: treeSize, x: 70, y: 60 },
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
							guideClass,
							spriteClass,
						)}
						unoptimized
					/>
				))
			}
		</>
	)
}