import Image from "next/image";
import { spriteSize, gridToRects } from "../_lib/utils";
import { cn } from "cn"

// import clusterTl from "../_assets/tree-cluster/cluster-tl.png";
// import clusterTc from "../_assets/tree-cluster/cluster-tc.png";
// import clusterTr from "../_assets/tree-cluster/cluster-tr.png";
// import clusterCl from "../_assets/tree-cluster/cluster-cl.png";
import clusterCc from "../_assets/tree-cluster/cluster-cc.png";
import clusterCr from "../_assets/tree-cluster/cluster-cr.png";
import clusterBl from "../_assets/tree-cluster/cluster-bl.png";
// import clusterBc from "../_assets/tree-cluster/cluster-bc.png";
import clusterBr from "../_assets/tree-cluster/cluster-br.png";

const spriteClass = 'h-auto absolute z-1 pointer-events-none';
const guideClass = 'outline outline-black/15';

const startX = 0;
const startY = 0;
const tileSize = spriteSize(32);

const TREE_CLUSTER_GRID = [
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterBr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterCc, clusterCr ],
	[ clusterCc, clusterCc, clusterCc, clusterBr ],
	[ clusterCc, clusterCc, clusterBr ],
];

export const TREE_ZONE_BOXES = gridToRects( TREE_CLUSTER_GRID, startX, startY, tileSize );

export default function AreaTreeCluster() {
	return (
		<>
			{
				TREE_CLUSTER_GRID.map((clusterRow, rowIndex) => (
					clusterRow.map((tileImg, colIndex) => {
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
