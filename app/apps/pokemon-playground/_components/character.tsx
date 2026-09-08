'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

type Direction = "up" | "down" | "left" | "right";

const MOVE_SPEED = 0.1;

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

export default function Character() {
	// STATE
	const [ coordX, setCoordX ] = useState(50);
	const [ coordY, setCoordY ] = useState(50);
	const [ facingDirection, setFacingDirection ] = useState<Direction | null>(null);

	const activeDirections = useRef<Set<Direction>>(new Set());
	const animationFrameId = useRef<number | null>(null);

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

			setFacingDirection(currentDirection);

			if (currentDirection) {
				const { dx, dy } = DIRECTION_DELTAS[currentDirection];
				setCoordX((x) => x + dx * MOVE_SPEED);
				setCoordY((y) => y + dy * MOVE_SPEED);
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

	return (
		<>
			<div
				className="character
				size-4 bg-black absolute z-10"
				style={{
					top: `${coordY}%`,
					left: `${coordX}%`,
				}}
			/>

			<div className="controls absolute z-100 bottom-0 right-0">
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
