export interface GetUserData {
  alarmStatus: boolean;
  content: string;
  employmentStatus: boolean;
  favoriteCount: number;
  links: string;
  nickname: string;
  position: string;
  recent: boolean;
  softSkill: string;
  techStack: string;
  userFileUrl: string;
  userId: number;
  viewCount: number;
  year: string;
  email: string;
}
export interface GetUsers {
  result: string;
  data: GetUserData;
}
