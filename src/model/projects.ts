export interface IProjectData {
  projectId: number;
  nickname: string;
  userFileUrl: string;
  title: string;
  techStack: string;
  position: string;
  deadline: string;
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  recent: boolean;
}

export interface IProjects {
  result: string;
  data: IProjectData[];
}
