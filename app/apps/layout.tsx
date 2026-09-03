import type { Metadata } from "next";
import HeaderApps from "@/components/globals/header-apps";

export const metadata: Metadata = {
  title: "Apps",
  description: "Web Apps",
};

export default function AppsLayout({ children }: LayoutProps<"/">) {
  return (
		<div id="web-app">
			<HeaderApps />

			{children}
		</div>
  );
}
