"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "next-client-cookies";

export default function KakaoLogin() {
  const router = useRouter();
  const cookies = useCookies();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    if (accessToken && refreshToken) {
      // access_token을 쿠키에 저장
      cookies.set("access_token", accessToken);
      cookies.set("refresh_token", refreshToken);

      // 로그인 처리가 완료되면 myAccount 페이지로 리디렉션
      router.push("/mypage");
    } else {
      // access_token이 없는 경우 적절한 처리
      console.error("Access token not found");
    }
  }, [cookies, router]);

  return (
    <div>
      <p>Logging in...</p>
    </div>
  );
}
