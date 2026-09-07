import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import lakeTl from "../_assets/terrain/lake-tl.png";
import lakeTc from "../_assets/terrain/lake-tc.png";
import lakeTr from "../_assets/terrain/lake-tr.png";
import lakeCl from "../_assets/terrain/lake-cl.png";
import lakeCc from "../_assets/terrain/lake-cc.png";
import lakeCr from "../_assets/terrain/lake-cr.png";
import lakeBl from "../_assets/terrain/lake-bl.png";
import lakeBc from "../_assets/terrain/lake-bc.png";
import lakeBr from "../_assets/terrain/lake-br.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const startX = 5;
const startY = 70;
const tileSize = spriteSize(32);

const LAKE_PARTS = [
	[ lakeTl, lakeTc, lakeTc, lakeTc, lakeTc, lakeTr ],
	[ lakeCl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ lakeCl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ lakeCl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ lakeBl, lakeBc, lakeBc, lakeBc, lakeBc, lakeBr ],
];

export default function AreaLake() {
	return (
		<>
			{
				LAKE_PARTS.map( (lakeRow, rowIndex) => (
					lakeRow.map( (tileImg, colIndex) => {
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
