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

  // dark: ban applies outside components/ui/
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: ["**/components/ui/**"],
    rules: {
      "no-restricted-syntax": ["warn", ...driftBans, darkModeBan],
    },
  },
];
