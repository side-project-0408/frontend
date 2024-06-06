export interface GetPeoplesData {
  nickname: string;
  favoriteCount: number;
  viewCount: number;
  position: string;
  techStack: string;
  userFileUrl: string;
  recent: boolean;
  userId?: number;
  projectId?: number;
  softSkill?: string;
  year?: string;
  links?: string;
  alarmStatus?: boolean;
  content?: string;
  createdAt?: string;
}
export interface GetPeoples {
  result: string;
  data: GetPeoplesData[];
  totalElements: number;
  totalPages: number;
}

export type GetPeoplePost = {
  result: string;
  data: GetPeoplesData;
};
