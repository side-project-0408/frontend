"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

export default function MypageNav() {
  const segment = useSelectedLayoutSegments();
  const tabSegment = segment.join("");
  const [subMenu, setSubMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/mypage/user-info`}
        className={`font-bold ${tabSegment === "user-info" ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
        onClick={() => setSubMenu(false)}
      >
        내 정보
      </Link>
      <Link
        href={`/mypage/user-activiti`}
        className={`font-bold text-neutral-black-800`}
        onClick={() => setSubMenu(true)}
      >
        나의 활동
      </Link>
      {subMenu && (
        <ul>
          <li>
            <Link
              href="/mypage/project-write"
              className={`text-[13px] font-medium ${tabSegment === "project-write" ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
            >
              내가 작성한 프로젝트
            </Link>
          </li>
          <li>
            <Link
              href="/mypage/watch-list"
              className={`text-[13px] font-medium ${tabSegment === "watch-list" ? "text-neutral-orange-500" : "text-neutral-black-800"}`}
            >
              관심목록
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
