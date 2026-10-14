import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // shortcut: niente cacheComponents/partialPrefetching, su Workers OpenNext 1.20.11 si blocca (opennextjs-cloudflare#1225); riattivali quando è risolto.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
