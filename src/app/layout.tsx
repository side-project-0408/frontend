import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/logo.png";
import { MSWComponent } from "@/mocks/MSWComponent";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWComponent />
        <nav className="fixed flex h-[80px] w-full flex-row items-center border border-black bg-white px-[360px] py-3">
          <Link href="/">
            <Image
              src={logo}
              alt="this is logo image"
              className="w-[100px]"
            ></Image>
          </Link>
          <div className="flex w-full flex-row justify-between">
            <section className="ml-24 flex gap-20 border border-black text-[18px] font-medium text-[#363636]">
              <Link href={"project"}>Project</Link>
              <Link href={"people"}>People</Link>
            </section>
            <section className="flex gap-2.5 border border-black">
              <Link href={"logout"}>로그아웃</Link>
              <Link href={"login"}>로그인</Link>
              <Link href={"myinfo"}>마이페이지</Link>
            </section>
          </div>
        </nav>
        <ReactQueryProvider>
          <div className="bg-white px-[360px]">{children}</div>
        </ReactQueryProvider>
        <footer className="flex flex-col items-center border border-black">
          <section className="flex h-20 flex-row items-center gap-14">
            <div>전화: 010-0000-0000</div>
            <div>주소: 서울시 서울구 서울로 1234-7</div>
            <Link
              href="https://www.naver.com"
              target="_blank"
              prefetch={false}
              className="underline"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="https://www.google.com"
              target="_blank"
              prefetch={false}
              className="underline"
            >
              이용 약관
            </Link>
          </section>
          <div>Copyright © 2024 Match Mate</div>
        </footer>
      </body>
    </html>
  );
}
