"use client";

import { useState } from "react";
import Character from "./character";
import { gameModes } from "../_lib/types";

export default function GameEngine() {
	const [activeMode, setActiveMode] = useState<gameModes>('exploring');

	function handleBump(message: string) {
		console.log(message);
		console.log('updating Ref');

		setActiveMode('interaction');
	}

	return (
		<>
			<Character activeMode={activeMode} onBump={handleBump} />
		</>
	)
}
