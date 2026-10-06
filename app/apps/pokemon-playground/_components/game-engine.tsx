"use client";

import { useState } from "react";
import Character from "./character";
import DialogBox from "./dialog-box";
import { type ZoneGroup } from "../_lib/types";

export default function GameEngine() {
	const [activeZone, setActiveZone] = useState<ZoneGroup|null>(null);

	function handleBump( zone:ZoneGroup ) {
		console.log(`Handling ${zone.kind} ${zone.name} Zone`);

		setActiveZone(zone );
	}

	function handleClose() {
		console.log(`Closed out ${activeZone?.name} zone.`);

		setActiveZone( null );
	}

	return (
		<>
			<Character activeZone={activeZone} onBump={handleBump} />
			<DialogBox activeZone={activeZone} closeDialog={handleClose} />
		</>
	)
}
