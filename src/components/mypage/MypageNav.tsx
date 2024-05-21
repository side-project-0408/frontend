"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function MypageNav() {
  const segment = useSelectedLayoutSegments();
  const tabSegment = segment.join("");
  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/mypage/user-info`}
        className={`font-bold ${tabSegment === "user-info" ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
      >
        내 정보
      </Link>
      <Link
        href={`/mypage/user-activiti`}
        className={`font-bold ${tabSegment === "user-activiti" ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
      >
        나의 활동
      </Link>
    </div>
  );
}
