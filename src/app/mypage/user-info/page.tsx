"use client";
import UserInfo from "@/components/mypage/UserInfo";
import getUserInfo from "@/lib/mypage/getUserInfo";
import { GetUsers } from "@/model/userInfo";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export default function UserInfoPage() {
  const access_token = getCookie("access_token") as string;

  const { data: user } = useQuery<
    GetUsers,
    Error,
    GetUsers,
    [string, string, string]
  >({
    queryKey: ["get", "userinfo", access_token],
    queryFn: getUserInfo,
  });
  return <UserInfo user={user?.data!!} />;
}
