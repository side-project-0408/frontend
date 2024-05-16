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
}
export interface GetPeoples {
  result: string;
  data: GetPeoplesData[];
}
