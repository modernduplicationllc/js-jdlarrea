import { type Rect } from "../_lib/utils";
import { TREE_ZONE_BOXES } from "./area-tree-cluster";
import { LAKE_ZONE_BOXES } from "./area-lake";
import { DIRT_ZONE_BOXES } from "./area-dirt";
import { GRASS_ZONE_BOXES } from "./area-grass";
import { HOUSE_ZONE_BOXES } from "./area-house";

type ZoneGroup = {
	name: string,
	rects: Rect[],
	color: string,
	wander: boolean
}

const DEBUG_ON = true;
const rectClass = 'absolute z-5 pointer-events-none';

const ZONES: ZoneGroup[] = [
	{ name: 'trees', rects: TREE_ZONE_BOXES, color: 'brown', wander: false },
	{ name: 'lake', rects: LAKE_ZONE_BOXES, color: 'blue', wander: false },
	{ name: 'dirt', rects: DIRT_ZONE_BOXES, color: 'yellow', wander: true },
	{ name: 'grass', rects: GRASS_ZONE_BOXES, color: 'green', wander: true },
	{ name: 'house', rects: HOUSE_ZONE_BOXES, color: 'gray', wander: false },
];

export default function DebugZones() {
	if (!DEBUG_ON) return null;

	return (
		<>
			{
				ZONES.map( group => (
					group.rects.map( (rect, i) => {
						return <div
							key={`${group.name}-${i}`}
							style={{
								width: `${rect.width}%`,
								height: `${rect.height}%`,
								top: `${rect.y}%`,
								left: `${rect.x}%`,
								backgroundColor: group.color,
								opacity: .3
							}}
							className={rectClass}
							data-wander={group.wander}
						/>
					})
				))
			}
		</>
	)
}
