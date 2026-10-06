export type Position = { x: number, y:number };

export type Direction = "up" | "down" | "left" | "right";

export type gameModes = 'exploring' | 'interaction' | 'sleeping';

export type Rect = {
	x: number,
	y: number,
	width: number,
	height: number
}

export type ZoneGroup = {
	name: "trees" | "lake" | "dirt" | "grass" | "house",
	rects: Rect[],
	debugColor: string,
	kind: "solid" | "walkable"
}
