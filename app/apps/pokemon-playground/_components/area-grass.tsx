import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import grass from "../_assets/grass.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const startX = 60;
const startY = 64;
const tileSize = spriteSize(16);

const GRASS_PARTS = [
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
	[ grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass ],
];

export default function AreaGrass() {
	return (
		<>
			{
				GRASS_PARTS.map( (grassRow, rowIndex) => (
					grassRow.map( (tileImg, colIndex) => {
						const xCoord = startX + colIndex * tileSize;
						const yCoord = startY + rowIndex * tileSize;

						return tileImg && <Image
							key={`${rowIndex}-${colIndex}`}
							src={tileImg}
							alt=""
							style={{
								width: `${tileSize}%`,
								top: `${yCoord}%`,
								left: `${xCoord}%`,
							}}
							className={cn(
								// guideClass,
								spriteClass,
							)}
							unoptimized
						/>
					})
				))
			}
		</>
	)
}
