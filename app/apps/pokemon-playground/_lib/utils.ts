const SIZE_CANVAS = 640;

export type Position = { x: number, y:number };

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