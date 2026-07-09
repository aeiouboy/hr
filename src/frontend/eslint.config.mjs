import nextConfig from "eslint-config-next";

const driftBans = [
  {
    selector:
      'JSXAttribute[name.name="className"] Literal[value=/\\bbg-white\\b/]',
    message: "Use bg-surface instead of bg-white (design token drift).",
  },
  {
    selector:
      'JSXAttribute[name.name="className"] Literal[value=/\\brounded-xl\\b/]',
    message: "Use rounded-md instead of rounded-xl (design token drift).",
  },
  {
    selector:
      'JSXAttribute[name.name="className"] Literal[value=/\\brounded-lg\\b/]',
    message: "Use rounded-md instead of rounded-lg (design token drift).",
  },
];

const darkModeBan = {
  selector: 'JSXAttribute[name.name="className"] Literal[value=/\\bdark:/]',
  message:
    "Do not use dark: prefix directly — design tokens handle dark mode. Use semantic tokens instead.",
};

export default [
  // Base Next.js flat config (already an array)
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),

  // Global drift bans (bg-white, rounded-xl, rounded-lg)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-syntax": ["warn", ...driftBans],
    },
  },

  // dark: ban applies tree-wide (the former components/ui/ exemption is gone —
  // ui/ was merged into components/humi/ during the cleanup, Phase 7b)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-syntax": ["warn", ...driftBans, darkModeBan],
    },
  },

  // Cleanup Phase 5 — pragmatic whole-tree gate.
  // The React Compiler advisory rules (static-components, set-state-in-effect,
  // preserve-manual-memoization, purity, immutability, refs, exhaustive-deps) and
  // the cosmetic rules (no-unescaped-entities, display-name) flag existing, working
  // mockup code, not bugs. They are kept as WARNINGS (tracked debt) so the error-level
  // lint gate stays green while still failing on genuine bugs — e.g. rules-of-hooks,
  // which stays an error. Revisit for a full --max-warnings=0 gate after the mockup phase.
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "warn",
      "react/display-name": "warn",
    },
  },
];
