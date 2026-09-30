import AreaHouse from "./area-house";
import AreaTreeCluster from "./area-tree-cluster";
import AreaGrass from "./area-grass";
import AreaLake from "./area-lake";
import AreaDirt from "./area-dirt";
import TerrainObjects from "./terrain-objects";
import DebugZones from "./debug-zones";

export default function ArtBoardElements() {
	return (
		<>
			<AreaHouse />
			<AreaTreeCluster />
			<AreaGrass />
			<AreaLake />
			<AreaDirt />
			<TerrainObjects />

			<DebugZones />
		</>
	)
}
