"use client";

import { useEffect, useRef } from "react";

// A soft light band that travels down the grid lines as the user scrolls,
// looping every viewport-height. Fully scroll-driven — it never animates on
// its own, and does nothing at all for prefers-reduced-motion, so it carries
// no WCAG 2.2.2 (Pause, Stop, Hide) obligation.
export default function GridGlow() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const el = ref.current;
		if (!el) return;

		let ticking = false;

		const update = () => {
			ticking = false;
			const period = window.innerHeight || 1;
			const y = window.scrollY % period;
			el.style.setProperty("--glow-y", `${y}px`);

			// Fade out near the top/bottom of each cycle so the wraparound
			// (y snapping from ~period back to 0) happens while invisible,
			// instead of reading as a sharp jump mid-glow.
			const fadeZone = Math.min(200, period * 0.25);
			const distanceFromEdge = Math.min(y, period - y);
			const fade = Math.min(1, distanceFromEdge / fadeZone);
			el.style.setProperty("--glow-fade", `${fade}`);
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return <div ref={ref} className="grid-glow" aria-hidden="true" />;
}
