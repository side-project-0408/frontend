"use client";
import getPeopleDetail from "@/lib/people/getPeopleDetail";
import { GetPeoplePost } from "@/model/peoples";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import BlueTextBox from "../common/BlueTextBox";
import HashTag from "../common/HashTag";
import HeartEyeIconBox from "../common/HeartEyeIconBox";
import heartIcon from "../../../public/image/heart.svg";
import eyeIcon from "../../../public/image/eye.svg";
import TechStack from "../common/TechStack";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { getCookie } from "cookies-next";
import PeopleLike from "./PeopleLike";

type Props = {
  userId: number;
};

export default function PeoplePosts({ userId }: Props) {
  const access_token = getCookie("access_token") as string;
  const { data } = useQuery<
    GetPeoplePost,
    Object,
    GetPeoplePost,
    [_1: string, _2: string, _3: number]
  >({
    queryKey: ["get", "peoplesDetail", userId],
    queryFn: getPeopleDetail,
  });
  const {
    content,
    nickname,
    userFileUrl,
    favoriteCount,
    viewCount,
    softSkill,
    techStack,
    links,
    position,
    alarmStatus,
    year,
    userId: dataUserId,
  } = data?.data ?? {};

  const proposal = useMutation({
    mutationFn: (userId: number) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposal/send/${userId}`,
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
      alert("제안이 전송되었습니다 !");
    },
  });

  const onProposal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    proposal.mutate(userId);
  };

  return (
    <>
      {data && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 border-b pb-10">
            <div className="flex items-center gap-[10px]">
              <div className="h-[60px] w-[60px]">
                <Image
                  className="rounded-full border"
                  src={`${userFileUrl}`}
                  alt="유저프로필"
                  width={60}
                  height={60}
                />
              </div>
              <h1 className="text-[32px] font-bold">{nickname}</h1>
              <div>
                <BlueTextBox textSize="12px" textToShow={`${position}`} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {softSkill
                ?.split(",")
                .map((skill, i) => <HashTag text={skill} key={i} />)}
            </div>
            <div className="flex gap-3">
              <HeartEyeIconBox
                count={favoriteCount as number}
                icon={heartIcon}
              />
              <HeartEyeIconBox count={viewCount as number} icon={eyeIcon} />
            </div>
          </div>
          <div className="mt-[42px] flex flex-col gap-[50px]">
            <div className="people-post-grid">
              <h1 className="text-[22px] font-bold">경력</h1>
              <h3>{year}</h3>
            </div>
            <div className="people-post-grid">
              <h1 className="text-[22px] font-bold">사용언어</h1>
              <div className="flex gap-2">
                {techStack
                  ?.split(",")
                  .map((stack, i) => (
                    <TechStack techStack={stack} showText key={`stack${i}`} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[22px] font-bold">자기소개</h1>
              <p>{content}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[22px] font-bold">Link</h1>
              <Link href={`${links}`}>{links}</Link>
            </div>
          </div>
          <div className="mt-[60px] flex gap-[13px] self-center">
            <button
              className={`h-[58px] w-[142px] rounded-md font-bold ${alarmStatus ? "bg-neutral-orange-500 text-neutral-white-0" : "bg-neutral-gray-50 text-neutral-black-800"}`}
              disabled={!alarmStatus}
              onClick={onProposal}
            >
              {alarmStatus ? "제안하기" : "제안불가"}
            </button>
            <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-md border">
              <PeopleLike userId={dataUserId} />
              <h5 className="text-[12px] font-semibold">{favoriteCount}</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
