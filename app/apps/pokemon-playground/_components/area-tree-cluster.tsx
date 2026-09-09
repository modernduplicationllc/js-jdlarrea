import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import clusterTl from "../_assets/tree-cluster/cluster-tl.png";
import clusterTc from "../_assets/tree-cluster/cluster-tc.png";
import clusterTr from "../_assets/tree-cluster/cluster-tr.png";
import clusterCl from "../_assets/tree-cluster/cluster-cl.png";
import clusterCc from "../_assets/tree-cluster/cluster-cc.png";
import clusterCr from "../_assets/tree-cluster/cluster-cr.png";
import clusterBl from "../_assets/tree-cluster/cluster-bl.png";
import clusterBc from "../_assets/tree-cluster/cluster-bc.png";
import clusterBr from "../_assets/tree-cluster/cluster-br.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'border border-1 border-black/15';

const tileSize = spriteSize(32);

// One hand-authored grid, not a repeated fixed 3x3 unit — each row can be
// a different length, so the shape can be irregular/lumpy rather than a
// rectangle. `cc` (no distinguishing edge) is used on the top and left of
// every row, since this mass is meant to bleed off the world's top-left
// corner. Real edge caps (`cr`/`bc`/`br`) only appear where the forest
// actually ends within the visible field — the staircase shape (each row
// same-width-or-narrower than the one above) keeps that unambiguous: a
// row's rightmost cell gets `cr` normally, or `br` if the row below it
// doesn't reach that column (i.e. nothing continues below), and the very
// last row gets `bc`/`br` across the board since nothing continues below
// any of it.
const TREE_CLUSTER_GRID = [
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterBr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterBr ],
	[ clusterBl, clusterCc, clusterBr ],
];

export default function AreaTreeCluster() {
	return (
		<>
			{
				TREE_CLUSTER_GRID.map((clusterRow, rowIndex) => (
					clusterRow.map((tileImg, colIndex) => {
						const xCoord = colIndex * tileSize;
						const yCoord = rowIndex * tileSize;

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
