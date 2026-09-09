import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import lakeTl from "../_assets/lake/lake-tl.png";
import lakeTc from "../_assets/lake/lake-tc.png";
import lakeTr from "../_assets/lake/lake-tr.png";
import lakeCl from "../_assets/lake/lake-cl.png";
import lakeCc from "../_assets/lake/lake-cc.png";
import lakeCr from "../_assets/lake/lake-cr.png";
import lakeBl from "../_assets/lake/lake-bl.png";
import lakeBc from "../_assets/lake/lake-bc.png";
import lakeBr from "../_assets/lake/lake-br.png";
import lakeCrnBl from "../_assets/lake/lake-crn-bl.png";
import lakeCrnTr from "../_assets/lake/lake-crn-tr.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const startX = 55;
const startY = 5;
const tileSize = spriteSize(32);

const LAKE_PARTS = [
	[ lakeTl, lakeTc,lakeTc, lakeTc, lakeTr ],
	[ lakeCl, lakeCc, lakeCc,lakeCc, lakeCrnTr, lakeTc,lakeTc, lakeTr ],
	[ lakeCl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ lakeCl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ lakeBl, lakeBc, lakeCrnBl, lakeCc, lakeCc, lakeCc, lakeCc, lakeCr ],
	[ null, null, lakeBl, lakeBc, lakeBc,lakeBc,lakeBc, lakeBr ],
];

export default function AreaLake() {
	return (
		<>
			{
				LAKE_PARTS.map( (lakeRow, rowIndex) => (
					lakeRow.map( (tileImg, colIndex) => {
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
