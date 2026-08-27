"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const NAV_LINKS = [
	{ href: "/work", label: "Work" },
	{ href: "/apps", label: "Demo Apps" },
	{ href: "/about", label: "About" },
];

// Not a route — links directly to the PDF in /public once it's added.
const RESUME_HREF = "/resume.pdf";

export default function HeaderMain() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 border-b border-bdr-500 bg-bg-dark-900/85 backdrop-blur-md">
			<div className="wrapper flex h-header-height-mobile items-center justify-between brm10:h-header-height-desktop">
				<Link
					href="/"
					className="flex items-center gap-2.5 font-sans-alt text-[17px] font-semibold text-hdr-main-100"
				>
					<span className="size-1.5 rounded-[2px] bg-accent-500 shadow-[0_0_12px_1px_var(--color-accent-500)]" />
					jd.larrea
				</Link>

				<nav className="hidden items-center gap-9 brm10:flex">
					{NAV_LINKS.map((link) => {
						const isActive = pathname.startsWith(link.href);
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`text-sm font-medium transition-colors hover:text-accent-alt-300 ${
									isActive ? "text-accent-alt-300" : "text-body-300"
								}`}
							>
								{link.label}
							</Link>
						);
					})}

					<a
						href={RESUME_HREF}
						download
						className="text-sm font-medium text-body-300 transition-colors hover:text-accent-alt-300"
					>
						Resume
					</a>

					<a
						href="https://github.com"
						aria-label="GitHub"
						className="inline-flex size-8.5 items-center justify-center rounded-md text-body-500 transition-colors hover:bg-bg-dark-100 hover:text-hdr-main-100"
					>
						<GithubIcon size={18} />
					</a>

					<a
						href="https://linkedin.com"
						className="inline-flex items-center gap-2 rounded-md bg-hdr-main-100 px-4.5 py-2 text-[13.5px] font-semibold text-bg-dark-900 transition-colors hover:bg-accent-alt-100"
					>
						<LinkedinIcon size={15} />
						LinkedIn
					</a>
				</nav>
			</div>
		</header>
	);
}
