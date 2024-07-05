import { QueryFunctionContext } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const getUserInfo = async ({ queryKey }: QueryFunctionContext) => {
  const token = getCookie("access_token");
  const [_1, _2] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    next: {
      tags: ["get", "userinfo"],
    },
    //캐시 해제
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("get user info fail");
  }
  return res.json();
};

export default getUserInfo;
