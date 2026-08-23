/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  // resolve agent/policy imports from repo root src/
  transpilePackages: [],
  outputFileTracingRoot: undefined,
};

export default nextConfig;
