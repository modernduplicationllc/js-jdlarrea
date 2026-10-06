import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import shrub from "../_assets/shrub.png";
import sunflower from "../_assets/sunflower.png";
import tree from "../_assets/tree.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'outline outline-black/15';

const shrubSize = spriteSize(32);
const sunflowerSize = spriteSize(32);
const treeSize = spriteSize(32);

const SHRUB_PARTS = [
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
];

const SUNFLOWER_PARTS = [
	{ src: sunflower, size: sunflowerSize, x: 9, y: 65 },
	{ src: sunflower, size: sunflowerSize, x: 10, y: 85 },
	{ src: sunflower, size: sunflowerSize, x: 43, y: 67 },
	{ src: sunflower, size: sunflowerSize, x: 33, y: 87 },
];

const TREEFILLER_PARTS = [
	{ src: tree, size: treeSize, x: 40, y: 0 },
	{ src: tree, size: treeSize, x: 36, y: 5 },
	{ src: tree, size: treeSize, x: 35, y: 10 },
	{ src: tree, size: treeSize, x: 30, y: 14 },
	{ src: tree, size: treeSize, x: 20.25, y: 19 },
	{ src: tree, size: treeSize, x: 16, y: 25 },
	{ src: tree, size: treeSize, x: 10.5, y: 30 },
];

export default function TerrainObjects() {
	return (
		<>
			{
				SHRUB_PARTS.map( (shrubPart) => (
					<Image
						key={`${shrubPart.x}-${shrubPart.y}`}
						src={shrubPart.src}
						alt=""
						style={{
							width: `${shrubPart.size}%`,
							top: `${shrubPart.y}%`,
							left: `${shrubPart.x}%`,
						}}
						className={cn(
							// guideClass,
							spriteClass,
						)}
						unoptimized
					/>
				))
			}

			{
				SUNFLOWER_PARTS.map( (sunflowerPart) => (
					<Image
						key={`${sunflowerPart.x}-${sunflowerPart.y}`}
						src={sunflowerPart.src}
						alt=""
						style={{
							width: `${sunflowerPart.size}%`,
							top: `${sunflowerPart.y}%`,
							left: `${sunflowerPart.x}%`,
						}}
						className={cn(
							// guideClass,
							spriteClass,
						)}
						unoptimized
					/>
				))
			}

			{
				TREEFILLER_PARTS.map( (treefillerPart) => (
					<Image
						key={`${treefillerPart.x}-${treefillerPart.y}`}
						src={treefillerPart.src}
						alt=""
						style={{
							width: `${treefillerPart.size}%`,
							top: `${treefillerPart.y}%`,
							left: `${treefillerPart.x}%`,
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