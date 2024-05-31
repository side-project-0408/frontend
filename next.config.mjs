/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;
