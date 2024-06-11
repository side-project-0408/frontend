import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/logo.png";
import { MSWComponent } from "@/mocks/MSWComponent";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import RegisterButton from "@/components/register/RegisterButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "match-mate",
    template: "match-mate | %s",
  },
  description: "이제 직접 제안받고 프로젝트해요!",
  //파비콘 추후에 생성
  icons: {
    icon: "",
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
      <body className={`${inter.className} items-center bg-white`}>
        <div className="mx-auto max-w-[1200px]">
          <MSWComponent />
          <nav className="sticky top-0 z-[3] flex h-[80px] w-full flex-row items-center justify-center border-b-[1px] border-[#E4E4E4] bg-neutral-white-0 py-3">
            <div className="flex flex-1 flex-row items-center justify-center gap-[40px]">
              <Link href="/">
                <Image
                  src={logo}
                  alt="this is logo image"
                  className="w-[100px]"
                ></Image>
              </Link>
              <div className="flex w-full flex-row justify-between">
                <section className="flex gap-20 text-[18px] font-medium text-[#363636]">
                  <Link href={"/project"}>Project</Link>
                  <Link href={"/people"}>People</Link>
                </section>
                <section className="flex gap-2.5">
                  <RegisterButton />
                  <Link href="/logout">로그아웃</Link>
                  <Link href="/login">로그인</Link>
                  <Link href="/mypage">마이페이지</Link>
                </section>
              </div>
            </div>
          </nav>
          <ReactQueryProvider>
            <div className="mt-[30px] bg-white">{children}</div>
            {modal}
          </ReactQueryProvider>
        </div>
        <footer className="mt-[100px] flex w-full bg-gray-100 py-5">
          <div className="mx-auto flex max-w-[1200px] flex-1 flex-row justify-between">
            <section>
              <div className="h-[50px] w-[150px]">이미지</div>
              <div className="text-sm">전화: 010-0000-0000</div>
              <div className="text-sm">주소: 서울시 서울구 서울로 1234-7</div>
              <div className="text-sm">Copyright © 2024 Match Mate</div>
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
      </body>
    </html>
  );
}
