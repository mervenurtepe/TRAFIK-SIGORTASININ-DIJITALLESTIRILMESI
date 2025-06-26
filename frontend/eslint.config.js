import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: undefined,
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/prop-types": "off"
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];