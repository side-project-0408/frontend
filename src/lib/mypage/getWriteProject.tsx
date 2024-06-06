import { QueryFunctionContext } from "@tanstack/react-query";

export const getWriteProject = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string]>) => {
  const [, , access_token] = queryKey;

  const defaultParams = {
    page: "0",
    size: "10",
  };

  const queryParams = new URLSearchParams(defaultParams).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/posts?${queryParams}`,
    {
      next: {
        tags: ["get", "writeproject", defaultParams.page],
      },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("get write project fail");
  }
  return res.json();
};

export default getWriteProject;
