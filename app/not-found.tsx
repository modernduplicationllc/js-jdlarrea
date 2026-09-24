import Link from "next/link";
import HeaderMain from "@/components/globals/header-main";
import FooterMain from "@/components/globals/footer-main";
import GridGlow from "@/components/effects/grid-glow";

export default function NotFoundPage() {
	return (
		<>
			<div className="grid-bg" aria-hidden="true" />
			<GridGlow />

			<div id="page" className="dark flex flex-col grow">
				<HeaderMain />

				<section className="component grow flex flex-col justify-center items-center text-center">
					<div className="wrapper">
						<h1>404: Page not found</h1>
						<p className="mb-6">
							The page you're looking for doesn't exist or may have moved.
						</p>
						<Link
							href="/"
							className="inline-flex items-center gap-2.5 rounded-md bg-btn-primary-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-btn-primary-700"
						>
							Back to home
						</Link>
					</div>
				</section>

				<FooterMain />
			</div>
		</>
	);
}
