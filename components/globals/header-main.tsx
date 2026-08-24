import Link from "next/link";

export default function HeaderMain() {
	return (
		<div className="header-main">
			<div className="logo">logo goes here</div>

			<div className="nav-items">
				<Link href="/work">Work</Link>
				<Link href="/apps">Demo Apps</Link>
				<Link href="/about">About</Link>
				<Link href="/resume">Resume</Link>
			</div>

			<div className="header-links">
				<Link href="https://github.com">github</Link>
				<Link href="https://linkedin.com">linkedin</Link>
			</div>
		</div>
	);
}
