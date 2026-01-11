import type { PrettierOption } from './prettierOptions'

export const oxfmtOptions: PrettierOption[] = [
  {
    name: 'Object Wrap (Always)',
    key: 'objectWrap',
    description:
      'Oxfmt extends the objectWrap option with an additional "always" value that forces object literals to always span multiple lines, even if they could fit on one line.',
    defaultValue: 'preserve',
    cliOverride: '--object-wrap <preserve|collapse|always>',
    apiOverride: 'objectWrap: "<preserve|collapse|always>"',
    options: [
      {
        value: 'always',
        label: 'always (oxfmt only)',
        description: 'Always expand object literals to multiple lines',
        codeExample: `const obj = {
  foo: "bar",
};

const another = {
  a: 1,
  b: 2,
};`,
      },
    ],
  },
  {
    name: 'Insert Final Newline',
    key: 'insertFinalNewline',
    description:
      'Whether to insert a final newline at the end of the file.',
    defaultValue: true,
    cliOverride: '--insert-final-newline',
    apiOverride: 'insertFinalNewline: <bool>',
    options: [
      {
        value: true,
        label: 'true (default)',
        description: 'Add a newline at the end of every file',
        codeExample: `const message = "Hello";
export default message;
// File ends with a newline ↵`,
      },
      {
        value: false,
        label: 'false',
        description: 'Do not add a final newline',
        codeExample: `const message = "Hello";
export default message;
// File ends immediately after this line`,
      },
    ],
  },
  {
    name: 'Experimental Sort Imports',
    key: 'experimentalSortImports',
    description:
      'Sort import statements automatically. Supports custom groups, internal patterns, case sensitivity, and partitioning by comments or newlines.',
    defaultValue: false,
    cliOverride: '--experimental-sort-imports',
    apiOverride: 'experimentalSortImports: { ... }',
    options: [
      {
        value: false,
        label: 'disabled (default)',
        description: 'Do not sort import statements',
        codeExample: `import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import fs from "node:fs";`,
      },
      {
        value: true,
        label: 'enabled',
        description: 'Sort imports by groups: builtin, external, internal, parent, sibling, index',
        codeExample: `import fs from "node:fs";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";`,
      },
    ],
  },
  {
    name: 'Experimental Sort Package.json',
    key: 'experimentalSortPackageJson',
    description:
      'Automatically sort keys in `package.json` files according to a conventional order.',
    defaultValue: true,
    cliOverride: '--experimental-sort-package-json',
    apiOverride: 'experimentalSortPackageJson: <bool>',
    language: 'json',
    options: [
      {
        value: true,
        label: 'true (default)',
        description: 'Sort package.json keys in conventional order',
        codeExample: `{
  "name": "my-package",
  "version": "1.0.0",
  "description": "A package",
  "main": "index.js",
  "scripts": { ... },
  "dependencies": { ... },
  "devDependencies": { ... }
}`,
      },
      {
        value: false,
        label: 'false',
        description: 'Preserve original key order in package.json',
        codeExample: `{
  "scripts": { ... },
  "name": "my-package",
  "devDependencies": { ... },
  "version": "1.0.0",
  "dependencies": { ... }
}`,
      },
    ],
  },
  {
    name: 'Experimental Tailwind CSS',
    key: 'experimentalTailwindcss',
    description:
      'Enable Tailwind CSS class sorting in JSX class/className attributes. Supports custom attributes, functions (like clsx, cn, cva), and Tailwind v3/v4 configuration.',
    defaultValue: false,
    cliOverride: '--experimental-tailwindcss',
    apiOverride: 'experimentalTailwindcss: { ... }',
    language: 'tsx',
    options: [
      {
        value: false,
        label: 'disabled (default)',
        description: 'Do not sort Tailwind CSS classes',
        codeExample: `<div className="text-red-500 p-4 flex items-center bg-white mt-2">
  Content
</div>`,
      },
      {
        value: true,
        label: 'enabled',
        description: 'Sort Tailwind CSS classes according to recommended order',
        codeExample: `<div className="mt-2 flex items-center bg-white p-4 text-red-500">
  Content
</div>`,
      },
    ],
  },
  {
    name: 'Ignore Patterns',
    key: 'ignorePatterns',
    description:
      'Glob patterns to ignore files when formatting. Uses the current working directory as the root.',
    defaultValue: '[]',
    cliOverride: '--ignore-pattern <glob>',
    apiOverride: 'ignorePatterns: ["<glob>", ...]',
    options: [
      {
        value: '[]',
        label: 'empty (default)',
        description: 'No files are ignored by default',
        codeExample: `// All files are formatted
// src/index.ts ✓
// dist/bundle.js ✓
// node_modules/pkg/index.js ✓`,
      },
      {
        value: '["dist/**", "*.min.js"]',
        label: 'example patterns',
        description: 'Ignore dist folder and minified files',
        codeExample: `// With ignorePatterns: ["dist/**", "*.min.js"]
// src/index.ts ✓
// dist/bundle.js ✗ (ignored)
// lib/app.min.js ✗ (ignored)`,
      },
    ],
  },
]
