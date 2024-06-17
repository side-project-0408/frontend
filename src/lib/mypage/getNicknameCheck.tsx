import { QueryFunctionContext } from "@tanstack/react-query";

export const getNicknameCheck = async ({
  queryKey,
}: QueryFunctionContext<[string, string, string, string]>) => {
  const [_1, _2, access_token, nickname] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/nickname?nickname=${nickname}`,
    {
      next: {
        tags: ["get", "nickname", nickname],
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("get user info fail");
  }
  return res.json();
};

export default getNicknameCheck;
