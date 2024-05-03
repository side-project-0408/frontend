import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-auto border border-black">
      <div className="flex justify-center items-center w-full h-60 mt-40 border border-black bg-slate-500">
        배너 이미지
      </div>
      <div className="flex justify-between my-3">
        <div className="text-xl font-bold">이번 주 Hot People</div>
        <Link href="/people">전체보기</Link>
      </div>
      <div className="flex justify-center items-center w-full h-60 border border-black">
        핫 피플 섹션
      </div>
      <div className="flex justify-between my-3">
        <div className="text-xl font-bold">이번 주 Hot Project</div>
        <Link href="/project">전체보기</Link>
      </div>
      <div className="flex justify-center items-center w-full h-60 border border-black">
        핫 프로젝트 섹션
      </div>
    </main>
  );
}
