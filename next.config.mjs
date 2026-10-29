/** Static export so the site can be hosted on GitHub Pages (output goes to ./out). */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig = {
  output: "export",
  basePath: base,
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
