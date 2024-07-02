import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const accessToken = getCookie("access_token");
  return (
    <nav className="sticky top-0 z-[3] flex h-[80px] w-full flex-row items-center justify-center border-b-[1px] border-[#E4E4E4] bg-neutral-white-0 py-3">
      <div className="flex flex-1 flex-row items-center justify-center gap-[40px]">
        <Link href="/">
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1719237353/match-mate/logo_k1evxe.png`}
            alt="this is logo image"
            className="w-[100px]"
            width={150}
            height={100}
          />
        </Link>
        <div className="flex w-full flex-row justify-between">
          <section className="flex gap-20 text-[18px] font-medium text-[#363636]">
            <Link href={"/project"}>Project</Link>
            <Link href={"/people"}>People</Link>
          </section>
          <section className="flex gap-2.5">
            {accessToken ? (
              <Link href="/login">로그인</Link>
            ) : (
              <Link href="/logout">로그아웃</Link>
            )}
            <Link href="/mypage">마이페이지</Link>
          </section>
        </div>
      </div>
    </nav>
  );
}
