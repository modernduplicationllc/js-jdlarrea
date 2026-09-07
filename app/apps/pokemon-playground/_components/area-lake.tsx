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
	const tileSize = spriteSize(32);
	const stepSize = spriteSize(32);

	const lake_parts = [
		[ lake_tl, lake_tc, lake_tc, lake_tr ],
		[ lake_cl, lake_cc, lake_cc, lake_cr ],
		[ lake_cl, lake_cc, lake_cc, lake_cr ],
		[ lake_bl, lake_bc, lake_bc, lake_br ],
	];

	return (
		<>
			{
				lake_parts.map( (lake_row, row_index) => (
					lake_row.map( (tile_img, col_index) => {
						const x_coord = start_x + col_index * stepSize;
						const y_coord = start_y + row_index * stepSize;

						return <Image
							key={`${row_index}-${col_index}`}
							src={tile_img}
							alt=""
							style={{
								width: `${tileSize}%`,
								top: `${y_coord}%`,
								left: `${x_coord}%`,
							}}
							className={cn(
								cls_guides,
								cls_sprite,
							)}
							unoptimized
						/>
					})
				))
			}
		</>
	)
}
