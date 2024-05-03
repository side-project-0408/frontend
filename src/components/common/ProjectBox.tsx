import newIcon from "../../../public/newIcon.svg";
import Image from "next/image";

export default function ProjectBox() {
  return (
    <div className="relative h-[323px] w-[288px] border border-black px-[20px]">
      <Image src={newIcon} alt="This is new icon" className="absolute top-0" />
      <section className="mt-[78px] flex gap-[1px]">
        <div className="rounded-xl bg-[#F2F4F8] px-[8px] py-0.5 text-[12px] font-bold text-[#3E86F5]">
          프론트엔드
        </div>
        <div className="rounded-xl bg-[#F2F4F8] px-[8px] py-0.5 text-[12px] font-bold text-[#3E86F5]">
          백엔드
        </div>
        <div className="rounded-xl bg-[#F2F4F8] px-[8px] py-0.5 text-[12px] font-bold text-[#3E86F5]">
          디자이너
        </div>
      </section>
      <div className="mt-[19px] line-clamp-2 text-ellipsis text-[18px]	font-bold">
        저희와 함께 프로젝트 진행하실 백엔드 2명, 프론트 1명, UIUX 1명
        모집합니다.
      </div>
      <div className="mt-[8px] text-[12px] font-medium text-[#666666]">
        마감일 | 24.04.30
      </div>
      <div className="mt-[16px]">기술스택 이미지들</div>
      <hr className="mt-[27px]" />
      <div className="mt-[8px] h-[30px] border border-black">아래 부분</div>
    </div>
  );
}
