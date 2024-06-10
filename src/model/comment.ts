export interface GetCommentData {
  commentId: number;
  content: string;
  createdAt: string;
  userId: number;
  nickname: string;
  fileUrl: string;
  lastModifiedAt: string;
}

export type GetComment = {
  result: string;
  data: GetCommentData[];
};
