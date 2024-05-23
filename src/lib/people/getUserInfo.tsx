import { GetUsers } from "@/model/userInfo";
import { QueryFunction } from "@tanstack/query-core";

export const getUserInfo: QueryFunction<GetUsers> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
    next: {
      tags: ["get", "userinfo"],
    },
    //캐시 해제
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("get user info fail");
  }
  return res.json();
};

export default getUserInfo;
