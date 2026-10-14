/** @type {import('prettier').Config} */
const config = {
    tabWidth: 4,
    printWidth: 120,
    semi: true,
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
    tailwindFunctions: ["cn", "cva"],
    importOrder: [
        "<TYPES>",
        "<TYPES>^[.|..]",
        "",
        "^(react/(.*))|^(react$)",
        "^(next/(.*))|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@/(.*)",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "5.0.0",
};

export default config;
