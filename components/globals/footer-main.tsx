export default function FooterMain() {
	return (
		<footer className="border-t border-bdr-500 py-9">
			<div className="wrapper flex flex-col items-center gap-4 text-[13px] text-body-500 brm76:flex-row brm76:justify-between">
				<div>© 2026 J.D. Larrea. Built with Next.js.</div>
				<div className="flex gap-6">
					<a href="https://github.com/jdlarrea" className="hover:text-hdr-main-100">GitHub</a>
					<a href="https://www.linkedin.com/in/jdlarrea/" className="hover:text-hdr-main-100">LinkedIn</a>
					<a href="/resume-jdlarrea.pdf" download className="hover:text-hdr-main-100">Résumé</a>
				</div>
			</div>
		</footer>
	);
}
