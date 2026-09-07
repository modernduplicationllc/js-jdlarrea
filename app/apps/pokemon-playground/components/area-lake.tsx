import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import lake_tl from "../_assets/terrain/lake-tl.png";
import lake_tc from "../_assets/terrain/lake-tc.png";
import lake_tr from "../_assets/terrain/lake-tr.png";
import lake_cl from "../_assets/terrain/lake-cl.png";
import lake_cc from "../_assets/terrain/lake-cc.png";
import lake_cr from "../_assets/terrain/lake-cr.png";
import lake_bl from "../_assets/terrain/lake-bl.png";
import lake_bc from "../_assets/terrain/lake-bc.png";
import lake_br from "../_assets/terrain/lake-br.png";

export default function AreaLake() {
	const cls_sprite = 'h-auto absolute pointer-events-none';
	const cls_guides = 'border border-1 border-black/15';

	const start_x = 10;
	const start_y = 70;

	const lake_parts = [
		[
			{ img: 'tl', x: 10, y: 70 },
			{ img: 'tc', x: 15, y: 70 },
			{ img: 'tc', x: 20, y: 70 },
			{ img: 'tr', x: 25, y: 70 },
		],
		[
			{ img: 'cl', x: 10, y: 75 },
			{ img: 'cc', x: 15, y: 75 },
			{ img: 'cc', x: 20, y: 75 },
			{ img: 'cr', x: 25, y: 75 },
		],
		[
			{ img: 'cl', x: 10, y: 80 },
			{ img: 'cc', x: 15, y: 80 },
			{ img: 'cc', x: 20, y: 80 },
			{ img: 'cr', x: 25, y: 80 },
		],
		[
			{ img: 'bl', x: 10, y: 85 },
			{ img: 'bc', x: 15, y: 85 },
			{ img: 'bc', x: 20, y: 85 },
			{ img: 'br', x: 25, y: 85 },
		],
	];

	return (
		<>
			{
				lake_parts.map( (lake_row) => (
					lake_row.map( (part) => (
						<Image
							key={part.img + part.x.toString()}
							src={`../_assets/terrain/lake-${part.img}.png`}
							alt=""
							style={{width: `${spriteSize(32)}%`}}
							className={cn(
								cls_guides,
								cls_sprite,
								`top-[${part.y}%] left-[${part.y}%]`,
							)}
							unoptimized
						/>
					))
				))
			}
		</>
	)
}
