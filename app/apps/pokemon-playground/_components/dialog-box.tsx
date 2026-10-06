import { type ZoneGroup } from "../_lib/types"

type DialogProps = {
	activeZone: ZoneGroup | null,
	closeDialog: () => void
}

export default function DialogBox({activeZone, closeDialog}: DialogProps) {
	if (!activeZone) return null;

	return (
		<div className="flex flex-col items-center gap-y-3 bg-white rounded-lg border-2 border-black px-8 py-5 absolute top-1/2 left-1/2 z-15 translate-x-[-50%] translate-y-[-50%] text-center">
			Hello, this is the {activeZone.name} dialog box.
			<button
				onClick={closeDialog}
				className="block bg-blue-200 px-2 py-1 cursor-pointer transition-colors hover:bg-blue-300"
			>Close Out</button>
		</div>
	)
}
