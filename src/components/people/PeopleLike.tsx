"use client";
import getLikePeoples from "@/lib/people/getLikePeoples";
import { GetPeoples } from "@/model/peoples";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import fillHeartIcon from "../../../public/image/fillHeart.svg";
import heartIcon from "../../../public/image/heart.svg";
import { getCookie } from "cookies-next";

type Props = {
  className?: string;
  userId?: number;
};
export default function PeopleLike({ className, userId }: Props) {
  const access_token = getCookie("access_token") as string;
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

  const liked = likeQuery?.data.some((item) => item.userId === userId);

  const like = useMutation({
    mutationFn: (userId: number) => {
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
      alert("찜하기 성공");
    },
    onError() {
      alert("people 찜하기는 로그인이 필요합니다 !");
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["get", "likepeoples"],
      });
    },
  });

  const unLike = useMutation({
    mutationFn: (userId: number) => {
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

  const onLike = (e: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    e.preventDefault();
    if (liked) {
      unLike.mutate(userId);
    } else {
      like.mutate(userId);
    }
  };
  return (
    <button
      type="button"
      onClick={(e) => onLike(e, userId as number)}
      className={className}
    >
      {liked ? (
        <Image
          src={fillHeartIcon}
          alt="찜하기 적용된 하트아이콘"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src={heartIcon}
          alt="찜하지 않은 하트아이콘"
          width={20}
          height={20}
        />
      )}
    </button>
  );
}
