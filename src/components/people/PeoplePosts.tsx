"use client";
import getPeopleDetail from "@/lib/people/getPeopleDetail";
import { GetPeoplePost, GetPeoples } from "@/model/peoples";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import BlueTextBox from "../common/BlueTextBox";
import HashTag from "../common/HashTag";
import HeartEyeIconBox from "../common/HeartEyeIconBox";
import heartIcon from "../../../public/image/heart.svg";
import fillHeartIcon from "../../../public/image/fillHeart.svg";
import eyeIcon from "../../../public/image/eye.svg";
import TechStack from "../common/TechStack";
import Link from "next/link";
import { MouseEventHandler } from "react";
import getLikePeoples from "@/lib/people/getLikePeoples";
import { getCookie } from "cookies-next";

type Props = {
  userId: string;
};

export default function PeoplePosts({ userId }: Props) {
  const access_token = getCookie("access_token") as string;

  const { data } = useQuery<
    GetPeoplePost,
    Object,
    GetPeoplePost,
    [_1: string, _2: string, _3: string]
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
  } = data?.data ?? {};

  const queryClient = useQueryClient();

  const { data: likeQuery } = useQuery<
    GetPeoples,
    Error,
    GetPeoples,
    [string, string]
  >({
    queryKey: ["get", "likepeoples"],
    queryFn: getLikePeoples,
  });

  const liked = !!likeQuery?.data.find(
    (item) => item.userId === Number(userId),
  );

  const like = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite?favoriteId=${userId}`,
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
        queryKey: ["get", "likepeoples"],
      });
      alert("찜하기 성공");
    },
  });

  const unLike = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite?favoriteId=${userId}`,
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
        queryKey: ["get", "likepeoples"],
      });
      alert("찜하기 삭제 완료");
    },
  });

  const onLike: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (liked) {
      unLike.mutate(userId);
    } else {
      like.mutate(userId);
    }
  };

  const proposal = useMutation({
    mutationFn: (userId: string) => {
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
            <button
              onClick={onLike}
              className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-md border"
            >
              {liked ? (
                <Image
                  src={fillHeartIcon}
                  alt="하트아이콘"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={heartIcon}
                  alt="하트아이콘"
                  width={20}
                  height={20}
                />
              )}
              <h5 className="text-[12px]">{favoriteCount}</h5>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
