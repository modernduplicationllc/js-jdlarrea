import ArtBoardElements from "./_components/artboard-elements";
import GameEngine from "./_components/game-engine";

export default function Page() {
	return (
		<div id="app-page" className="flex justify-center pt-10 p-wrapper-gutter-mobile brm76:p-wrapper-gutter-desktop border-t">
			{ /* Game Window */ }
			<div id="game-window" className="w-full max-w-160 h-auto aspect-square bg-wa-pp-grass relative">

				<ArtBoardElements />
				<GameEngine />

			</div>
		</div>
	)
}
