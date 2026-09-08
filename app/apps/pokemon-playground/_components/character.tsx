'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";

export default function Character() {
	// STATE
	const [ coordX, setCoordX ] = useState(50);
	const [ coordY, setCoordY ] = useState(50);
	const STEP = 2.5

	// ON KEYDOWN
	useEffect(() => {
		function handleKeyDown( e: KeyboardEvent ) {
			if (e.key === 'ArrowLeft') move(-STEP, 0);
			if (e.key === 'ArrowRight') move(STEP, 0);
			if (e.key === 'ArrowUp') move(0, -STEP);
			if (e.key === 'ArrowDown') move(0, STEP);
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);

	}, []);

	// Function: update coords
	function move(dx: number, dy: number) {
		setCoordX( (x) => x + dx );
		setCoordY( (y) => y + dy );
	}

	return (
		<>
			<div
				className="character
				size-5 bg-black absolute z-10"
				style={{
					top: `${coordY}%`,
					left: `${coordX}%`,
				}}
			/>

			<div className="controls absolute z-100 bottom-0 right-0">
				<Button onClick={() => move(-STEP, 0)}><ArrowLeft /></Button>
				<Button onClick={() => move(STEP, 0)}><ArrowRight /></Button>
				<Button onClick={() => move(0, -STEP)}><ArrowUp /></Button>
				<Button onClick={() => move(0, STEP)}><ArrowDown /></Button>
			</div>
		</>
	)
}