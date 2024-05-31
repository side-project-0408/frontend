"use client";

import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function MyPage() {
  useEffect(() => {
    console.log("access_token", getCookie("access_token"));
    console.log("refresh_token", getCookie("refresh_token"));
  }, []);
  return <div>my page</div>;
}
