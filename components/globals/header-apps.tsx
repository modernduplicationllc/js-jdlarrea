import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeaderApps() {
	return (
		<Link
			href="/apps"
			className="w-max flex items-center gap-x-2 rounded-br-sm mb-2 px-3 py-2 bg-accent-alt-500 text-white text-sm uppercase font-mono"
		>
			<ArrowLeft size={14} /> Back to Main Site
		</Link>
	)
}
