"use client";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex h-full flex-1 flex-col justify-around">
      <section className="flex flex-col items-center gap-4">
        <Image src="/logo.svg" alt="매치메이트 로고" width={100} height={100} />
        <div className="whitespace-pre-line text-center text-xl font-extrabold">
          {`나에게 딱 맞는 팀 프로젝트 찾을 땐, \n 메치메이트`}
        </div>
      </section>
      <button
        className="h-[50px] w-full rounded-md bg-[#fae000] font-semibold"
        onClick={async () => {
          window.location.href =
            "https://api.match-mate.store/oauth2/authorization/kakao";
        }}
      >
        카카오 로그인
      </button>
    </div>
  );
}
