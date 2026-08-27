import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // picsum.photos is only used for placeholder project thumbnails —
    // remove once real screenshots live in /public.
    remotePatterns: [{ hostname: "picsum.photos" }],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
