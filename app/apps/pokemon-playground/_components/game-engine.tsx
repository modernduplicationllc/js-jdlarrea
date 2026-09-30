"use client";

import { useState } from "react";
import Character from "./character";

export default function GameEngine() {
	const [activeMode, setActiveMode] = useState('exploring');

	return (
		<>
			<Character />
		</>
	)
}
