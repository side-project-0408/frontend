"use client";

export default function Login() {
  return (
    <>
      <div>나에게 딱 맞는 팀 프로젝트 찾을 땐,</div>
      <div>매치메이트</div>
      <button
        onClick={() => {
          alert("kakao login!");
        }}
      >
        카카오 로그인
      </button>
    </>
  );
}
