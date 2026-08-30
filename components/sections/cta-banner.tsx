import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/nav";
import { cn } from "@/lib/utils";

type CtaAction = {
	href: string;
	label: string;
	variant?: "primary" | "ghost";
	icon?: "github" | "linkedin";
};

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon };

export default function CtaBanner({
	header = "Hiring a web developer?",
	description = "// open to full-time, benefits-eligible roles",
	actions = [
		{ href: LINKEDIN_URL, label: "Connect on LinkedIn", variant: "primary", icon: "linkedin" },
		{ href: GITHUB_URL, label: "View GitHub", variant: "ghost", icon: "github" },
	],
}: {
	header?: string;
	description?: string;
	actions?: CtaAction[];
}) {
	return (
		<section className="component border-b-0 py-20 text-center brm10:py-28">
			<div className="wrapper thinnest">
				<h2>{header}</h2>
				<p className="mb-8.5 font-mono text-[15px] text-body-500">{description}</p>

				<div className="flex flex-wrap justify-center gap-3.5">
					{actions.map((action) => {
						const Icon = action.icon ? ICONS[action.icon] : null;
						const isPrimary = action.variant !== "ghost";
						const isExternal = action.href.startsWith("http");
						const className = cn(
							'inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 text-sm transition-colors',
							isPrimary ? 'bg-btn-primary-500 font-semibold text-white  hover:bg-btn-primary-700' :
							'border border-bdr-500 font-medium text-body-300 hover:border-accent-500 hover:text-hdr-main-100'
						)

						return isExternal ? (
							<a
								key={action.label}
								href={action.href}
								target="_blank"
								rel="noopener noreferrer"
								className={className}
							>
								{Icon && <Icon size={16} />}
								{action.label}
							</a>
						) : (
							<Link key={action.label} href={action.href} className={className}>
								{Icon && <Icon size={16} />}
								{action.label}
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
