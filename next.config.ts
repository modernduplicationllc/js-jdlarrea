import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // picsum.photos is only used for the /apps demo-app placeholder
    // thumbnails now — /work's real project covers are local files.
    // Remove once those demo apps get real screenshots.
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
