import { GetPeoples } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const hotPeopls: QueryFunction<
  GetPeoples,
  [_1: string, _2: string]
> = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/peoples/hot?size=8`,
    {
      next: {
        tags: ["get", "hotpeoples"],
      },
      //캐시 해제
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("get peoples 실패");
  }
  return res.json();
};

export default hotPeopls;
