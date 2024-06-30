"use client";

import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  let router = useRouter();

  const access_token = getCookie("access_token") as string;

  const handleRegisterProject = () => {
    console.log(access_token ? "/register" : "/login");
    router.push(access_token ? "/register" : "/login");
  };

  // TODO: 로그인 여부에 따라 처리 필요. 리프레시 토큰 처리 필요. 30분 지나면 로그아웃 처리 필요.

  const handleRefreshToken = async () => {
    const { data: newAccessToken } = await getRefreshedToken();
    console.log("result", newAccessToken);

    setCookie("access_token", newAccessToken);
  };

  const getRefreshedToken = async () => {
    const refresh_token = getCookie("refresh_token") as string;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token`, {
      next: {
        tags: ["get", "token", "refresh"],
      },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    if (!res.ok) {
      throw new Error("get write project fail");
    }
    return res.json();
  };

  return (
    <>
      <button onClick={handleRegisterProject}>
        팀원 모집하기
        {/* {access_token ? "logged in" : "not logged in"} */}
      </button>
      <button onClick={handleRefreshToken}>리프레시</button>
    </>
  );
}
