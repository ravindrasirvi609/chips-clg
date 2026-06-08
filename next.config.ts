import type { NextConfig } from "next";

const cloudflarePublicHostname = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL
  ? new URL(process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "chips.ac.in",
      },
      {
        protocol: "https",
        hostname: "jssaherstoragenew.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "azpireeducations.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      ...(cloudflarePublicHostname
        ? [
            {
              protocol: "https" as const,
              hostname: cloudflarePublicHostname,
            },
          ]
        : []),
    ],
  },
  /* config options here */
};

export default nextConfig;
