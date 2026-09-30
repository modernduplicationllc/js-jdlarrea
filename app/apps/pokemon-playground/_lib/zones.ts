import { type Rect } from "./types";
import { TREE_ZONE_BOXES } from "../_components/area-tree-cluster";
import { LAKE_ZONE_BOXES } from "../_components/area-lake";
import { DIRT_ZONE_BOXES } from "../_components/area-dirt";
import { GRASS_ZONE_BOXES } from "../_components/area-grass";
import { HOUSE_ZONE_BOXES } from "../_components/area-house";

type ZoneGroup = {
	name: string,
	rects: Rect[],
	debugColor: string,
	wander: boolean
}

export const ALL_ZONES: ZoneGroup[] = [
	{ name: 'trees', rects: TREE_ZONE_BOXES, debugColor: 'brown', wander: false },
	{ name: 'lake', rects: LAKE_ZONE_BOXES, debugColor: 'blue', wander: false },
	{ name: 'dirt', rects: DIRT_ZONE_BOXES, debugColor: 'yellow', wander: true },
	{ name: 'grass', rects: GRASS_ZONE_BOXES, debugColor: 'green', wander: true },
	{ name: 'house', rects: HOUSE_ZONE_BOXES, debugColor: 'pink', wander: false },
];
