/** Static export so the site can be hosted on GitHub Pages (output goes to ./out). */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
