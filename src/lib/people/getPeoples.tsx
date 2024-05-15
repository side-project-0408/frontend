import { GetPeoples } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const getPeoples: QueryFunction<
  GetPeoples,
  [
    _1: string,
    _2: string,
    searchParams: {
      page: string;
      size: string;
      sort?: string;
      keyword?: string;
      position?: string;
      teckStack?: string;
    },
  ]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/peoples?page=${searchParams.page}&size=${searchParams.size}&${searchParams.keyword}&${searchParams.position}&${searchParams.sort}&${searchParams.teckStack}`,
    {
      next: {
        tags: ["get", "peoples", searchParams.page],
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

export default getPeoples;
