import BackButton from "@/components/common/BackButton";
import ContentBox from "@/components/common/ContentBox";
import SelectBox from "@/components/common/SelectBox";
import SerchInputBox from "@/components/common/SerchInputBox";
import Image from "next/image";

const selectOption = [
  { key: 1, value: "프론트엔드" },
  { key: 2, value: "백엔드" },
  { key: 3, value: "디자이너" },
  { key: 4, value: "기획자" },
];
export default function PeoplePage() {
  return (
    <div>
      <BackButton />
      {/* 아래 타이틀 공통 컴포넌트로 빼야할듯 */}
      <div className="relative flex items-center gap-4">
        <h1 className="text-[36px] font-bold">People</h1>
        <p className="title-content relative text-[20px] text-neutral-100">
          우리가 people에게 직접 제안하고 프로젝트를 구성할 수 있어요.
        </p>
      </div>
      <div className="flex justify-between">
        <SelectBox options={selectOption} />
        <SerchInputBox />
      </div>
      <ContentBox />
    </div>
  );
}
