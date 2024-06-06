import { QueryFunctionContext } from "@tanstack/react-query";

export const getLikePeoples = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
  const [, , access_token] = queryKey;

  const defaultParams = {
    page: "0",
    size: "10",
    sort: "createdAt",
  };

  const queryParams = new URLSearchParams(defaultParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite?${queryParams}`,
    {
      next: {
        tags: ["get", "likepeoples", defaultParams.page],
      },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("get likepeoples 실패");
  }
  return res.json();
};

export default getLikePeoples;
