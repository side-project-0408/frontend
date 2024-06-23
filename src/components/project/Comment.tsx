"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { MouseEventHandler, useRef, useState } from "react";
import CommentList from "./CommentList";

type Props = {
  projectId: string;
};

export default function Comment({ projectId }: Props) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string | undefined>();
  const access_token = getCookie("access_token") as string;
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: (projectId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${projectId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: comment,
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get", "comments", projectId],
      });
    },
  });

  const onAddComment: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addComment.mutate(projectId);
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <CommentList projectId={projectId} />
      <div className="max-w-5xl rounded-lg border bg-white p-4 shadow-sm">
        <textarea
          className="h-32 w-full resize-none rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-[#ff800a]"
          placeholder="댓글 작성하기"
          onChange={() => {
            setComment(commentRef.current?.value);
          }}
          ref={commentRef}
        />
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={onAddComment}
            className="rounded bg-neutral-gray-50 px-4 py-2 text-neutral-black-800 hover:bg-neutral-orange-500 hover:text-neutral-white-0"
          >
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
}
