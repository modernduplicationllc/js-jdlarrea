"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { GITHUB_URL, LINKEDIN_URL, NAV_ITEMS, RESUME_HREF, type NavItem } from "@/lib/nav";
import { cn } from "cn"

function HamburgerIcon({ open }: { open: boolean }) {
	const HAMBURGER_BAR_CLASSES = 'h-0.5 w-full bg-current'
	return (
		<span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
			<span
				className={cn(
					HAMBURGER_BAR_CLASSES,
					'origin-cener transition-transform',
					open ? 'translate-y-2 rotate-45' : ''
				)}
			/>
			<span
				className={cn(
					HAMBURGER_BAR_CLASSES,
					'transition-all',
					open ? 'scale-x-0 opacity-0' : ''
				)}
			/>
			<span
				className={cn(
					HAMBURGER_BAR_CLASSES,
					'origin-cener transition-transform',
					open ? '-translate-y-2 -rotate-45' : ''
				)}
			/>
		</span>
	);
}

export default function MobileNav() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [activeItem, setActiveItem] = useState<NavItem | null>(null);

	const close = () => setIsOpen(false);

	return (
		<>
			<button
				type="button"
				aria-expanded={isOpen}
				aria-controls="mobile-nav-panel"
				aria-label={isOpen ? "Close menu" : "Open menu"}
				onClick={() => setIsOpen((open) => !open)}
				className="flex size-9 items-center justify-center rounded-md text-hdr-main-100 brm10:hidden"
			>
				<HamburgerIcon open={isOpen} />
			</button>

			<Sheet
				open={isOpen}
				onOpenChange={(open) => {
					setIsOpen(open);
					if (!open) setActiveItem(null);
				}}
			>
				<SheetContent
					id="mobile-nav-panel"
					side="left"
					showCloseButton={false}
					className="gap-0 border-bdr-500 bg-bg-dark-100 p-0 data-[side=left]:w-4/5 data-[side=left]:max-w-[375px]"
				>
					{activeItem ? (
						<div className="flex h-full flex-1 flex-col overflow-y-auto p-5">
							<button
								type="button"
								onClick={() => setActiveItem(null)}
								className="mb-5 flex items-center gap-1.5 text-sm text-body-300 hover:text-hdr-main-100"
							>
								<ChevronLeft size={16} />
								Back
							</button>

							{activeItem.children?.map((child) => (
								<div key={child.label} className="border-b border-bdr-500 py-3">
									{child.href ? (
										<Link
											href={child.href}
											onClick={close}
											className="block text-base text-body-100"
										>
											{child.label}
										</Link>
									) : (
										<span className="block text-base text-body-100">{child.label}</span>
									)}

									{/* 3rd level: nested/indented in place, not a further drill-in panel */}
									{child.children && child.children.length > 0 && (
										<div className="mt-2 flex flex-col gap-2.5 pl-3.5">
											{child.children.map((grandchild) => (
												<Link
													key={grandchild.label}
													href={grandchild.href ?? "#"}
													onClick={close}
													className="text-sm text-body-500 hover:text-accent-alt-300"
												>
													{grandchild.label}
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="flex h-full flex-1 flex-col overflow-y-auto p-5 pt-8">
							<nav className="flex flex-col">
								{NAV_ITEMS.map((item) => {
									const isActive = item.href ? pathname.startsWith(item.href) : false;
									const hasChildren = !!item.children?.length;

									return (
										<div key={item.label} className="border-b border-bdr-500">
											{hasChildren ? (
												<button
													type="button"
													onClick={() => setActiveItem(item)}
													className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-body-100"
												>
													{item.label}
													<ChevronRight size={16} className="text-body-500" />
												</button>
											) : (
												<Link
													href={item.href ?? "#"}
													onClick={close}
													className={cn(
														'block py-4 text-base font-medium',
														isActive ? 'text-accent-alt-300' : 'text-body-100'
													)}
												>
													{item.label}
												</Link>
											)}
										</div>
									);
								})}
							</nav>

							<div className="mt-auto flex flex-col gap-4 pt-8">
								<a
									href={RESUME_HREF}
									target="_blank"
									rel="noopener noreferrer"
									onClick={close}
									className="text-sm font-medium text-body-300"
								>
									Resume
								</a>

								<div className="flex items-center gap-2">
									<a
										href={GITHUB_URL}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="GitHub"
										onClick={close}
										className="inline-flex size-9 items-center justify-center rounded-md bg-hdr-main-100 text-bg-dark-900"
									>
										<GithubIcon size={16} />
									</a>

									<a
										href={LINKEDIN_URL}
										target="_blank"
										rel="noopener noreferrer"
										onClick={close}
										className="inline-flex h-9 items-center gap-2 rounded-md bg-hdr-main-100 px-4.5 text-[13.5px] font-semibold text-bg-dark-900"
									>
										<LinkedinIcon size={15} />
										LinkedIn
									</a>
								</div>
							</div>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</>
	);
}
