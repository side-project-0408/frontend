import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import { MSWComponent } from "@/mocks/MSWComponent";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Header from "@/components/common/Header";
import FetchLoader from "@/components/common/FetchLoader";
const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Light.woff2",
      weight: "500",
      style: "nomal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "600",
      style: "nomal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
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
            <MSWComponent />
            <Header />
            <div className="mt-[30px] bg-white">{children}</div>
            {modal}
          </div>
          <footer className="mt-[100px] flex h-[130px] w-full bg-gray-100 py-5">
            <div className="mx-auto flex max-w-[1200px] flex-1 flex-row justify-between">
              <section className="flex flex-col gap-4">
                <Image src={logo} alt="footerlogo" width={50} height={50} />
                <div>
                  <div className="text-sm">전화: 010-0000-0000</div>
                  <div className="text-sm">
                    주소: 서울시 서울구 서울로 1234-7
                  </div>
                  <div className="text-sm">Copyright © 2024 Match Mate</div>
                </div>
              </section>
              <section className="flex h-20 flex-row items-center gap-14">
                <Link
                  href="https://www.naver.com"
                  target="_blank"
                  prefetch={false}
                  className="text-sm underline"
                >
                  개인정보 처리방침
                </Link>
                <Link
                  href="https://www.google.com"
                  target="_blank"
                  prefetch={false}
                  className="text-sm underline"
                >
                  이용 약관
                </Link>
                <Link
                  href="https://www.naver.com"
                  target="_blank"
                  prefetch={false}
                  className="text-sm underline"
                >
                  서비스 소개
                </Link>
              </section>
            </div>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
