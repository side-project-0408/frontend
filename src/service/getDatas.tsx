import { readFile } from "fs/promises";

export type GetPeopleData = {
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
};

export async function getPeopleDetails(): Promise<GetPeopleData[]> {
  const filePath = "data/peopleData.json";
  const readFilePath = await readFile(filePath, "utf-8");
  const peopleDatas: GetPeopleData[] = JSON.parse(readFilePath);
  return peopleDatas;
}
