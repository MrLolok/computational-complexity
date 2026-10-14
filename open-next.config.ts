import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pagine tutte prerenderizzate e mai rigenerate a runtime: le serve dagli static assets del Worker.
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache });
