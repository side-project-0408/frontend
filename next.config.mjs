/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
