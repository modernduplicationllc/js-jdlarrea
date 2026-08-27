import type { MDXComponents } from "mdx/types";

// Headings already pick up the site's h1-h6 styles from app/globals.css —
// these overrides only cover the tags that need case-study-specific spacing.
const components: MDXComponents = {
  p: (props) => <p className="mb-4 max-w-170 text-body-300" {...props} />,
  ul: (props) => <ul className="mb-4 max-w-170 list-disc pl-5 text-body-300" {...props} />,
  li: (props) => <li className="mb-1 leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-hdr-main-100" {...props} />,
  a: (props) => <a className="text-accent-alt-300 hover:text-accent-alt-100" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
