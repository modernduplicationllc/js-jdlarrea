import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

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
      className={`${spaceSans.variable} ${interSans.variable} ${jetMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
				{children}
			</body>
    </html>
  );
}
