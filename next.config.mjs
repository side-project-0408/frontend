/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "t1.kakaocdn.net",
        port: "",
        pathname: "/account_images/default_profile.jpeg.twg.thumb.R640x640",
      },
    ],
  },
};

export default nextConfig;
