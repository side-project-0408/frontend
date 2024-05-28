import { GetPeoples } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const getLikePeoples = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite`,
    {
      next: {
        tags: ["get", "likepeoples"],
      },
      //캐시 해제
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("get likepeoples 실패");
  }
  return res.json();
};

export default getLikePeoples;
