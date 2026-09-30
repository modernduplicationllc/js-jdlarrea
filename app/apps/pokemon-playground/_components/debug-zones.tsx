import { ALL_ZONES } from "../_lib/zones";

const DEBUG_ON = true;
const rectClass = 'absolute z-5 pointer-events-none';

export default function DebugZones() {
	if (!DEBUG_ON) return null;

	return (
		<>
			{
				ALL_ZONES.map( group => (
					group.rects.map( (rect, i) => {
						return <div
							key={`${group.name}-${i}`}
							style={{
								width: `${rect.width}%`,
								height: `${rect.height}%`,
								top: `${rect.y}%`,
								left: `${rect.x}%`,
								backgroundColor: group.debugColor,
								opacity: .3
							}}
							className={rectClass}
							data-wander={group.wander}
						/>
					})
				))
			}
		</>
	)
}
