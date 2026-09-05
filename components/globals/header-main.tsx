"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { GITHUB_URL, LINKEDIN_URL, NAV_ITEMS, RESUME_HREF } from "@/lib/nav";
import MobileNav from "@/components/globals/mobile-nav";
import { cn } from "cn"

export default function HeaderMain() {
	const pathname = usePathname();

	const NAV_CLASSES = 'text-sm font-medium transition-colors hover:text-accent-alt-300';

	return (
		<header className="sticky top-0 z-50 border-b border-bdr-500 bg-bg-dark-900/85 backdrop-blur-md">
			<div className="wrapper flex h-header-height-mobile items-center justify-between brm10:h-header-height-desktop">
				<Link
					href="/"
					className="flex items-center gap-2.5 font-sans-alt text-[17px] font-semibold text-hdr-main-100"
				>
					<span className="size-1.5 rounded-xs bg-accent-500" />
					J.D. Larrea
				</Link>

				<nav className="hidden items-center gap-9 brm10:flex">
					{NAV_ITEMS.map((item) => {
						const isActive = item.href ? pathname.startsWith(item.href) : false;

						return (
							<Link
								key={item.label}
								href={item.href ?? "#"}
								className={cn(
									NAV_CLASSES,
									isActive ? "text-accent-alt-300" : "text-body-300"
								)}
							>
								{item.label}
							</Link>
						);
					})}

					<a
						href={RESUME_HREF}
						target="_blank"
						rel="noopener noreferrer"
						className={NAV_CLASSES}
					>
						Resume
					</a>

					<div className="flex items-center gap-1.5">
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="inline-flex size-9 items-center justify-center rounded-md bg-hdr-main-100 text-bg-dark-900 transition-colors hover:bg-accent-alt-100"
						>
							<GithubIcon size={16} />
						</a>

						<a
							href={LINKEDIN_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-9 items-center gap-2 rounded-md bg-hdr-main-100 px-4.5 text-[13.5px] font-semibold text-bg-dark-900 transition-colors hover:bg-accent-alt-100"
						>
							<LinkedinIcon size={15} />
							LinkedIn
						</a>
					</div>
				</nav>

				<MobileNav />
			</div>
		</header>
	);
}
