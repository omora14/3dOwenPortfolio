/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F's <Canvas> double-mounts under StrictMode in dev, which can exhaust
  // the browser's WebGL context budget on macOS and produce
  // "Error creating WebGL context". Keep it off so the GL context is created
  // exactly once.
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["three"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
