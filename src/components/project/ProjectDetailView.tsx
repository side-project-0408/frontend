"use client";

import { IProjectDetailData } from "@/model/projects";
import Image from "next/image";
import heart from "../../../public/image/heart.svg";
import eye from "../../../public/image/eye.svg";
import TechStack from "../common/TechStack";

type Prop = {
  detailedProject: IProjectDetailData | undefined;
};

export default function ProjectDetailView({ detailedProject }: Prop) {
  if (!detailedProject) return <div>is fetching data...</div>;

  return (
    <div>
      <div className="text-[30px] font-bold">{detailedProject.title}</div>
      <section className="flex">
        <Image
          className="rounded-2xl"
          src={detailedProject.userFileUrl}
          alt="This is user profile image"
          width={30}
          height={30}
        />
        <div>
          <div className="text-[14px] font-semibold">
            {detailedProject.nickname}
          </div>
          <div className="mt-[8px] text-[12px] font-medium text-[#666666]">
            {`마감일 | ${detailedProject.deadline.replaceAll("-", ".")}`}
          </div>
        </div>
      </section>
      <section className="flex items-center gap-[4px]">
        <Image src={heart} alt="This is heart icon" />
        <div>{detailedProject.favoriteCount}</div>
        <Image src={eye} alt="This is eye icon" className="ml-[4px]" />
        <div>{detailedProject.viewCount}</div>
      </section>
      <hr />
      <div className="text-[20px] font-bold">모집인원</div>
      <div className="flex gap-[10px]">
        {detailedProject.recruit.map((r, idx) => {
          return (
            <div key={`recruit${idx}`} className="flex">
              <div>{r.position}</div>
              <div>{r.currentCount}</div>
              <div>/</div>
              <div>{r.targetCount}</div>
              <div>
                {r.currentCount < r.targetCount ? "모집중" : "모집 완료"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-[20px] font-bold">사용언어</div>
      <div className="flex gap-[10px]">
        {detailedProject.techStack
          .replaceAll(" ", "")
          .split(",")
          .map((t, idx) => {
            return (
              <div key={`projectTechStackView${idx}`}>
                <TechStack techStack={t} showText={true} />
              </div>
            );
          })}
      </div>
      <div className="text-[20px] font-bold">프로젝트 소개</div>
      <Image
        className=""
        src={"/projectImageDefault.svg"}
        alt="This is project image"
        width={741}
        height={270}
      />
      <div>{detailedProject.description}</div>
      <button>찜하기 버튼</button>
      {/* TODO: 찜하기 버튼 추가 필요 */}
    </div>
  );
}
