"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "cn"
import { spriteSize, clampToCanvas, findOverlappingZone } from "../_lib/utils";
import { type Position, type Direction, type ZoneGroup } from "../_lib/types";
import { SOLID_ZONES, WALKABLE_ZONES } from "../_lib/zones";

import DPad from "./d-pad";
import charStill from "../_assets/character/char-still.png";
import charMotion from "../_assets/character/char-motion.png";

type SpriteFrames = {
	still: number;
	walk: [number, number];
	flip?: boolean;
}

type CharacterProps = {
	activeZone: ZoneGroup | null,
	onBump: (zone:ZoneGroup) => void
}

const guideClass = 'outline outline-black/15';

const MOVE_SPEED = 0.1;
const CHARACTER_SIZE = spriteSize(32);
const STILL_FRAME_COUNT = 3;
const MOTION_FRAME_COUNT = 6;
const WALK_FRAME_INTERVAL = 8;
const CHAR_START_POSITION = {x: 47, y: 56};

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

export default function Character({ activeZone, onBump }: CharacterProps) {
	// STATE
	const [ position, setPosition ] = useState<Position>(CHAR_START_POSITION);
	const [ facingDirection, setFacingDirection ] = useState<Direction>("down");
	const [ isMoving, setIsMoving ] = useState(false);
	const [ walkFrameIndex, setWalkFrameIndex ] = useState(0);

	const positionRef = useRef<Position>(CHAR_START_POSITION);
	const activeZoneRef = useRef<ZoneGroup>(activeZone);
	const activeDirections = useRef<Set<Direction>>(new Set());
	const animationFrameId = useRef<number | null>(null);
	const walkFrameCounter = useRef(0);

	function startMoving(direction: Direction) {
		activeDirections.current.add(direction);
	}

	function stopMoving(direction: Direction) {
		activeDirections.current.delete(direction);
	}

	// ACTIVE MODE - update mirrored Ref
	useEffect(() => {
		activeZoneRef.current = activeZone;
	}, [activeZone]);

	// GAME LOOP - runs every frame
	useEffect(() => {
		function tick() {
			animationFrameId.current = requestAnimationFrame(tick);

			if (activeZoneRef.current?.kind !== 'walkable') { return; }

			const currentDirection = [...activeDirections.current].at(-1) ?? null;

			setIsMoving( currentDirection !== null);

			if (currentDirection) {
				setFacingDirection(currentDirection);

				const { dx, dy } = DIRECTION_DELTAS[currentDirection];

				const nextPosition = {
					x: positionRef.current.x + dx * MOVE_SPEED,
					y: positionRef.current.y + dy * MOVE_SPEED
				};
				const newPosition = clampToCanvas(nextPosition, CHARACTER_SIZE);

				const solidZone = findOverlappingZone( SOLID_ZONES, {...newPosition, width: CHARACTER_SIZE, height: CHARACTER_SIZE} );

				if (solidZone) {
					setIsMoving(false);

					// do something.
					onBump( solidZone );

					return;
				}

				walkFrameCounter.current += 1;

				if (walkFrameCounter.current >= WALK_FRAME_INTERVAL) {
					walkFrameCounter.current = 0;
					setWalkFrameIndex((frame) => (frame === 0 ? 1 : 0));
				}

				positionRef.current = newPosition;
				setPosition(newPosition);
			}
			else {
				walkFrameCounter.current = 0;
			}
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
