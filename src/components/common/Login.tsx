"use client";

export default function Login() {
  return (
    <div className="flex h-full flex-1 flex-col justify-center">
      <section>
        <div className="text-xl font-extrabold">
          나에게 딱 맞는 팀 프로젝트 찾을 땐,
        </div>
        <div className="text-xl font-extrabold">매치메이트</div>
      </section>
      <button
        className="h-[50px] w-full border border-black"
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
