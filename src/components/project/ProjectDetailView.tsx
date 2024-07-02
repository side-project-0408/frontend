"use client";

import { IFavoriteProjects, IProjectDetailData } from "@/model/projects";
import Image from "next/image";
import heart from "../../../public/image/heart.svg";
import eye from "../../../public/image/eye.svg";
import TechStack from "../common/TechStack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import getMyFavoriteProjects from "@/lib/project/getMyFavoriteProjects";
import { MouseEventHandler } from "react";

import heartIcon from "../../../public/image/heart.svg";
import fillHeartIcon from "../../../public/image/fillHeart.svg";

type Prop = {
  detailedProject: IProjectDetailData | undefined;
};

export default function ProjectDetailView({ detailedProject }: Prop) {
  const access_token = getCookie("access_token") as string;

  const queryClient = useQueryClient();

  const { data: myFavoriteProjectQuery } = useQuery<
    IFavoriteProjects,
    Error,
    IFavoriteProjects,
    [string, string, string]
  >({
    queryKey: ["get", "myFavoriteProjects", access_token],
    queryFn: getMyFavoriteProjects,
  });

  // console.log("myFavoriteProjectQuery", myFavoriteProjectQuery);

  const isLikedProject = !!myFavoriteProjectQuery?.data.data.find(
    (item) => item.projectId === Number(detailedProject?.projectId),
  );
  // console.log("isLikedProject", isLikedProject);

  const like = useMutation({
    mutationFn: (projectId: string | undefined) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/favorite?projectId=${projectId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get", "myFavoriteProjects", access_token],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", "detail", detailedProject?.projectId.toString()],
      });
    },
  });

  const unLike = useMutation({
    mutationFn: (projectId: string | undefined) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/favorite?projectId=${projectId}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get", "myFavoriteProjects", access_token],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", "detail", detailedProject?.projectId.toString()],
      });
    },
  });

  const onFavoriteProject: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!access_token) alert("찜하기 기능은 로그인 후 이용해주세요.");
    if (isLikedProject) {
      unLike.mutate(detailedProject?.projectId.toString());
    } else {
      like.mutate(detailedProject?.projectId.toString());
    }
  };

  if (!detailedProject) return <div>is fetching data...</div>;

  return (
    <div>
      <div className="text-[32px] font-bold">{detailedProject.title}</div>
      <section className="mt-[20px] flex items-center">
        <Image
          className="rounded-full"
          src={detailedProject.userFileUrl}
          alt="This is user profile image"
          width={60}
          height={60}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="ml-[20px]">
          <div className="text-[24px] font-normal">
            {detailedProject.nickname}
          </div>
          <div className="mt-[6px] text-[16px] font-normal text-[#666666]">
            {`마감일 | ${detailedProject.deadline.replaceAll("-", ".")}`}
          </div>
        </div>
      </section>
      <section className="mt-[40px] flex items-center gap-[4px]">
        <Image src={heart} alt="This is heart icon" />
        <div>{detailedProject.favoriteCount}</div>
        <Image src={eye} alt="This is eye icon" className="ml-[4px]" />
        <div>{detailedProject.viewCount}</div>
      </section>
      <hr className="mt-[20px]" />
      <div className="mb-[20px] mt-[40px] text-[22px] font-bold">모집인원</div>
      <div className="flex max-w-[600px] flex-wrap gap-[50px]">
        {detailedProject.recruit.map((r, idx) => {
          return (
            <div key={`recruit${idx}`} className="flex gap-[30px]">
              <div className="text-[18px] font-semibold">{r.position}</div>
              <div className="flex gap-[2px]">
                <div className="text-[18px] font-semibold">
                  {r.currentCount}
                </div>
                <div className="text-[18px] font-semibold">/</div>
                <div className="text-[18px] font-semibold">{r.targetCount}</div>
              </div>
              <div className="flex h-auto w-[89px] items-center justify-center rounded-md bg-[#FF800B] text-[14px] font-normal text-white">
                {r.currentCount < r.targetCount ? (
                  <div className="flex h-auto w-[89px] items-center justify-center rounded-md bg-[#FF800B] text-[14px] font-normal text-white">
                    <div>모집중</div>
                  </div>
                ) : (
                  <div className="flex h-auto w-[89px] items-center justify-center rounded-md bg-[#F2F2F2] text-[14px] font-normal text-[#666666]">
                    <div>모집 완료</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-[20px] mt-[40px] text-[22px] font-bold">사용언어</div>
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
      <div className="mb-[20px] mt-[40px] text-[22px] font-bold">
        프로젝트 소개
      </div>
      <Image
        className=""
        src={
          detailedProject.projectFileUrl
            ? detailedProject.projectFileUrl
            : "/projectImageDefault.svg"
        }
        alt="This is project image"
        width={741}
        height={270}
      />
      <div className="mt-[50px] max-w-[741px]">
        {detailedProject.description}
      </div>
      <div className="flex max-w-[741px] justify-center">
        <button
          onClick={onFavoriteProject}
          className="mt-[87px] flex h-[58px] w-[58px] flex-col items-center justify-center rounded-md border"
        >
          {isLikedProject ? (
            <Image
              src={fillHeartIcon}
              alt="하트아이콘"
              width={20}
              height={20}
            />
          ) : (
            <Image src={heartIcon} alt="하트아이콘" width={20} height={20} />
          )}
          <h5 className="text-[12px]">{detailedProject.favoriteCount}</h5>
        </button>
      </div>
    </div>
  );
}
