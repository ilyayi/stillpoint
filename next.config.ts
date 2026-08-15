import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project is its own root — stops Next from walking up to a lockfile
  // outside the repository.
  turbopack: { root: process.cwd() },

  images: {
    // Modern formats, and sizes tuned for this layout (full-bleed bands,
    // 3-up cards, small step tiles).
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 128, 200, 320, 420],
    // Add your CDN or CMS host here if images ever move off /public:
    // remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Cached hard for a day, then served stale while it revalidates in
            // the background — so images stay fast, but replacing one at the
            // same filename actually reaches people. `immutable` would pin the
            // old picture in browser and CDN caches for a year.
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
