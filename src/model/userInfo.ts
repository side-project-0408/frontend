export interface GetUserData {
  userId: number;
  nickName: string;
  userFileUrl: string;
  techStack: string;
  position: string;
  employmentStatus: boolean;
  year: string;
  links: string;
  alarmStatus: boolean;
  content: string;
  softSkill: string;
}
export interface GetUsers {
  result: string;
  data: GetUserData[];
}
