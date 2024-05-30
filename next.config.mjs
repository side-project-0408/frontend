/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;
