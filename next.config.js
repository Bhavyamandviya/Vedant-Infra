/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "jrfjikviszoaohhqmlzn.supabase.co" }
    ]
  },
  // Keep the page-flip UMD bundle out of the server build —
  // it references `self` at module top-level and crashes Node.
  serverExternalPackages: ["react-pageflip", "page-flip"]
};

module.exports = nextConfig;
