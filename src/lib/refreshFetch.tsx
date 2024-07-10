import { getCookie, setCookie } from "cookies-next";

export const refreshAuthToken = async () => {
  const refreshToken = getCookie("refresh_token");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const res = await response.json();
    const newAccessToken = res.data;
    setCookie("access_token", newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.log("토큰 받아오기 에러", err);
  }
};
