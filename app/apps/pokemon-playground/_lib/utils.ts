import { SIZE_CANVAS } from "./constants";
import { type ZoneGroup, type Position, type Rect } from "./types";

export function spriteSize( px: number ) {
	return (px / SIZE_CANVAS) * 100;
}

export function clamp( value: number, min: number, max: number ) {
	return Math.min(max, Math.max(min, value));
}

export function clampToCanvas( position: Position, size: number ): Position {
	const max = 100 - size;

	return {
		x: clamp( position.x, 0, max ),
		y: clamp( position.y, 0, max )
	}
}

export function rectsOverlap(a: Rect, b: Rect) {
	return (
		a.x < b.x + b.width &&
		b.x < a.x + a.width &&
		a.y < b.y + b.height &&
		b.y < a.y + a.height
	);
}

export function gridToRects( grid: unknown[][], startX: number, startY: number, tileSize: number): Rect[] {
	const rects: Rect[] = [];

	grid.forEach( (row, rowIndex) => {
		row.forEach( (cell, colIndex) => {
			if (!cell) return;

			rects.push({
				x: startX + colIndex * tileSize,
				y: startY + rowIndex * tileSize,
				width: tileSize,
				height: tileSize
			});
		})
	});

	return rects;
}

export function findOverlappingZone( zones:ZoneGroup[], box:Rect): ZoneGroup | null {
	const overlappedZone = zones.find(zone => (
		zone.rects.some(rect => (
			rectsOverlap(rect, box)
		))
	));

	return overlappedZone ?? null;
}
