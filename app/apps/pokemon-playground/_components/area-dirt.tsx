import Image from "next/image";
import { spriteSize, gridToRects } from "../_lib/utils";
import { cn } from "cn"

import dirtTl from "../_assets/dirt/dirt-tl.png";
import dirtTc from "../_assets/dirt/dirt-tc.png";
import dirtTr from "../_assets/dirt/dirt-tr.png";
import dirtCl from "../_assets/dirt/dirt-cl.png";
import dirtCc from "../_assets/dirt/dirt-cc.png";
import dirtCr from "../_assets/dirt/dirt-cr.png";
import dirtBl from "../_assets/dirt/dirt-bl.png";
import dirtBc from "../_assets/dirt/dirt-bc.png";
import dirtBr from "../_assets/dirt/dirt-br.png";
import dirtCrnTl from "../_assets/dirt/dirt-crn-tl.png";
import dirtCrnBr from "../_assets/dirt/dirt-crn-br.png";
import dirtCrnBl from "../_assets/dirt/dirt-crn-bl.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'outline outline-black/15';

const startX = 4;
const startY = 65;
const tileSize = spriteSize(32);

const DIRT_PARTS = [
	[ null, null, dirtTl, dirtTc, dirtTc, dirtTc, dirtTc, dirtTr ],
	[ dirtTl, dirtTc, dirtCrnTl, dirtCc, dirtCc, dirtCc, dirtCc, dirtCr ],
	[ dirtCl, dirtCc, dirtCc, dirtCc, dirtCc, dirtCc, dirtCc, dirtCr ],
	[ dirtBl, dirtBc, dirtCrnBl, dirtCc, dirtCc, dirtCrnBr, dirtBc, dirtBr ],
	[ null, null, dirtCl, dirtCc, dirtCc, dirtCr ],
	[ null, null, dirtBl, dirtBc, dirtBc, dirtBr ],
];

export const DIRT_ZONE_BOXES = gridToRects( DIRT_PARTS, startX, startY, tileSize );

export default function AreaDirt() {
	return (
		<>
			{
				DIRT_PARTS.map( (dirtRow, rowIndex) => (
					dirtRow.map( (tileImg, colIndex) => {
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
