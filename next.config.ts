import { execFileSync } from "node:child_process";
import { join } from "node:path";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // The privacy notice lives at /privacy; the earlier address stays valid.
  async redirects() {
    return [{ source: '/privacy-policy', destination: '/privacy', permanent: true }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Every production build, whether `npm run build` or `next build`, first runs the contact and launch guard: a trial
// build stops on demonstration or placeholder contacts, a launch build (NEXT_PUBLIC_ALLOW_INDEXING=true) also on
// missing contacts, domain, enquiry backend or sample records. It exits non-zero, which throws here and ends the build.
export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) execFileSync(process.execPath, [join(process.cwd(), "scripts/check-contacts.mjs"), process.cwd()], { stdio: "inherit" });
  return nextConfig;
}
