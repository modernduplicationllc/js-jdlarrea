import { type Direction } from "../_lib/types";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";

type DPadProps = {
	startMoving: (direction: Direction) => void,
	stopMoving: (direction: Direction) => void,
}

type ButtonObject = {
	direction: Direction,
	ariaLabel: string,
	Icon: LucideIcon
}

const KEY_DIRECTIONS: Record<string, Direction> = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
}

const BUTTONS: ButtonObject[] = [
	{ direction: "left", ariaLabel: "Move left", Icon: ArrowLeft},
	{ direction: "right", ariaLabel: "Move right", Icon: ArrowRight},
	{ direction: "up", ariaLabel: "Move up", Icon: ArrowUp},
	{ direction: "down", ariaLabel: "Move down", Icon: ArrowDown},
];

export default function DPad( {startMoving, stopMoving}: DPadProps) {
	// KEYBOARD - set directions
	useEffect(() => {
		function handleKeyDown( e: KeyboardEvent ) {
			const direction = KEY_DIRECTIONS[e.key];
			if (direction) {
				e.preventDefault();

				if (e.repeat) return;

				startMoving(direction);
			}
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

	return (
		<div className="controls absolute z-100 -bottom-10 right-0">
			{
				BUTTONS.map( ({direction, ariaLabel, Icon}) => (
					<Button
						key={direction}
						onPointerDown={() => startMoving(direction)}
						onPointerUp={() => stopMoving(direction)}
						onPointerLeave={() => stopMoving(direction)}
						onPointerCancel={() => stopMoving(direction)}
						aria-label={ariaLabel}
					>
						<Icon />
					</Button>
				))
			}
		</div>
	)
}