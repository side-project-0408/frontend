import { GetComment } from "@/model/comment";
import { QueryFunction } from "@tanstack/query-core";

export const getComment: QueryFunction<
  GetComment,
  [string, string, string]
> = async ({ queryKey }) => {
  const [_1, _2, projectId] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${projectId}?page=0&size=10`,
    {
      next: {
        tags: ["get", "comments", "0"],
      },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("get comments 실패");
  }
  return res.json();
};

export default getComment;
