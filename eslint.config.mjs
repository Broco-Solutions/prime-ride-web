import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "out/**", "build/**"],
  },
];

export default config;
