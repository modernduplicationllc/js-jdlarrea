import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

export default function DPad({startMoving, stopMoving}: {startMoving: Function, stopMoving: Function}) {
	return (
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
	)
}