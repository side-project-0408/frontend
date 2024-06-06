import { QueryFunctionContext } from "@tanstack/react-query";

export const getUserInfo = async ({ queryKey }: QueryFunctionContext) => {
  const [_1, _2, access_token] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    next: {
      tags: ["get", "userinfo"],
    },
    //캐시 해제
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok) {
    throw new Error("get user info fail");
  }
  return res.json();
};

export default getUserInfo;
