export default {
  "*.{html,liquid,?(c|m)js,js?(x),ts?(x)}": [
    "pnpm alex",
    "pnpm prettier --write",
    "pnpm eslint --fix --max-warnings 0",
  ],
  "*.md": [
    "pnpm alex",
    "pnpm prettier --write",
    "pnpm markdownlint-cli2 --fix",
  ],
};
