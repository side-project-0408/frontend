"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "next-client-cookies";

export default function MyPage() {
  const cookies = useCookies();

  useEffect(() => {
    console.log("access_token", cookies.get("access_token"));
    console.log("refresh_token", cookies.get("refresh_token"));
  }, [cookies]);

  // redirect("/mypage/user-info");

  return <div>my page</div>;
}
