"use client";
import UserInfo from "@/components/mypage/UserInfo";
import getUserInfo from "@/lib/people/getUserInfo";
import { GetUsers } from "@/model/userInfo";
import { useQuery } from "@tanstack/react-query";

export default function UserInfoPage() {
  const { data } = useQuery<GetUsers>({
    queryKey: ["get", "userinfo"],
    queryFn: getUserInfo,
  });

  return (
    <>{data?.data.map((user) => <UserInfo user={user} key={user.userId} />)}</>
  );
}
