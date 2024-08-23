"use client";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: async (refreshToken: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    },
    onSuccess: () => {
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");
      if (accessToken) {
        deleteCookie("access_token");
      }
      if (refreshToken) {
        deleteCookie("refresh_token");
      }
      router.push("/");
      queryClient.invalidateQueries({
        queryKey: ["get"],
      });
    },
  });

  useEffect(() => {
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      logout.mutate(refreshToken);
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center gap-[45px]">
      <Image src="/logo.png" alt="로고" width={100} height={100} />
      <p className="text-[17px] font-semibold">
        로그아웃 되어 메인 페이지로 이동합니다.
      </p>
    </div>
  );
}
