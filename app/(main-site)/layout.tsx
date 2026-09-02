import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

import HeaderMain from "@/components/globals/header-main";
import FooterMain from "@/components/globals/footer-main";
import GridGlow from "@/components/effects/grid-glow";

const spaceSans = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

const interSans = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const jetMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JD Larrea",
  description: "Portfolio Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${spaceSans.variable} ${interSans.variable} ${jetMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
				<div className="grid-bg" aria-hidden="true" />
				<GridGlow />
				<div id="page">
					<HeaderMain />
					{children}
					<FooterMain />
				</div>
			</body>
    </html>
  );
}
