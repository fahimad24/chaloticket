/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      }, {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
