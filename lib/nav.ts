export type NavItem = {
	label: string;
	href?: string; // omit for a parent that's purely a drill-in trigger
	children?: NavItem[];
};

// Shared by the desktop nav and the mobile slideout — one menu, two renderings.
// `children` supports up to 2 drill-in levels on mobile (see mobile-nav.tsx);
// nothing here uses them yet, but the shape is ready for when a page needs one.
export const NAV_ITEMS: NavItem[] = [
	{ label: "Work", href: "/work" },
	{ label: "Demo Apps", href: "/apps" },
	{ label: "About", href: "/about" },
];

// Not a route — links directly to the PDF in /public.
export const RESUME_HREF = "/resume-jonathan-larrea.pdf";
export const GITHUB_URL = "https://github.com/jdlarrea";
export const LINKEDIN_URL = "https://www.linkedin.com/in/jdlarrea/";
