"use client";
import UserInfo from "@/components/mypage/UserInfo";
import getUserInfo from "@/lib/mypage/getUserInfo";
import { GetUsers } from "@/model/userInfo";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export default function UserInfoPage() {
  const { data: user } = useQuery<GetUsers, Error, GetUsers, [string, string]>({
    queryKey: ["get", "userinfo"],
    queryFn: getUserInfo,
  });
  return <UserInfo user={user?.data!!} />;
}
