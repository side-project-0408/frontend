"use client";

import { useRouter } from "next/navigation";

export default function Alert() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-[30px]">
      <p>정보가 수정되어 메인페이지로 이동합니다.</p>
      <button
        onClick={() => router.push("/")}
        className="h-[30px] w-[150px] rounded-md bg-neutral-orange-500 text-neutral-white-0"
      >
        확인
      </button>
    </div>
  );
}
