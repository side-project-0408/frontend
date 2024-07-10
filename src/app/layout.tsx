import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/common/Header";
import FetchLoader from "@/components/common/FetchLoader";
import Footer from "@/components/common/Footer";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Light.subset.woff2",
      weight: "500",
      style: "nomal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "600",
      style: "nomal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "nomal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "match-mate",
    template: "match-mate | %s",
  },
  description: "이제 직접 제안받고 프로젝트해요!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} items-center bg-white`}>
        <ReactQueryProvider>
          <FetchLoader />
          <div className="mx-auto max-w-[1200px]">
            {/* <MSWComponent /> */}
            <Header />
            <div className="mt-[30px] bg-white">{children}</div>
            {modal}
          </div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
