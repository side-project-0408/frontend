import { GetPeoples } from "@/model/peoples";
import { QueryFunction } from "@tanstack/query-core";

export const getPeoples: QueryFunction<
  GetPeoples,
  [
    _1: string,
    _2: string,
    searchParams: {
      page?: string;
      size?: string;
      sort?: string;
      keyword?: string;
      position?: string;
      techStack?: string;
    },
  ]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const defaultParams = {
    page: "0",
    size: "10",
  };

  const queryParams = new URLSearchParams({
    ...defaultParams,
    ...searchParams,
  });

  if (!searchParams.sort) {
    queryParams.append("sort", '"POPULAR"');
  } else {
    queryParams.set("sort", `"${searchParams.sort}"`);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/peoples?${queryParams.toString()}`,
    {
      next: {
        tags: ["get", "peoples", searchParams.page || "0"],
      },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("get peoples 실패");
  }
  return res.json();
};

export default getPeoples;
