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

export interface IProjectDetailData {
  projectId: number;
  userId: number;
  nickname: string;
  userFileUrl: string;
  projectFileUrl: string;
  title: string;
  techStack: string;
  softSkill: string;
  importantQuestion: string;
  deadline: string;
  recruitment: string;
  imploymentStatus: false;
  viewCount: number;
  favoriteCount: number;
  description: string;
  createdAt: string;
  lastModifiedAt: string;
  recruit: {
    position: string;
    currentCount: number;
    targetCount: number;
  }[];
}

export interface IProjectDetail {
  result: string;
  data: IProjectDetailData;
}

export interface IProjects {
  result: string;
  data: IProjectData[];
}

export interface IFavoriteProjects {
  result: string;
  data: IProjects;
}
