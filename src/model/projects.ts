export interface IHotProjects {
  result: string;
  data: {
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
  }[];
}
