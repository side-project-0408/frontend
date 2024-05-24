export interface GetProjectData {
  projectId: number;
  nickname: string;
  userFileUrl: string;
  title: string;
  techStack: string;
  position: string;
  deadLine: string;
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  recent: boolean;
}
export interface GetProjects {
  result: string;
  data: GetProjectData[];
}
