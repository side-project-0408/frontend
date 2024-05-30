import { GetPeoplePost } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const getPeopleDetail: QueryFunction<
  GetPeoplePost,
  [_1: string, _2: string, string]
> = async ({ queryKey }) => {
  const [_1, _2, userId] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/peoples/${userId}`,
    {
      next: {
        tags: ["get", "peoplesDetail", userId],
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

export default getPeopleDetail;
