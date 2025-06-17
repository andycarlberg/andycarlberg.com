import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import shopifyEslintPlugin from "@shopify/eslint-plugin";

export default defineConfig([
  eslintConfigPrettier,
  ...shopifyEslintPlugin.configs.esnext,
  ...shopifyEslintPlugin.configs.prettier,
  {
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "import-x/no-anonymous-default-export": "off",
    },
  },
]);
