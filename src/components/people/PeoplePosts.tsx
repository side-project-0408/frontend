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
import { MouseEventHandler, useEffect, useState } from "react";
import LikePeople from "./LikePeople";
import getLikePeoples from "@/lib/people/getLikePeoples";

type Props = {
  peopleId: string;
};

// 추후에 백엔드 데이터 넣었을때 직접 데이터를 가공하지않고 쿼리키를 가져온뒤 버튼 컬러 조정해야함

export default function PeoplePosts({ peopleId }: Props) {
  const { data } = useQuery<
    GetPeoplePost,
    Object,
    GetPeoplePost,
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["get", "peoplesDetail", peopleId],
    queryFn: getPeopleDetail,
  });

  const { data: likePeopleList } = useQuery<GetPeoples>({
    queryKey: ["get", "likepeoples"],
    queryFn: getLikePeoples,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
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

  const likeQuery = queryClient.getQueryData<GetPeoples>([
    "get",
    "likepeoples",
  ]);
  console.log("likeQuery", likeQuery);

  const liked = !!likeQuery?.data.find(
    (item) => item.userId === Number(peopleId),
  );

  console.log("liked", liked);

  const like = useMutation({
    mutationFn: (peopleId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite/${peopleId}`,
        {
          method: "post",
        },
      );
    },
    onMutate(peopleId: string) {
      const oldData = queryClient.getQueryData<GetPeoples>([
        "get",
        "likepeoples",
      ]);
      if (oldData) {
        const newData = {
          ...oldData,
          data: oldData.data.map((item) => ({
            ...item,
            userId: Number(peopleId),
          })),
        };
        queryClient.setQueryData(["get", "likepeoples"], newData);
      }
    },
  });

  const unLike = useMutation({
    mutationFn: (peopleId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/favorite/${peopleId}`,
        {
          method: "delete",
        },
      );
    },
    onMutate(peopleId: string) {
      const oldData = queryClient.getQueryData<GetPeoples>([
        "get",
        "likepeoples",
      ]);
      if (oldData) {
        const deleteData = {
          ...oldData,
          data: oldData.data.filter((item) => item.userId !== Number(peopleId)),
        };
        queryClient.setQueryData(["get", "likepeoples"], deleteData);
      }
    },
  });

  const onLike: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (liked) {
      unLike.mutate(peopleId);
    } else {
      like.mutate(peopleId);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 border-b pb-10">
        <div className="flex items-center gap-[10px]">
          <Image
            src={`${userFileUrl}`}
            alt="유저프로필"
            width={30}
            height={30}
          />
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
          <HeartEyeIconBox count={favoriteCount as number} icon={heartIcon} />
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
          <Link href={links as string}>{links}</Link>
        </div>
      </div>
      <div className="mt-[60px] flex gap-[13px] self-center">
        <button
          className={`h-[58px] w-[142px] rounded-md bg-neutral-orange-500 font-bold ${alarmStatus ? "text-neutral-white-0" : "text-neutral-black-800"}`}
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
            <Image src={heartIcon} alt="하트아이콘" width={20} height={20} />
          )}
          <h5 className="text-[12px]">{favoriteCount}</h5>
        </button>
      </div>
    </div>
  );
}
