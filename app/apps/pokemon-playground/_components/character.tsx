"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "cn"
import { spriteSize, clampToCanvas, findOverlappingZone } from "../_lib/utils";
import { type Position, type Direction } from "../_lib/types";
import { SOLID_ZONES, WALKABLE_ZONES } from "../_lib/zones";

import DPad from "./d-pad";
import charStill from "../_assets/character/char-still.png";
import charMotion from "../_assets/character/char-motion.png";

type SpriteFrames = {
	still: number;
	walk: [number, number];
	flip?: boolean;
}

const guideClass = 'outline outline-black/15';

const MOVE_SPEED = 0.1;
const CHARACTER_SIZE = spriteSize(32);
const STILL_FRAME_COUNT = 3;
const MOTION_FRAME_COUNT = 6;
const WALK_FRAME_INTERVAL = 8;

const DIRECTION_DELTAS: Record<Direction, {dx: number; dy: number;}> = {
	up: { dx: 0, dy: -1 },
	down: { dx: 0, dy: 1 },
	left: { dx: -1, dy: 0 },
	right: { dx: 1, dy: 0 },
}

const DIRECTION_SPRITES: Record<Direction, SpriteFrames> = {
	up: { still: 1, walk: [2, 3] },
	down: { still: 0, walk: [0, 1] },
	left: { still: 2, walk: [4, 5], flip: true },
	right: { still: 2, walk: [4, 5] },
}

export default function Character() {
	// STATE
	const [ position, setPosition ] = useState<Position>({x: 47, y: 56});
	const [ facingDirection, setFacingDirection ] = useState<Direction>("down");
	const [ isMoving, setIsMoving ] = useState(false);
	const [ walkFrameIndex, setWalkFrameIndex ] = useState(0);

	const activeDirections = useRef<Set<Direction>>(new Set());
	const animationFrameId = useRef<number | null>(null);
	const walkFrameCounter = useRef(0);

	function startMoving(direction: Direction) {
		activeDirections.current.add(direction);
	}

	function stopMoving(direction: Direction) {
		activeDirections.current.delete(direction);
	}

	// GAME LOOP - runs every frame
	useEffect(() => {
		function tick() {
			const currentDirection = [...activeDirections.current].at(-1) ?? null;

			setIsMoving(currentDirection !== null);

			if (currentDirection) {
				setFacingDirection(currentDirection);

				const { dx, dy } = DIRECTION_DELTAS[currentDirection];

				setPosition((pos) => {
					const nextPosition = {
						x: pos.x + dx * MOVE_SPEED,
						y: pos.y + dy * MOVE_SPEED
					};

					const newPosition = clampToCanvas(nextPosition, CHARACTER_SIZE);

					const solidZone = findOverlappingZone( SOLID_ZONES, {...newPosition, width: CHARACTER_SIZE, height: CHARACTER_SIZE} );

					if (solidZone) {
						// do something.
						return pos;
					}

					return newPosition;
				});

				walkFrameCounter.current += 1;

				if (walkFrameCounter.current >= WALK_FRAME_INTERVAL) {
					walkFrameCounter.current = 0;
					setWalkFrameIndex((frame) => (frame === 0 ? 1 : 0));
				}
			}
			else {
				walkFrameCounter.current = 0;
			}

			animationFrameId.current = requestAnimationFrame(tick);
		}

		animationFrameId.current = requestAnimationFrame(tick);

		return () => {
			if (animationFrameId.current !== null) {
				cancelAnimationFrame(animationFrameId.current);
			}
		}
	}, []);

	const sprite = DIRECTION_SPRITES[facingDirection];
	const sheet = isMoving ? charMotion : charStill;
	const frameIndex = isMoving ? sprite.walk[walkFrameIndex] : sprite.still;
	const frameCount = isMoving ? MOTION_FRAME_COUNT : STILL_FRAME_COUNT;

	return (
		<>
			<div
				style={{
					top: `${position.y}%`,
					left: `${position.x}%`,
					width: `${CHARACTER_SIZE}%`,
					height: `${CHARACTER_SIZE}%`,
					backgroundImage: `url(${sheet.src})`,
					backgroundSize: `${frameCount * 100}% 100%`,
					backgroundPosition: `${(frameIndex / (frameCount - 1) * 100)}% 0%`,
					transform: sprite.flip ? "scaleX(-1)" : undefined,
					imageRendering: "pixelated",
				}}
				className={cn(
					// guideClass,
					'absolute z-10'
				)}
			/>

			<DPad startMoving={startMoving} stopMoving={stopMoving} />
		</>
	)
}
