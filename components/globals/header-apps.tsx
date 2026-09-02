import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeaderApps() {
	return (
		<Link
			href="/apps"
			className="flex items-center gap-x-2 rounded-full px-3 py-2 fixed top-5 left-5 z-100 bg-accent-alt-500 text-white text-sm uppercase font-mono"
		>
			<ArrowLeft size={14} /> Back to Main Site
		</Link>
	)
}
