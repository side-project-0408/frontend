"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  let router = useRouter();

  const handleRegisterProject = () => {
    const access_token = getCookie("access_token") as string;
    router.push(access_token ? "/register" : "/login");
  };
  return <button onClick={handleRegisterProject}>팀원 모집하기</button>;
}
