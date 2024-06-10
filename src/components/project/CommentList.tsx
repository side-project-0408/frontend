import getComment from "@/lib/project/getComment";
import { GetComment } from "@/model/comment";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCookie } from "cookies-next";

type Props = {
  projectId: string;
};
interface DecodedToken {
  userId: number;
}
function decodeJwt(token: string): DecodedToken {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

function time(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}분 전`;
  }

  return `${hours}시간 전`;
}

export default function CommentList({ projectId }: Props) {
  const queryClient = useQueryClient();

  const [editingComments, setEditingComments] = useState<{
    [key: number]: boolean;
  }>({});

  const [editedContent, setEditedContent] = useState<{ [key: number]: string }>(
    {},
  );

  const access_token = getCookie("access_token") as string;
  const decodedToken: DecodedToken | null = access_token
    ? decodeJwt(access_token)
    : null;
  const currentUserId = decodedToken?.userId;

  const { data } = useQuery<
    GetComment,
    Object,
    GetComment,
    [string, string, string]
  >({
    queryKey: ["get", "comments", projectId],
    queryFn: getComment,
  });

  console.log("data?", data);
  const editComment = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ commentId, content }),
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get", "comments", projectId],
      });
    },
  });

  const deleteComment = useMutation({
    mutationFn: (commentId: number) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${projectId}?commentId=${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get", "comments", projectId],
      });
    },
  });

  const deleteHandler = (commentId: number) => {
    deleteComment.mutate(commentId);
  };

  const editHandler = (commentId: number) => {
    setEditingComments((prev) => ({ ...prev, [commentId]: true }));
  };

  const saveHandler = (commentId: number) => {
    setEditingComments((prev) => ({ ...prev, [commentId]: false }));
    editComment.mutate({ commentId, content: editedContent[commentId] });
  };

  const handleContent = (commentId: number, content: string) => {
    setEditedContent((prev) => ({ ...prev, [commentId]: content }));
  };

  return (
    <>
      {data?.data.map((comment) => (
        <div
          key={comment.commentId}
          className="flex max-w-5xl flex-col rounded-lg border bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full"
              src={comment.fileUrl}
              alt="유저프로필"
              width={30}
              height={30}
            />
            <div className="flex items-center gap-2">
              <span className="font-bold">{comment.nickname}</span>
              <span className="text-xs text-gray-500">
                {time(comment.createdAt)}
              </span>
            </div>
          </div>
          <div className="mt-3 h-[60px]">
            {editingComments[comment.commentId] ? (
              <input
                className="h-full w-[89%] rounded-md border p-2"
                type="text"
                defaultValue={comment.content}
                onChange={(e) =>
                  handleContent(comment.commentId, e.target.value)
                }
              />
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
          <div className="flex gap-2 self-end">
            {comment.userId === currentUserId && (
              <>
                {editingComments[comment.commentId] ? (
                  <button
                    onClick={() => saveHandler(comment.commentId)}
                    className="rounded-md bg-neutral-gray-50 px-2 py-1 text-xs text-neutral-black-800"
                  >
                    저장
                  </button>
                ) : (
                  <button
                    onClick={() => editHandler(comment.commentId)}
                    className="rounded-md bg-neutral-gray-50 px-2 py-1 text-xs text-neutral-black-800"
                  >
                    수정
                  </button>
                )}
                <button
                  className="rounded-md bg-neutral-gray-50 px-2 py-1 text-xs text-neutral-black-800"
                  onClick={() => deleteHandler(comment.commentId)}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
