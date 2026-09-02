import HeaderMain from "@/components/globals/header-main";
import FooterMain from "@/components/globals/footer-main";
import GridGlow from "@/components/effects/grid-glow";

export default function MainSiteLayout({ children }: LayoutProps<"/">) {
  return (
		<>
			<div className="grid-bg" aria-hidden="true" />
			<GridGlow />

			<div id="page" className="dark">
				<HeaderMain />
				{children}
				<FooterMain />
			</div>
		</>
  );
}
