import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import { MSWComponent } from "@/mocks/MSWComponent";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import RegisterButton from "@/components/register/RegisterButton";

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
      <body className={`${pretendard.className} items-center bg-white`}>
        <div className="mx-auto max-w-[1200px]">
          <MSWComponent />
          <nav className="sticky top-0 z-[3] flex h-[80px] w-full flex-row items-center justify-center border-b-[1px] border-[#E4E4E4] bg-neutral-white-0 py-3">
            <div className="flex flex-1 flex-row items-center justify-center gap-[40px]">
              <Link href="/">
                <Image
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1719237353/match-mate/logo_k1evxe.png`}
                  alt="this is logo image"
                  className="w-[100px]"
                  width={150}
                  height={100}
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
        <footer className="mt-[100px] flex w-full items-center justify-center bg-gray-100 py-5">
          <section className="flex flex-col items-center gap-4 border">
            <Image src={logo} alt="footerlogo" width={50} height={50} />
            <div className="flex gap-[30px]">
              <div className="text-sm">전화: 010-0000-0000</div>
              <div className="text-sm">주소: 서울시 서울구 서울로 1234-7</div>
            </div>
            <div className="text-sm">Copyright © 2024 Match Mate</div>
          </section>
          {/* <section className="flex h-20 flex-row items-center gap-14">
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
            </section> */}
        </footer>
      </body>
    </html>
  );
}
