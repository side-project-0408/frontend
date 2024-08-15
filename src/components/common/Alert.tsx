"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function Alert() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-[30px]">
      <p>정보가 수정되어 메인페이지로 이동합니다.</p>
      <Button
        orangeBtn
        onClick={() => router.push("/")}
        className="h-[30px] w-[150px] rounded-md"
      >
        <p className="font-semibold">확인</p>
      </Button>
    </div>
  );
}
