import Image from "next/image";
import { spriteSize } from "../_lib/utils";
import { cn } from "cn"

import shrub from "../_assets/terrain/shrub.png";
import tree from "../_assets/terrain/tree.png";

export default function TerrainObjects() {
	const cls_sprite = 'h-auto absolute pointer-events-none';
	const cls_guides = 'border border-1 border-black/15';

	return (
		<>
			<Image
				src={shrub}
				alt=""
				style={{width: `${spriteSize(32)}%`}}
				className={cn(
					cls_guides,
					cls_sprite,
					'top-[7.5%] left-[7.5%]',
				)}
				unoptimized
			/>

			<Image
				src={shrub}
				alt=""
				style={{width: `${spriteSize(32)}%`}}
				className={cn(
					cls_guides,
					cls_sprite,
					'top-[15%] left-[10%]',
				)}
				unoptimized
			/>

			<Image
				src={shrub}
				alt=""
				style={{width: `${spriteSize(32)}%`}}
				className={cn(
					cls_guides,
					cls_sprite,
					'top-[10%] left-[15%]',
				)}
				unoptimized
			/>

			<Image
				src={tree}
				alt=""
				style={{width: `${spriteSize(32)}%`}}
				className={cn(
					cls_guides,
					cls_sprite,
					'top-[40%] left-[50%]',
				)}
				unoptimized
			/>

			<Image
				src={tree}
				alt=""
				style={{width: `${spriteSize(32)}%`}}
				className={cn(
					cls_guides,
					cls_sprite,
					'top-[50%] left-[50%]',
				)}
				unoptimized
			/>
		</>
	)
}