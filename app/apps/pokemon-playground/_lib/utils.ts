const SIZE_CANVAS = 640;

export type Position = { x: number, y:number };

export type Rect = {
	x: number,
	y: number,
	width: number,
	height: number
}

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
