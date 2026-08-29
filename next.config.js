/** @type {import('next').NextConfig} */
const repoName = "promt";
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isDev ? "" : `/${repoName}`,
  assetPrefix: isDev ? "" : `/${repoName}/`,
};

module.exports = nextConfig;
