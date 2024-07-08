import { QueryFunctionContext } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const getLikePeoples = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const token = getCookie("access_token");
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
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export default getLikePeoples;
