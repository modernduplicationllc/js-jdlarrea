import { type Rect, type ZoneGroup } from "./types";
import { TREE_ZONE_BOXES } from "../_components/area-tree-cluster";
import { LAKE_ZONE_BOXES } from "../_components/area-lake";
import { DIRT_ZONE_BOXES } from "../_components/area-dirt";
import { GRASS_ZONE_BOXES } from "../_components/area-grass";
import { HOUSE_ZONE_BOXES } from "../_components/area-house";

export const ALL_ZONES: ZoneGroup[] = [
	{ name: "trees", rects: TREE_ZONE_BOXES, debugColor: "brown", kind: "solid" },
	{ name: "lake", rects: LAKE_ZONE_BOXES, debugColor: "blue", kind: "solid" },
	{ name: "dirt", rects: DIRT_ZONE_BOXES, debugColor: "yellow", kind: "walkable" },
	{ name: "grass", rects: GRASS_ZONE_BOXES, debugColor: "green", kind: "walkable" },
	{ name: "house", rects: HOUSE_ZONE_BOXES, debugColor: "pink", kind: "solid" },
];

export const SOLID_ZONES = ALL_ZONES.filter(zone => zone.kind === "solid");
export const WALKABLE_ZONES = ALL_ZONES.filter(zone => zone.kind === "walkable");
