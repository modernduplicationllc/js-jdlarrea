'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

import charStill from '../_assets/character/char-still.png';
import charMotion from '../_assets/character/char-motion.png';

type Direction = "up" | "down" | "left" | "right";
type SpriteFrames = {
	still: number;
	walk: [number, number];
	flip?: boolean;
}

const MOVE_SPEED = 0.1;
const FRAME_SIZE = 32;
const STILL_FRAME_COUNT = 3;
const MOTION_FRAME_COUNT = 6;
const WALK_FRAME_INTERVAL = 8;

const DIRECTION_DELTAS: Record<Direction, {dx: number; dy: number;}> = {
	up: { dx: 0, dy: -1 },
	down: { dx: 0, dy: 1 },
	left: { dx: -1, dy: 0 },
	right: { dx: 1, dy: 0 },
}

const KEY_DIRECTIONS: Record<string, Direction> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
}

const DIRECTION_SPRITES: Record<Direction, SpriteFrames> = {
	up: { still: 1, walk: [2, 3] },
	down: { still: 0, walk: [0, 1] },
	left: { still: 2, walk: [4, 5], flip: true },
	right: { still: 2, walk: [4, 5] },
}

export default function Character() {
	// STATE
	const [ coordX, setCoordX ] = useState(50);
	const [ coordY, setCoordY ] = useState(50);
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

	// KEYBOARD - set directions
	useEffect(() => {
		function handleKeyDown( e: KeyboardEvent ) {
			const direction = KEY_DIRECTIONS[e.key];
			if (direction) startMoving(direction);
		}

		function handleKeyUp( e: KeyboardEvent ) {
			const direction = KEY_DIRECTIONS[e.key];
			if (direction) stopMoving(direction);
		}

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		}

	}, []);

	// GAME LOOP - runs every frame
	useEffect(() => {
		function tick() {
			const currentDirection = [...activeDirections.current].at(-1) ?? null;

			setIsMoving(currentDirection !== null);

			if (currentDirection) {
				setFacingDirection(currentDirection);

				const { dx, dy } = DIRECTION_DELTAS[currentDirection];
				setCoordX((x) => x + dx * MOVE_SPEED);
				setCoordY((y) => y + dy * MOVE_SPEED);

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
				className="character absolute z-10"
				style={{
					top: `${coordY}%`,
					left: `${coordX}%`,
					width: FRAME_SIZE,
					height: FRAME_SIZE,
					backgroundImage: `url(${sheet.src})`,
					backgroundSize: `${frameCount * FRAME_SIZE}px ${FRAME_SIZE}px`,
					backgroundPosition: `-${frameIndex * FRAME_SIZE}px 0`,
					transform: sprite.flip ? "scaleX(-1)" : undefined,
					imageRendering: "pixelated",
				}}
			/>

			<div className="controls absolute z-100 -bottom-10 right-0">
				<Button
					onPointerDown={() => startMoving("left")}
					onPointerUp={() => stopMoving("left")}
					onPointerLeave={() => stopMoving("left")}
					onPointerCancel={() => stopMoving("left")}
				>
					<ArrowLeft />
				</Button>
				<Button
					onPointerDown={() => startMoving("right")}
					onPointerUp={() => stopMoving("right")}
					onPointerLeave={() => stopMoving("right")}
					onPointerCancel={() => stopMoving("right")}
				>
					<ArrowRight />
				</Button>
				<Button
					onPointerDown={() => startMoving("up")}
					onPointerUp={() => stopMoving("up")}
					onPointerLeave={() => stopMoving("up")}
					onPointerCancel={() => stopMoving("up")}
				>
					<ArrowUp />
				</Button>
				<Button
					onPointerDown={() => startMoving("down")}
					onPointerUp={() => stopMoving("down")}
					onPointerLeave={() => stopMoving("down")}
					onPointerCancel={() => stopMoving("down")}
				>
					<ArrowDown />
				</Button>
			</div>
		</>
	)
}
