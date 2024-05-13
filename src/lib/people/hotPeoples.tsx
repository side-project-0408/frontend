import { GetPeoples } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const hotPeopls: QueryFunction<
  GetPeoples,
  [
    _1: string,
    _2: string,
    searchParams: {
      size: string;
    },
  ]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/peoples/hot/${searchParams.size}?${searchParams.toString()}`,
    {
      next: {
        tags: ["get", "hotpeoples", searchParams.size],
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
