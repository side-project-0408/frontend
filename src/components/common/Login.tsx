"use client";

export default function Login() {
  return (
    <div className="flex flex-col">
      <section>
        <div className="text-[24px] font-extrabold">
          나에게 딱 맞는 팀 프로젝트 찾을 땐,
        </div>
        <div className="text-[24px] font-extrabold">매치메이트</div>

        <button
          className="mt-[70px] h-[50px] w-full border bg-yellow-300"
          onClick={async () => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
          }}
        >
          카카오 로그인
        </button>
      </section>
    </div>
  );
}
