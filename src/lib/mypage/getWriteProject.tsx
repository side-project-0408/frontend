import { GetProjects } from "@/model/projects";
import { QueryFunction } from "@tanstack/query-core";

export const getWriteProject: QueryFunction<GetProjects> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
    next: {
      tags: ["get", "writeproject"],
    },
    //캐시 해제
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("get write project fail");
  }
  return res.json();
};

export default getWriteProject;
