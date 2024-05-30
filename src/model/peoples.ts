export interface GetPeoplesData {
  userId?: number;
  projectId?: number;
  nickname: string;
  favoriteCount: number;
  viewCount: number;
  position: string;
  softSkill?: string;
  techStack: string;
  userFileUrl: string;
  recent: boolean;
  year?: string;
  links?: string;
  alarmStatus?: boolean;
  content?: string;
}
export interface GetPeoples {
  result: string;
  data: GetPeoplesData[];
}

export type GetPeoplePost = {
  result: string;
  data: GetPeoplesData;
};
