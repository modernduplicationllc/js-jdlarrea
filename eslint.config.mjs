import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Raw apostrophes/quotes in JSX text are valid and render fine —
      // this rule only guards against rare edge cases, not real bugs.
      "react/no-unescaped-entities": "off",
      // This site deliberately uses "// text" as a recurring mono-text
      // design motif (stats, meta lines, etc.), not accidental comments.
      "react/jsx-no-comment-textnodes": "off",
    },
  },
]);

export default eslintConfig;
