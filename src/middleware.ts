import { NextResponse } from "next/server";

export async function middleware(req: NextResponse) {
  const accessToken = req.cookies.get("access_token");
  if (!accessToken) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/mypage"],
};
