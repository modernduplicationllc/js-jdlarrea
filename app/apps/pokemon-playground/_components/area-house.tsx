import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import roofTl from "../_assets/terrain/roof-tl.png";
import roofTc from "../_assets/terrain/roof-tc.png";
import roofTr from "../_assets/terrain/roof-tr.png";
import roofBl from "../_assets/terrain/roof-bl.png";
import roofBc from "../_assets/terrain/roof-bc.png";
import roofBr from "../_assets/terrain/roof-br.png";
import houseL from "../_assets/terrain/house-l.png";
import houseC from "../_assets/terrain/house-c.png";
import houseR from "../_assets/terrain/house-r.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const startX = 43;
const startY = 43;
const tileSize = spriteSize(32);

const HOUSE_PARTS = [
	[ roofTl, roofTc, roofTr ],
	[ roofBl, roofBc, roofBr ],
	[ houseL, houseC, houseR ],
];

export default function AreaHouse() {
	return (
		<>
			{
				HOUSE_PARTS.map( (houseRow, rowIndex) => (
					houseRow.map( (tileImg, colIndex) => {
						const xCoord = startX + colIndex * tileSize;
						const yCoord = startY + rowIndex * tileSize;

						return <Image
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
