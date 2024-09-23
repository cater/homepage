import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: [],
  },
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: '/poem',
        destination: 'https://v1.jinrishici.com/all.json',
      },
    ]
  }
};

export default withContentlayer(nextConfig);
